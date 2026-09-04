import { execFile } from "node:child_process";
import { cp, mkdir, readdir, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const clientDirectory = path.join(projectDirectory, "dist", "client");
const serverEntry = path.join(projectDirectory, "dist", "server", "index.js");
const outputDirectory = path.join(projectDirectory, "github-pages");
const appDirectory = path.join(projectDirectory, "app");
const canonicalSiteUrl = "https://jenergie.co.uk";
const execFileAsync = promisify(execFile);

async function discoverPublicRoutes(directory = appDirectory, segments = []) {
  const entries = await readdir(directory, { withFileTypes: true });
  const routes = [];

  if (entries.some((entry) => entry.isFile() && /^page\.(?:js|jsx|ts|tsx)$/.test(entry.name))) {
    const publicSegments = segments.filter(
      (segment) => !segment.startsWith("(") && !segment.startsWith("@"),
    );
    routes.push(publicSegments.length === 0 ? "/" : `/${publicSegments.join("/")}`);
  }

  for (const entry of entries) {
    if (
      !entry.isDirectory() ||
      entry.name.startsWith("_") ||
      entry.name.startsWith("[") ||
      entry.name === "api"
    ) {
      continue;
    }

    routes.push(
      ...(await discoverPublicRoutes(path.join(directory, entry.name), [
        ...segments,
        entry.name,
      ])),
    );
  }

  return [...new Set(routes)].sort();
}

function escapeXml(value) {
  return value.replace(/[<>&'"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    '"': "&quot;",
  })[character]);
}

async function getSiteLastModified() {
  const { stdout } = await execFileAsync(
    "git",
    ["log", "-1", "--format=%cI", "--", "app", "public"],
    { cwd: projectDirectory },
  );
  const value = stdout.trim();

  if (!value || Number.isNaN(Date.parse(value))) {
    throw new Error("Unable to determine the site's last modification date.");
  }

  return value.slice(0, 10);
}

async function createSitemap(routes) {
  const lastModified = await getSiteLastModified();
  if (!routes.includes("/")) {
    throw new Error("The sitemap is missing the homepage.");
  }

  const urls = routes.map((route) => {
    const canonicalRoute = route === "/" ? route : `${route}/`;
    const location = new URL(canonicalRoute, `${canonicalSiteUrl}/`).href;
    return [
      "  <url>",
      `    <loc>${escapeXml(location)}</loc>`,
      `    <lastmod>${lastModified}</lastmod>`,
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

async function renderRoute(worker, route) {
  return worker.fetch(
    new Request(new URL(route, "https://jenergie.example/"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function prepareStaticHtml(html, assetPrefix) {
  return html
    .replace(
      /<script\b(?![^>]*\btype=["']application\/ld\+json["'])(?![^>]*\bdata-jenergie-analytics(?:=|\s|>))[^>]*>[\s\S]*?<\/script>/gi,
      "",
    )
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*\/?>/gi, "")
    .replace(/\sdata-rsc-css-href=["'][^"']*["']/gi, "")
    .replace(/\sdata-precedence=["'][^"']*["']/gi, "")
    .replace(/(["'(])\/(_next|brand)\//g, `$1${assetPrefix}$2/`)
    .replace(
      "</head>",
      '<meta name="generator" content="Jenergie static export for GitHub Pages"/></head>',
    );
}

async function validateAssetReferences(html, documentDirectory) {
  const references = [
    ...html.matchAll(/(?:href|src)=["']((?:(?:\.\.\/|\.\/)+|\/)(?:_next|brand)\/[^"'#?]+)["']/g),
  ].map((match) => match[1]);

  for (const reference of new Set(references)) {
    const target = reference.startsWith("/")
      ? path.join(outputDirectory, ...reference.slice(1).split("/"))
      : path.resolve(documentDirectory, reference);

    if (!target.startsWith(outputDirectory)) {
      throw new Error(`Exported asset path leaves the output directory: ${reference}`);
    }

    await stat(target);
  }
}

await stat(serverEntry);
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

const workerUrl = pathToFileURL(serverEntry);
workerUrl.searchParams.set("pages-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);
const routes = await discoverPublicRoutes();

for (const route of routes) {
  const response = await renderRoute(worker, route);
  if (!response.ok) {
    throw new Error(`Unable to render ${route}: ${response.status}`);
  }

  const routeSegments = route.split("/").filter(Boolean);
  const documentDirectory = path.join(outputDirectory, ...routeSegments);
  const assetPrefix = routeSegments.length === 0 ? "./" : "../".repeat(routeSegments.length);
  const html = prepareStaticHtml(await response.text(), assetPrefix);

  await mkdir(documentDirectory, { recursive: true });
  await validateAssetReferences(html, documentDirectory);
  await writeFile(path.join(documentDirectory, "index.html"), html, "utf8");

  if (
    route === "/" &&
    (!html.includes("Energy for your body") ||
      !html.includes("£55") ||
      !html.includes("HealthAndBeautyBusiness") ||
      !html.includes('"@type":"Organization"') ||
      !html.includes('"@type":"ContactPoint"') ||
      !html.includes("G-T8LFTR9P1B") ||
      !html.includes("data-jenergie-analytics") ||
      !html.includes('rel="canonical" href="https://jenergie.co.uk"'))
  ) {
    throw new Error("The exported homepage is missing required Jenergie content.");
  }
}

const notFoundResponse = await renderRoute(worker, "/agent-audit-page-that-does-not-exist");
if (notFoundResponse.status !== 404) {
  throw new Error(`The not-found route returned ${notFoundResponse.status} instead of 404.`);
}

const notFoundHtml = prepareStaticHtml(await notFoundResponse.text(), "/");
if (
  !notFoundHtml.includes("Jenergie page not found") ||
  !notFoundHtml.includes("https://jenergie.co.uk/sitemap.xml") ||
  !notFoundHtml.includes("https://jenergie.co.uk/llms.txt")
) {
  throw new Error("The 404 page is missing agent recovery guidance.");
}
await validateAssetReferences(notFoundHtml, outputDirectory);
await writeFile(path.join(outputDirectory, "404.html"), notFoundHtml, "utf8");
await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");
await writeFile(path.join(outputDirectory, "sitemap.xml"), await createSitemap(routes), "utf8");

console.log(`GitHub Pages export created with ${routes.length} routes at ${outputDirectory}`);
