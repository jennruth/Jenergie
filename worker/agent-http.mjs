import { publicPages, recoveryMarkdown, siteUrl, sitemapXml } from "./public-pages.mjs";

// Split HTTP lists without splitting a quoted parameter containing a comma or semicolon.
function splitHeader(value, delimiter) {
  return value.split(delimiter === "," ? /,(?=(?:[^"]*"[^"]*")*[^"]*$)/ : /;(?=(?:[^"]*"[^"]*")*[^"]*$)/);
}

function preference(accept, offered) {
  const [type, subtype] = offered.split("/");
  let best = { specificity: -1, quality: 0 };
  for (const range of splitHeader(accept ?? "*/*", ",")) {
    const [media, ...parameters] = splitHeader(range, ";").map((part) => part.trim().toLowerCase());
    if (!/^[!#$%&'*+.^_`|~\w-]+\/[!#$%&'*+.^_`|~\w-]+$/.test(media)) continue;
    const [rangeType, rangeSubtype] = media.split("/");
    if (rangeType !== type && rangeType !== "*") continue;
    if (rangeSubtype !== subtype && rangeSubtype !== "*") continue;
    if (rangeType === "*" && rangeSubtype !== "*") continue;
    let quality = 1;
    let parameterCount = 0;
    let matches = true;
    for (const parameter of parameters) {
      const separator = parameter.indexOf("=");
      const name = parameter.slice(0, separator).trim();
      const value = parameter.slice(separator + 1).trim();
      if (name === "q") {
        // RFC 9110: 0..1, at most three decimal places. Invalid ranges are excluded.
        quality = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(value) ? Number(value) : 0;
      } else {
        parameterCount++;
        if (name !== "charset" || value.replace(/^"|"$/g, "") !== "utf-8") matches = false;
      }
    }
    if (!matches) continue;
    const specificity = (rangeType === "*" ? 0 : rangeSubtype === "*" ? 1 : 2) * 100 + parameterCount;
    if (specificity > best.specificity || (specificity === best.specificity && quality > best.quality)) {
      best = { specificity, quality };
    }
  }
  return best;
}

export function negotiate(accept, fallback = "text/html") {
  const html = preference(accept, "text/html");
  const markdown = preference(accept, "text/markdown");
  if (html.quality === 0 && markdown.quality === 0) return null;
  if (html.quality !== markdown.quality) return html.quality > markdown.quality ? "text/html" : "text/markdown";
  if (html.specificity !== markdown.specificity) return html.specificity > markdown.specificity ? "text/html" : "text/markdown";
  return fallback;
}

function vary(headers) {
  const values = (headers.get("Vary") || "").split(",").map((part) => part.trim()).filter(Boolean);
  if (values.includes("*")) return;
  for (const name of ["Accept", "Accept-Encoding"]) {
    if (!values.some((value) => value.toLowerCase() === name.toLowerCase())) values.push(name);
  }
  headers.set("Vary", values.join(", "));
}

function finish(response, request, { negotiated = false, type, markdown } = {}) {
  const headers = new Headers(response.headers);
  if (type) headers.set("Content-Type", `${type}; charset=utf-8`);
  headers.set("X-Content-Type-Options", "nosniff");
  if (negotiated) {
    vary(headers);
    // Cloudflare does not key its default cache on Vary: Accept. Do not let
    // shared caches store either negotiated variant under the page URL.
    headers.set("Cache-Control", "private, no-store");
    headers.delete("ETag");
    headers.delete("Last-Modified");
    headers.delete("CDN-Cache-Control");
    headers.delete("Cloudflare-CDN-Cache-Control");
    headers.append("Link", `<${siteUrl}/llms.txt>; rel="describedby"; type="text/plain"`);
    if (markdown) headers.append("Link", `<${siteUrl}${markdown}>; rel="alternate"; type="text/markdown"`);
  }
  return new Response(request.method === "HEAD" ? null : response.body, { status: response.status, statusText: response.statusText, headers });
}

function representationRequest(request, pathname, type) {
  const url = new URL(request.url);
  if (pathname) url.pathname = pathname;
  const headers = new Headers(request.headers);
  // A validator or byte range for HTML must never select bytes from Markdown.
  for (const name of ["If-None-Match", "If-Modified-Since", "If-Match", "If-Unmodified-Since", "If-Range", "Range"]) headers.delete(name);
  headers.set("Accept", type);
  return new Request(url, { method: "GET", headers });
}

/** Adds agent representations while preserving existing browser and application handling. */
export async function agentResponse(request, fetchPage, fetchAsset) {
  if (request.method !== "GET" && request.method !== "HEAD") return fetchPage(request);
  // Framework flight responses are a separate protocol, not HTML documents.
  if (request.headers.has("RSC") || request.headers.get("Accept")?.includes("text/x-component")) return fetchPage(request);

  const url = new URL(request.url);
  const route = url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
  if (url.pathname === "/sitemap.xml") {
    return finish(new Response(sitemapXml()), request, { type: "application/xml" });
  }
  const markdown = Object.hasOwn(publicPages, route) ? publicPages[route] : null;
  if (markdown) {
    const type = negotiate(request.headers.get("Accept"));
    if (!type) {
      return finish(new Response("Supported representations: text/html and text/markdown.\n", { status: 406 }), request, { negotiated: true, type: "text/plain", markdown });
    }
    const response = type === "text/markdown"
      ? await fetchAsset(representationRequest(request, markdown, type))
      : await fetchPage(representationRequest(request, null, type));
    if (type === "text/markdown" && response.status !== 200) {
      return finish(new Response("The Markdown representation is temporarily unavailable. Use the HTML page or /llms.txt.\n", { status: 503 }), request, { negotiated: true, type: "text/plain", markdown });
    }
    return finish(response, request, { negotiated: true, type: response.status === 200 ? type : undefined, markdown });
  }

  const response = await fetchPage(request);
  if (response.status === 404) {
    // Generic agents (including curl's */*) receive Markdown. Browsers retain
    // the existing styled HTML 404; neither variant ever returns the app shell.
    const type = negotiate(request.headers.get("Accept"), "text/markdown");
    if (type !== "text/html") {
      return finish(new Response(recoveryMarkdown, { status: 404 }), request, { negotiated: true, type: "text/markdown" });
    }
    return finish(response, request, { negotiated: true });
  }
  const type = url.pathname.endsWith(".md") ? "text/markdown"
    : ["/llms.txt", "/robots.txt"].includes(url.pathname) ? "text/plain" : undefined;
  return type && response.status === 200 ? finish(response, request, { type }) : response;
}
