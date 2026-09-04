import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(new URL(path, "http://localhost/"), { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

function pageText(html) {
  const match = html.match(/<article class="info-content shell">([\s\S]*?)<\/article>/);
  return (match?.[1] ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:amp|quot|apos|#x27|#39);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
  assert.match(html, /Initial appointment[\s\S]*55 min[\s\S]*£45/);
  assert.match(html, /£55/);
  assert.match(html, /Jen@jenergie\.co\.uk/);
  assert.match(html, /North Northamptonshire/);
  assert.match(html, /rel="canonical" href="https:\/\/jenergie\.co\.uk\/?"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /HealthAndBeautyBusiness/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"ContactPoint"/);
  assert.match(html, /"contactType":"customer enquiries"/);
  assert.match(html, /G-T8LFTR9P1B/);
  assert.match(html, /data-jenergie-analytics="consent"/);
  assert.match(html, /analytics_storage.*denied/s);
  assert.match(html, /Your privacy choices/);
  assert.match(html, /data-analytics-choice="granted"/);
  assert.doesNotMatch(html, /—/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("renders substantial Jenergie trust and agent resource pages", async () => {
  const pages = [
    ["/about", "About Jenergie", "https://jenergie.co.uk/about/", "/about.md"],
    ["/contact", "Contact Jenergie", "https://jenergie.co.uk/contact/", "/contact.md"],
    ["/privacy", "Privacy Notice", "https://jenergie.co.uk/privacy/", "/privacy.md"],
    ["/agent-resources", "Jenergie Agent and Developer Resources", "https://jenergie.co.uk/agent-resources/", "/agent-resources.md"],
  ];

  for (const [path, title, canonical, markdown] of pages) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(title));
    assert.ok(pageText(html).length >= 500, `${path} should contain at least 500 characters`);
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${path} canonical`);
    assert.ok(html.includes('type="text/markdown"'), `${path} markdown alternate type`);
    assert.ok(html.includes(`href="${markdown}"`) || html.includes(`href="https://jenergie.co.uk${markdown}"`), `${path} markdown alternate URL`);
  }
});

test("returns a real 404 with agent recovery links", async () => {
  const response = await render("/this-page-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Jenergie page not found/);
  assert.match(html, /https:\/\/jenergie\.co\.uk\/sitemap\.xml/);
  assert.match(html, /https:\/\/jenergie\.co\.uk\/llms\.txt/);
  assert.match(html, /https:\/\/jenergie\.co\.uk\/agent-resources\//);
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
  assert.equal((sitemap.match(/<url>/g) ?? []).length, 5);
  for (const route of ["about", "contact", "privacy", "agent-resources"]) {
    assert.match(sitemap, new RegExp(`<loc>https:\\/\\/jenergie\\.co\\.uk\\/${route}\\/</loc>`));
  }
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
  assert.match(llms, /## When to use Jenergie/);
  assert.match(llms, /Jenergie has no automated booking API/);
  assert.match(llms, /https:\/\/jenergie\.co\.uk\/agent-instructions\.md/);
  assert.doesNotMatch(llms, /https?:\/\/www\.jenergie\.co\.uk/);
});

test("exports explicit Markdown alternatives and agent instructions", async () => {
  const files = [
    "index.md",
    "about.md",
    "contact.md",
    "privacy.md",
    "agent-resources.md",
    "agent-instructions.md",
  ];

  for (const file of files) {
    const content = await readFile(new URL(`../github-pages/${file}`, import.meta.url), "utf8");
    assert.match(content, /^# .*Jenergie/m, file);
    assert.ok(content.length >= 500, `${file} should contain at least 500 characters`);
  }

  const instructions = await readFile(
    new URL("../github-pages/agent-instructions.md", import.meta.url),
    "utf8",
  );
  assert.match(instructions, /## When to use Jenergie/);
  assert.match(instructions, /no online or autonomous booking system/i);
});

test("exports a dedicated 404 recovery document", async () => {
  const html = await readFile(new URL("../github-pages/404.html", import.meta.url), "utf8");
  assert.match(html, /404 page not found/i);
  assert.match(html, /# Jenergie page not found/);
  assert.match(html, /https:\/\/jenergie\.co\.uk\/sitemap\.xml/);
  assert.doesNotMatch(html, /Energy for your body\.<br\/><em>Care for your muscles/);
});
