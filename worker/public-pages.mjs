// Keep this registry in sync with app/*/page.tsx; the export tests enforce it.
export const publicPages = Object.freeze({
  "/": "/index.md",
  "/about": "/about.md",
  "/agent-resources": "/agent-resources.md",
  "/burton-latimer": "/burton-latimer.md",
  "/burton-latimer/pt": "/burton-latimer/pt.md",
  "/burton-latimer/rm": "/burton-latimer/rm.md",
  "/burton-latimer/smt": "/burton-latimer/smt.md",
  "/cancellation-policy": "/cancellation-policy.md",
  "/contact": "/contact.md",
  "/developers": "/developers.md",
  "/faq": "/faq.md",
  "/irchester": "/irchester.md",
  "/irchester/pt": "/irchester/pt.md",
  "/irchester/rm": "/irchester/rm.md",
  "/irchester/smt": "/irchester/smt.md",
  "/podington": "/podington.md",
  "/podington/pt": "/podington/pt.md",
  "/podington/rm": "/podington/rm.md",
  "/podington/smt": "/podington/smt.md",
  "/prices": "/prices.md",
  "/privacy": "/privacy.md",
  "/pt": "/pt.md",
  "/raunds": "/raunds.md",
  "/raunds/pt": "/raunds/pt.md",
  "/raunds/rm": "/raunds/rm.md",
  "/raunds/smt": "/raunds/smt.md",
  "/reviews": "/reviews.md",
  "/rm": "/rm.md",
  "/smt": "/smt.md",
  "/treatments": "/treatments.md",
  "/wellingborough": "/wellingborough.md",
  "/wellingborough/pt": "/wellingborough/pt.md",
  "/wellingborough/rm": "/wellingborough/rm.md",
  "/wellingborough/smt": "/wellingborough/smt.md",
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
