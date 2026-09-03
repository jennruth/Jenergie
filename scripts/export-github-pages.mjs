import { execFile } from "node:child_process";
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
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
    routes.push(`/${publicSegments.join("/")}`);
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

async function createSitemap() {
  const [routes, lastModified] = await Promise.all([
    discoverPublicRoutes(),
    getSiteLastModified(),
  ]);

  if (!routes.includes("/")) {
    throw new Error("The sitemap is missing the homepage.");
  }

  const urls = routes.map((route) => {
    const location = new URL(route, `${canonicalSiteUrl}/`).href;
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

await stat(serverEntry);
await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

const workerUrl = pathToFileURL(serverEntry);
workerUrl.searchParams.set("pages-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("https://jenergie.example/", {
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

if (!response.ok) {
  throw new Error(`Unable to render the homepage: ${response.status}`);
}

let html = await response.text();

// The page is fully usable without hydration. Removing runtime scripts makes the
// export a small, durable static site that GitHub Pages can serve directly.
html = html
  .replace(
    /<script\b(?![^>]*\btype=["']application\/ld\+json["'])(?![^>]*\bdata-jenergie-analytics(?:=|\s|>))[^>]*>[\s\S]*?<\/script>/gi,
    "",
  )
  .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*\/?>/gi, "")
  .replace(/\sdata-rsc-css-href=["'][^"']*["']/gi, "")
  .replace(/\sdata-precedence=["'][^"']*["']/gi, "")
  .replace(/(["'(])\/(_next|brand)\//g, "$1./$2/")
  .replace(
    "</head>",
    '<meta name="generator" content="Jenergie static export for GitHub Pages"/></head>',
  );

const localReferences = [
  ...html.matchAll(/(?:href|src)=["']\.\/([^"'#?]+)["']/g),
].map((match) => match[1]);

for (const reference of new Set(localReferences)) {
  await stat(path.join(outputDirectory, ...reference.split("/")));
}

if (
  !html.includes("Energy for your body") ||
  !html.includes("£55") ||
  !html.includes("HealthAndBeautyBusiness") ||
  !html.includes("G-T8LFTR9P1B") ||
  !html.includes("data-jenergie-analytics") ||
  !html.includes('rel="canonical" href="https://jenergie.co.uk"')
) {
  throw new Error("The exported page is missing required Jenergie content.");
}

await writeFile(path.join(outputDirectory, "index.html"), html, "utf8");
await writeFile(path.join(outputDirectory, "404.html"), html, "utf8");
await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");
await writeFile(path.join(outputDirectory, "sitemap.xml"), await createSitemap(), "utf8");

const exportedHtml = await readFile(path.join(outputDirectory, "index.html"), "utf8");
if (/\b(?:href|src)=["']\/(?:_next|brand)\//.test(exportedHtml)) {
  throw new Error("The export contains repository-root asset paths.");
}

console.log(`GitHub Pages export created at ${outputDirectory}`);
