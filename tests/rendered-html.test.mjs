import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the Jenergie sports massage homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Higham Ferrers Sports Massage &amp; Personal Training \| Jenergie/);
  assert.match(html, /Energy for your body/);
  assert.match(html, /Care for your muscles/);
  assert.match(html, /Contact Jenni/);
  assert.doesNotMatch(html, /Book your treatment/);
  assert.match(html, /Personal training/);
  assert.match(html, /One-to-one personal training/);
  assert.match(html, /£55/);
  assert.match(html, /Jen@jenergie\.co\.uk/);
  assert.match(html, /North Northamptonshire/);
  assert.match(html, /rel="canonical" href="https:\/\/jenergie\.co\.uk\/?"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /HealthAndBeautyBusiness/);
  assert.match(html, /G-T8LFTR9P1B/);
  assert.match(html, /data-jenergie-analytics="consent"/);
  assert.match(html, /analytics_storage.*denied/s);
  assert.match(html, /Your privacy choices/);
  assert.match(html, /data-analytics-choice="granted"/);
  assert.doesNotMatch(html, /—/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("exports a discoverable canonical sitemap", async () => {
  const [sitemap, robots] = await Promise.all([
    readFile(new URL("../github-pages/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../github-pages/robots.txt", import.meta.url), "utf8"),
  ]);

  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9">/);
  assert.match(sitemap, /<loc>https:\/\/jenergie\.co\.uk\/<\/loc>/);
  assert.match(sitemap, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 1);
  assert.match(robots, /Sitemap: https:\/\/jenergie\.co\.uk\/sitemap\.xml/);
});

test("exports an llms.txt discovery guide", async () => {
  const llms = await readFile(
    new URL("../github-pages/llms.txt", import.meta.url),
    "utf8",
  );

  assert.match(llms, /^# Jenergie/m);
  assert.match(llms, /sports massage therapy practice in Higham Ferrers/i);
  assert.match(llms, /North Northamptonshire/);
  assert.match(llms, /https:\/\/jenergie\.co\.uk\/#treatments/);
  assert.match(llms, /https:\/\/jenergie\.co\.uk\/sitemap\.xml/);
  assert.doesNotMatch(llms, /https?:\/\/www\.jenergie\.co\.uk/);
});
