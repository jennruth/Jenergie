import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const clientDirectory = path.join(projectDirectory, "dist", "client");
const serverEntry = path.join(projectDirectory, "dist", "server", "index.js");
const outputDirectory = path.join(projectDirectory, "github-pages");

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
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
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

if (!html.includes("Energy for your body") || !html.includes("£55")) {
  throw new Error("The exported page is missing required Jenergie content.");
}

await writeFile(path.join(outputDirectory, "index.html"), html, "utf8");
await writeFile(path.join(outputDirectory, "404.html"), html, "utf8");
await writeFile(path.join(outputDirectory, ".nojekyll"), "", "utf8");

const exportedHtml = await readFile(path.join(outputDirectory, "index.html"), "utf8");
if (/\b(?:href|src)=["']\/(?:_next|brand)\//.test(exportedHtml)) {
  throw new Error("The export contains repository-root asset paths.");
}

console.log(`GitHub Pages export created at ${outputDirectory}`);
