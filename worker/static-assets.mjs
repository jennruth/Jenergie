import { agentResponse } from "./agent-http.mjs";

// Deploys the exact existing static export, including its scripts and styling.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === "www.jenergie.co.uk") {
      url.hostname = "jenergie.co.uk";
      url.protocol = "https:";
      return Response.redirect(url.href, 301);
    }
    return agentResponse(request, (input) => env.ASSETS.fetch(input), (input) => env.ASSETS.fetch(input));
  },
};
