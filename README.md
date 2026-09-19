# vinext-starter

A clean full-stack starter running on
[vinext](https://github.com/cloudflare/vinext), with optional Cloudflare D1 and
Drizzle support.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
npm run build
```

This starter does not use `wrangler.jsonc`.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

Signed-in visitors receive both `oai-authenticated-user-id` and `oai-authenticated-user-email`. Private Sites require every visitor to sign in; public Sites may also have anonymous visitors, for whom neither header is present.

The user ID is stable for the same user on the same Site and different across Sites. Email and name are intended for display or contact purposes.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const userId = requestHeaders.get("oai-authenticated-user-id");
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Deploy with GitHub Pages

This repository includes an automatic GitHub Pages workflow. It produces a
static, repository-path-safe version of the Jenergie website whenever the
`main` branch is updated.

1. Push this repository to GitHub.
2. Open **Settings → Pages** in the GitHub repository.
3. Under **Build and deployment**, choose **GitHub Actions** as the source.
4. Open the **Actions** tab and run **Deploy Jenergie to GitHub Pages**, or push
   another change to `main`.

To verify the export locally, run `pnpm run build:pages`. The generated site is
written to `github-pages/` and is intentionally not committed.

## Agent readiness

GitHub Pages remains the live publishing target. Its static responses cannot
negotiate `Accept: text/markdown`, change the `.md` media type, add `Vary: Accept`,
or select a Markdown 404 body. Explicit Markdown files remain available there,
and unknown paths still return a genuine 404 with recovery links in HTML.
Do not claim full acceptmarkdown.com compliance while the domain uses Pages alone.

`worker/agent-http.mjs` prepares the server behavior: weighted HTML/Markdown
negotiation, `406` for unsupported page formats, GET/HEAD parity, correct media
types, and Markdown recovery on real `404` responses. Both variants declare
`Vary: Accept, Accept-Encoding`. Negotiated responses use `private, no-store`
because Cloudflare's default cache does not use arbitrary Vary values in its
cache key. Do not override this with a cache-everything rule unless the cache
key also includes the selected representation. HTML bytes and static assets
are unchanged. Framework requests and non-GET/HEAD methods keep their handler.

The same behavior wraps the existing vinext worker. A standalone Cloudflare
Worker configuration, `wrangler.agent.jsonc`, can serve the exact GitHub Pages
export if a server deployment is approved later. It has no production domain
routes and does not change the current GitHub publishing target or DNS. Preview it with:

```sh
pnpm run build:pages
pnpm run preview:agent
```

Validation commands:

```sh
pnpm test
pnpm run verify:public -- http://127.0.0.1:8787 --report work/agent-local-verification.json
pnpm run verify:public -- https://jenergie.co.uk --static-host --report work/agent-live-verification.json
```

The verifier checks all public page URLs and slash variants, every Markdown
document, llms.txt, robots.txt, sitemap.xml, exported public assets, trust-page
lengths, identity data, HEAD, 404 recovery and negotiation. `--static-host`
records unsupported server behavior as hosting limitations; it never hides
missing content, broken links or incorrect status codes. CI builds and runs
the regression tests before publishing to Pages.

The `worker/public-pages.mjs` registry is checked against every exported app
page, so adding a route requires its Markdown counterpart. Both runtime and
export use that registry for the sitemap. Optional `lastmod` values are omitted
instead of asserting a commit timestamp that may not describe page changes.

The branded `/developers/` page documents public read access and the absence of
a booking API, OpenAPI specification, API authentication or MCP server. No such
integration is invented. `llms.txt` follows the published H1, summary and H2
linked-file-list format; detailed instructions live in `agent-instructions.md`.

Remaining owner actions: activate a server layer only if full negotiation is
wanted; verify the canonical domain in Google Search Console and Bing Webmaster
Tools and submit `/sitemap.xml`; maintain consistent business name/contact
listings; confirm a street address/postcode and official profile URLs before
adding them to structured data. Search placement is external and cannot be
guaranteed by a code change. Re-run the Ora/Is Agentic audit after deployment
and recrawling; local tests do not calculate its score.

Protocol references: [Accept Markdown](https://acceptmarkdown.com/start),
[HTTP Accept semantics](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.5.1),
[llms.txt](https://llmstxt.org/#format),
[Cloudflare caching](https://developers.cloudflare.com/cache/concepts/cache-control/#other),
[Organization](https://schema.org/Organization).

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
