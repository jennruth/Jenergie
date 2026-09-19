import assert from "node:assert/strict";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { publicPages } from "../worker/public-pages.mjs";

const args = process.argv.slice(2);
const base = args.find((arg) => /^https?:\/\//.test(arg)) || "https://jenergie.co.uk";
const staticHost = args.includes("--static-host");
const reportIndex = args.indexOf("--report");
const results = [];
const assetUrls = new Set();

async function inspect(path, accept = "*/*", method = "GET") {
  const response = await fetch(new URL(path, base), {
    method, headers: { Accept: accept }, signal: AbortSignal.timeout(20000),
  });
  const body = await response.text();
  return { status: response.status, url: response.url, type: response.headers.get("content-type") || "", vary: response.headers.get("vary") || "", cache: response.headers.get("cache-control") || "", body };
}
async function check(name, action, limitation = false) {
  try {
    const detail = await action();
    results.push({ name, result: "pass", ...(detail || {}) });
  } catch (error) {
    results.push({ name, result: limitation && staticHost && error.hostingLimitation ? "hosting limitation" : "fail", detail: error.message });
  }
}
function protocol(assertion) {
  try { assertion(); } catch (error) { error.hostingLimitation = true; throw error; }
}
function assertVary(response) { protocol(() => assert.match(response.vary, /(?:^|,\s*)Accept(?:\s*,|$)/i)); }
function textContent(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

for (const [route, markdown] of Object.entries(publicPages)) {
  const canonical = route === "/" ? "/" : `${route}/`;
  await check(`HTML ${canonical}`, async () => {
    const response = await inspect(canonical, "text/html");
    assert.equal(response.status, 200);
    assert.match(response.type, /^text\/html/);
    assert.match(response.body, /Jenergie/);
    assert.ok(response.body.includes(`rel="canonical" href="https://jenergie.co.uk${canonical}"`) || (route === "/" && response.body.includes('rel="canonical" href="https://jenergie.co.uk"')));
    assert.ok(response.body.includes(markdown));
    if (["/about", "/contact", "/privacy"].includes(route)) {
      const article = response.body.match(/<article[^>]*>([\s\S]*?)<\/article>/)?.[1];
      assert.ok(article && textContent(article).length >= 500, "Trust page needs at least 500 characters in its own content");
    }
    if (route === "/") {
      const entities = [...response.body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => JSON.parse(match[1]));
      const organization = entities.find((entity) => entity["@type"] === "Organization");
      assert.ok(organization?.description);
      assert.equal(organization.address["@type"], "PostalAddress");
      assert.ok(organization.contactPoint.email && organization.contactPoint.telephone && organization.contactPoint.contactType);
    }
    for (const match of response.body.matchAll(/(?:src|href)="([^"]+)"/g)) {
      const url = new URL(match[1].replace(/&amp;/g, "&"), response.url);
      if (url.origin === new URL(base).origin && /\.(?:png|svg|js|css|woff2?)(?:$|\?)/.test(url.pathname)) assetUrls.add(url.pathname);
    }
    return { status: response.status, type: response.type };
  });
  for (const path of new Set([route, canonical])) {
    await check(`Markdown negotiation ${path}`, async () => {
      const response = await inspect(path, "text/markdown");
      assert.equal(response.status, 200);
      protocol(() => assert.match(response.type, /^text\/markdown/));
      assertVary(response);
      assert.match(response.body, /^# .*Jenergie/);
      const direct = await inspect(markdown);
      assert.equal(response.body, direct.body);
    }, true);
  }
  await check(`HEAD ${canonical}`, async () => {
    const response = await inspect(canonical, "text/html", "HEAD");
    assert.equal(response.status, 200);
    assert.equal(response.body, "");
  });
}

for (const path of [...Object.values(publicPages), "/agent-instructions.md", "/llms.txt", "/robots.txt", "/sitemap.xml"]) {
  await check(`Document ${path}`, async () => {
    const response = await inspect(path);
    assert.equal(response.status, 200);
    assert.ok(response.body.length > 20);
    assert.doesNotMatch(response.body, /^\s*<!doctype html/i);
    if (path.endsWith(".md") || path === "/llms.txt") {
      assert.match(response.body, /^# .*Jenergie/);
      const expected = await readFile(new URL(`../public${path}`, import.meta.url), "utf8");
      assert.equal(response.body.replace(/\r\n/g, "\n"), expected.replace(/\r\n/g, "\n"), "Published document differs from the implementation");
    }
    if (path === "/robots.txt") assert.match(response.body, /Sitemap: https:\/\/jenergie\.co\.uk\/sitemap\.xml/);
    if (path.endsWith(".txt")) assert.match(response.type, /^text\/plain/);
    if (path === "/sitemap.xml") {
      assert.match(response.type, /^(?:application|text)\/xml/);
      assert.match(response.body, /xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
      for (const route of Object.keys(publicPages)) assert.ok(response.body.includes(`<loc>https://jenergie.co.uk${route === "/" ? "/" : `${route}/`}</loc>`));
    }
    return { status: response.status, type: response.type };
  });
  await check(`Document HEAD ${path}`, async () => {
    const response = await inspect(path, "*/*", "HEAD");
    assert.equal(response.status, 200);
    assert.equal(response.body, "");
  });
  if (path.endsWith(".md")) await check(`Markdown media type ${path}`, async () => {
    const response = await inspect(path, "*/*", "HEAD");
    assert.equal(response.status, 200);
    protocol(() => assert.match(response.type, /^text\/markdown/));
  }, true);
}

for (const path of ["/agent-audit-does-not-exist", "/agent-audit-does-not-exist/nested/", "/agent-audit-missing.md"]) {
  for (const accept of ["text/html", "text/markdown", "*/*"]) await check(`404 ${path} ${accept}`, async () => {
    const response = await inspect(path, accept);
    assert.equal(response.status, 404);
    for (const target of ["sitemap.xml", "llms.txt", "agent-resources/"]) assert.ok(response.body.includes(target));
    if (accept !== "text/html") protocol(() => assert.match(response.type, /^text\/markdown/));
  }, accept !== "text/html");
}
for (const [accept, expected] of [["application/json", 406], ["text/html;q=0.2,text/markdown;q=0.9", "text/markdown"], ["text/markdown;q=0,*/*;q=1", "text/html"]]) {
  await check(`Accept ${accept}`, async () => {
    const response = await inspect("/", accept);
    if (typeof expected === "number") protocol(() => assert.equal(response.status, expected));
    else {
      assert.equal(response.status, 200);
      protocol(() => assert.ok(response.type.startsWith(expected)));
    }
    assertVary(response);
  }, true);
}
// Verify every exported public asset, including fonts/chunks referenced by CSS
// or scripts rather than directly by HTML. Hosting control files are not URLs.
async function exportedAssets(directory = new URL("../github-pages/", import.meta.url), prefix = "/") {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || ["_headers", "_redirects"].includes(entry.name)) continue;
    if (entry.isDirectory()) await exportedAssets(new URL(`${entry.name}/`, directory), `${prefix}${entry.name}/`);
    else if (!/\.(?:html|md|txt|xml)$/.test(entry.name)) assetUrls.add(`${prefix}${entry.name}`);
  }
}
await exportedAssets();
for (const path of assetUrls) await check(`Asset ${path}`, async () => {
  const response = await inspect(path, "*/*", "HEAD");
  assert.equal(response.status, 200);
  assert.doesNotMatch(response.type, /^text\/html/);
});

const summary = { base, checkedAt: new Date().toISOString(), checks: results.length, passed: results.filter((row) => row.result === "pass").length, hostingLimitations: results.filter((row) => row.result === "hosting limitation").length, failed: results.filter((row) => row.result === "fail").length };
if (reportIndex >= 0 && args[reportIndex + 1]) {
  const { dirname } = await import("node:path");
  await mkdir(dirname(args[reportIndex + 1]), { recursive: true });
  await writeFile(args[reportIndex + 1], JSON.stringify({ ...summary, results }, null, 2) + "\n");
}
console.log(JSON.stringify(summary, null, 2));
for (const row of results.filter((row) => row.result === "fail")) console.error(`${row.name}: ${row.detail}`);
process.exitCode = summary.failed > 0 ? 1 : 0;
