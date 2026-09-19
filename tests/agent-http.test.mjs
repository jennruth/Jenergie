import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { agentResponse, negotiate } from "../worker/agent-http.mjs";
import { publicPages, recoveryMarkdown, sitemapXml } from "../worker/public-pages.mjs";
import worker from "../worker/static-assets.mjs";

const context = { waitUntil() {}, passThroughOnException() {} };
function request(path = "/", accept = "text/html", method = "GET", headers = {}) {
  return new Request(`https://jenergie.co.uk${path}`, { method, headers: { ...(accept === null ? {} : { accept }), ...headers } });
}
async function asset(input) {
  const pathname = new URL(input.url).pathname;
  const route = pathname === "/" ? "/" : pathname.replace(/\/$/, "");
  const file = Object.hasOwn(publicPages, route) ? `${route === "/" ? "" : route.slice(1) + "/"}index.html` : pathname.slice(1);
  try {
    const data = await readFile(new URL(`../github-pages/${file}`, import.meta.url));
    return new Response(input.method === "HEAD" ? null : data, { headers: {
      "Content-Type": file.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream",
      Vary: "Accept-Encoding", ETag: `"${file}"`, "Cache-Control": "public, max-age=600",
    } });
  } catch {
    return new Response(input.method === "HEAD" ? null : "<h1>Jenergie page not found</h1>", { status: 404, headers: { "Content-Type": "text/html" } });
  }
}
function serve(input) { return worker.fetch(input, { ASSETS: { fetch: asset } }, context); }

test("negotiates according to RFC 9110 qualities, exclusions, parameters and wildcards", () => {
  for (const [accept, expected] of [
    [null, "text/html"], ["", null], ["*/*", "text/html"],
    ["text/*", "text/html"], ["text/markdown", "text/markdown"],
    ["TEXT/MARKDOWN; CHARSET=\"UTF-8\"", "text/markdown"],
    ["text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8", "text/html"],
    ["text/html;q=0.2,text/markdown;q=0.9", "text/markdown"],
    ["text/html;q=0.9,text/markdown;q=0.2", "text/html"],
    ["text/markdown;q=0,*/*;q=1", "text/html"],
    ["text/html;q=0,text/*;q=1", "text/markdown"],
    ["text/markdown;q=0,text/html;q=0,*/*;q=1", null],
    ["application/json", null], ["*/*;q=0", null],
    ["text/markdown;q=1.1", null], ["text/markdown;q=-1", null],
    ["text/markdown;q=0.1234", null], ["text/markdown;q=wrong", null],
    ["text/markdown;variant=unknown", null],
    ["text/markdown;charset=iso-8859-1", null],
    ["text/markdown;q=0.8;ext=\"one,two\"", null],
    ["text/markdown;q=1;charset=iso-8859-1", null],
    ["text/markdown;q=1;charset=utf-8", "text/markdown"],
    ["text/markdown/extra", null],
    ["text/markdown;q=0.8, text/markdown;charset=utf-8;q=0", null],
    ["text/html;q=0.8,*/*;q=1,text/markdown;q=0.1", "text/html"],
  ]) assert.equal(negotiate(accept), expected, String(accept));
});

test("every public page serves its own Markdown and unchanged HTML; HEAD matches", async () => {
  for (const [route, markdown] of Object.entries(publicPages)) {
    for (const suffix of ["", "?source=audit", ...(route === "/" ? [] : ["/"])]) {
      for (const type of ["text/html", "text/markdown"]) {
        const get = await serve(request(route + suffix, type));
        assert.equal(get.status, 200, `${route + suffix}: ${type}`);
        assert.ok(get.headers.get("Content-Type").startsWith(type));
        assert.match(get.headers.get("Vary"), /Accept(?:,|$)/i);
        assert.match(get.headers.get("Vary"), /Accept-Encoding/i);
        assert.match(get.headers.get("Cache-Control"), /no-store/);
        assert.ok(get.headers.get("Link").includes(markdown));
        const expected = type === "text/markdown"
          ? await readFile(new URL(`../public${markdown}`, import.meta.url), "utf8")
          : await (await asset(request(route + suffix))).text();
        assert.equal(await get.text(), expected);
        const head = await serve(request(route + suffix, type, "HEAD"));
        assert.equal(head.status, get.status);
        for (const name of ["Content-Type", "Vary", "Cache-Control", "Link"]) assert.equal(head.headers.get(name), get.headers.get(name));
        assert.equal(await head.text(), "");
      }
    }
  }
});

test("unsupported representations return 406 with Vary and an empty HEAD", async () => {
  for (const method of ["GET", "HEAD"]) {
    const response = await serve(request("/prices/", "application/json", method));
    assert.equal(response.status, 406);
    assert.match(response.headers.get("Vary"), /Accept/);
    assert.equal((await response.text()).length === 0, method === "HEAD");
  }
});

test("unknown paths return Markdown 404 recovery for agents and styled HTML for browsers", async () => {
  for (const path of ["/unknown", "/unknown/nested/", "/missing.md", "/missing.png", "/__proto__", "/constructor"]) {
    for (const accept of [null, "*/*", "text/markdown", "text/html"]) {
      const response = await serve(request(path, accept));
      assert.equal(response.status, 404, path);
      const body = await response.text();
      if (accept === "text/html") assert.match(body, /<h1>/);
      else {
        assert.equal(body, recoveryMarkdown);
        assert.match(response.headers.get("Content-Type"), /^text\/markdown/);
      }
      assert.match(response.headers.get("Vary"), /Accept/);
      const head = await serve(request(path, accept, "HEAD"));
      assert.equal(head.status, 404);
      assert.equal(await head.text(), "");
    }
  }
});

test("negotiated requests strip HTML validators and byte ranges before reading Markdown", async () => {
  const response = await agentResponse(request("/prices", "text/markdown", "GET", {
    "If-None-Match": '"html"', "If-Modified-Since": "Sat, 19 Sep 2026 10:00:00 GMT", Range: "bytes=0-10", "If-Range": '"html"',
  }), asset, async (input) => {
    for (const name of ["If-None-Match", "If-Modified-Since", "Range", "If-Range"]) assert.equal(input.headers.has(name), false);
    assert.equal(new URL(input.url).pathname, "/prices.md");
    return new Response("# Prices", { headers: { Vary: "accept-encoding, RSC", ETag: '"md"' } });
  });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Vary"), "accept-encoding, RSC, Accept");
  assert.equal(response.headers.has("ETag"), false);
  assert.equal(await response.text(), "# Prices");
});

test("preserves Vary wildcard and reports a missing Markdown build artifact as 503", async () => {
  const response = await agentResponse(request(), async () => new Response("HTML", { headers: { Vary: "*" } }), asset);
  assert.equal(response.headers.get("Vary"), "*");
  const missing = await agentResponse(request("/", "text/markdown"), asset, async () => new Response("<h1>404</h1>", { status: 404 }));
  assert.equal(missing.status, 503);
  assert.doesNotMatch(await missing.text(), /<h1>/);
});

test("preserves application requests and static asset responses", async () => {
  for (const input of [request("/", "text/x-component"), request("/", "*/*", "GET", { RSC: "1" }), request("/", "application/json", "POST")]) {
    const expected = new Response("framework", { status: 202 });
    assert.equal(await agentResponse(input, async (forwarded) => { assert.equal(forwarded, input); return expected; }, asset), expected);
  }
  const expected = new Response(null, { status: 304, headers: { ETag: '"asset"' } });
  assert.equal(await agentResponse(request("/animations.js", "*/*"), async () => expected, asset), expected);
});

test("machine-readable documents have correct media types and a canonical sitemap", async () => {
  for (const path of [...Object.values(publicPages), "/agent-instructions.md", "/llms.txt", "/robots.txt", "/sitemap.xml"]) {
    const response = await serve(request(path, "*/*"));
    assert.equal(response.status, 200, path);
    assert.ok(response.headers.get("Content-Type").startsWith(path.endsWith(".md") ? "text/markdown" : path.endsWith(".xml") ? "application/xml" : "text/plain"), path);
    const body = await response.text();
    assert.ok(body.length > 20);
    if (path === "/sitemap.xml") assert.equal(body, sitemapXml());
    assert.equal(await (await serve(request(path, "*/*", "HEAD"))).text(), "");
  }
});

test("canonical host redirect preserves path and query in one hop", async () => {
  const response = await worker.fetch(new Request("https://www.jenergie.co.uk/prices/?from=agent"), { ASSETS: { fetch: asset } });
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("Location"), "https://jenergie.co.uk/prices/?from=agent");
});

test("the built application worker also negotiates every public page and sitemap", async () => {
  const { default: application } = await import("../dist/server/index.js");
  for (const [route, markdown] of Object.entries(publicPages)) {
    const response = await application.fetch(request(route, "text/markdown"), { ASSETS: { fetch: asset } }, context);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("Content-Type"), /^text\/markdown/);
    assert.equal(await response.text(), await readFile(new URL(`../public${markdown}`, import.meta.url), "utf8"));
  }
  const sitemap = await application.fetch(request("/sitemap.xml"), { ASSETS: { fetch: asset } }, context);
  assert.equal(await sitemap.text(), sitemapXml());
});
