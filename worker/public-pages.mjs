// Keep this registry in sync with app/*/page.tsx; the export tests enforce it.
export const publicPages = Object.freeze({
  "/": "/index.md",
  "/about": "/about.md",
  "/agent-resources": "/agent-resources.md",
  "/cancellation-policy": "/cancellation-policy.md",
  "/contact": "/contact.md",
  "/developers": "/developers.md",
  "/faq": "/faq.md",
  "/prices": "/prices.md",
  "/privacy": "/privacy.md",
  "/treatments": "/treatments.md",
});

export const siteUrl = "https://jenergie.co.uk";

export function sitemapXml() {
  const urls = Object.keys(publicPages).map((route) =>
    `  <url><loc>${siteUrl}${route === "/" ? "/" : `${route}/`}</loc></url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export const recoveryMarkdown = `# Jenergie page not found

The requested path does not exist. Check the address or use these official sources:

- [Jenergie homepage](https://jenergie.co.uk/)
- [Sitemap](https://jenergie.co.uk/sitemap.xml)
- [LLM guide](https://jenergie.co.uk/llms.txt)
- [Agent resources](https://jenergie.co.uk/agent-resources/)
- [Developer documentation](https://jenergie.co.uk/developers/)
- [Contact Jenni](https://jenergie.co.uk/contact/)
`;
