# Jenergie Developer Documentation and Agent Access

Jenergie is a sports massage practice in Higham Ferrers, near Rushden, North Northamptonshire. This is the official documentation for reading its public information programmatically.

## Public resources and authentication

No account, API key or authentication is required to read public pages. Use HTTP GET for content and HEAD for headers. Start with the [LLM guide](https://jenergie.co.uk/llms.txt), [agent instructions](https://jenergie.co.uk/agent-instructions.md) and [resource index](https://jenergie.co.uk/agent-resources.md).

The homepage Markdown is [index.md](https://jenergie.co.uk/index.md). Other pages use their name followed by .md: [treatments.md](https://jenergie.co.uk/treatments.md), [prices.md](https://jenergie.co.uk/prices.md), [about.md](https://jenergie.co.uk/about.md), [faq.md](https://jenergie.co.uk/faq.md), [contact.md](https://jenergie.co.uk/contact.md), [privacy.md](https://jenergie.co.uk/privacy.md) and [cancellation-policy.md](https://jenergie.co.uk/cancellation-policy.md).

## Content negotiation and recovery

For clients that support it, send `Accept: text/markdown` to a page URL and check the returned Content-Type. If the current host returns HTML, use the explicit .md alternative above. Explicit Markdown URLs work independently of content negotiation.

An unknown address returns HTTP 404. Check the [sitemap](https://jenergie.co.uk/sitemap.xml), [LLM guide](https://jenergie.co.uk/llms.txt) or [agent resource index](https://jenergie.co.uk/agent-resources/) for a valid address. Do not treat a missing page as a service or an available appointment.

## Integration limits

Jenergie has no public booking API, OpenAPI specification, developer authentication service or MCP server. Read access does not grant permission to submit an enquiry. Do not send personal or health information without the person's permission. Help the person understand services and current prices, then direct them to [contact Jenni](https://jenergie.co.uk/contact/). An appointment is confirmed only when Jenni agrees it directly.
