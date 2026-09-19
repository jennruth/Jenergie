import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { publicPages } from "../worker/public-pages.mjs";

test("llms.txt follows the H1, summary and H2 linked-file-list format", async () => {
  const text = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");
  assert.match(text, /^# Jenergie\r?\n\r?\n> /);
  assert.equal((text.match(/^# /gm) || []).length, 1);
  for (const section of text.split(/^## /m).slice(1)) {
    const [, ...lines] = section.split(/\r?\n/);
    assert.ok(lines.some((line) => line.startsWith("- [")));
    for (const line of lines.filter((line) => line.trim())) assert.match(line, /^- \[[^\]]+\]\(https:\/\/jenergie\.co\.uk\/[^)]+\): .+/);
  }
});

test("all local links in machine-readable documents resolve to an exported file", async () => {
  const { stat } = await import("node:fs/promises");
  for (const file of [...Object.values(publicPages), "/llms.txt", "/agent-instructions.md"]) {
    const content = await readFile(new URL(`../public${file}`, import.meta.url), "utf8");
    for (const match of content.matchAll(/https:\/\/jenergie\.co\.uk\/[^\s)<>]*/g)) {
      const pathname = new URL(match[0].replace(/[.,;]+$/, "")).pathname;
      const target = pathname === "/" ? "index.html" : pathname.endsWith("/") ? `${pathname.slice(1)}index.html` : pathname.slice(1);
      assert.ok((await stat(new URL(`../github-pages/${target}`, import.meta.url))).isFile(), `${file} -> ${pathname}`);
    }
  }
});

test("homepage JSON-LD supplies linked business identity, contact and verified locality", async () => {
  const html = await readFile(new URL("../github-pages/index.html", import.meta.url), "utf8");
  const entities = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((match) => JSON.parse(match[1]));
  const organization = entities.find((item) => item["@type"] === "Organization");
  assert.ok(organization);
  for (const key of ["name", "description", "url", "email", "telephone"]) assert.ok(organization[key], key);
  assert.equal(organization.name, "Jenergie");
  assert.equal(organization.url, "https://jenergie.co.uk/");
  assert.equal(organization.contactPoint["@type"], "ContactPoint");
  assert.equal(organization.contactPoint.contactType, "customer enquiries");
  assert.equal(organization.contactPoint.email, organization.email);
  assert.equal(organization.contactPoint.telephone, organization.telephone);
  assert.equal(organization.address["@type"], "PostalAddress");
  assert.equal(organization.address.addressLocality, "Higham Ferrers");
  assert.equal(organization.address.addressCountry, "GB");
  assert.equal(entities.find((item) => item["@type"] === "WebSite").publisher["@id"], organization["@id"]);
  assert.equal(entities.find((item) => item["@type"] === "HealthAndBeautyBusiness").parentOrganization["@id"], organization["@id"]);
});

test("developer guidance is discoverable, branded and does not invent a booking integration", async () => {
  for (const file of ["developers/index.html", "developers.md"]) {
    const body = await readFile(new URL(`../github-pages/${file}`, import.meta.url), "utf8");
    assert.match(body, /Jenergie [Dd]eveloper/);
    assert.match(body, /no public booking API/);
    assert.match(body, /OpenAPI specification/);
    assert.match(body, /MCP server/);
  }
  const index = await readFile(new URL("../github-pages/agent-resources/index.html", import.meta.url), "utf8");
  assert.match(index, /href="\/developers\/"/);
  assert.match(index, /<h1>Jenergie agent resources\.<\/h1>/);
});
