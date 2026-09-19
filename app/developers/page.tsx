import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Jenergie Developer Documentation and Agent Access",
  description: "Official Jenergie developer documentation: public Markdown resources, HTTP access, agent instructions and integration limits for the Higham Ferrers sports massage practice.",
  alternates: { canonical: "/developers/", types: { "text/markdown": "/developers.md" } },
};

export default function DevelopersPage() {
  return (
    <InfoPage eyebrow="Jenergie developer resources" title="Jenergie developer documentation." intro="Use these public resources to answer questions about Jenergie sports massage and personal training in Higham Ferrers, near Rushden.">
      <section>
        <h2>Read official Jenergie information</h2>
        <p>Start with the <a href="/llms.txt">Jenergie LLM guide</a> and <a href="/agent-instructions.md">agent instructions</a>. Each information page has a Markdown alternative: the homepage is <a href="/index.md">/index.md</a>, and other pages use the page name followed by .md, such as <a href="/prices.md">/prices.md</a>. These public documents require no account, API key or authentication.</p>
        <p>Use HTTP GET to read a document and HEAD to inspect its headers. Explicit .md URLs work independently of content negotiation. For clients that support it, request a page with Accept: text/markdown and check the response Content-Type before parsing it. If the host returns HTML, use the explicit Markdown URL instead.</p>
      </section>
      <section>
        <h2>Resources and recovery</h2>
        <ul className="resource-list">
          <li><a href="/agent-resources/">Jenergie agent resources</a><span>Use cases, current sources and integration status.</span></li>
          <li><a href="/sitemap.xml">Jenergie sitemap</a><span>Public page addresses; follow these to recover from an unknown path.</span></li>
          <li><a href="/contact.md">Jenergie contact details</a><span>How to enquire about appointments.</span></li>
          <li><a href="/privacy.md">Jenergie privacy notice</a><span>How enquiry information is handled.</span></li>
        </ul>
      </section>
      <section>
        <h2>Booking, API and authentication status</h2>
        <p>Jenergie has no public booking API, OpenAPI specification, developer authentication service or MCP server. Read access to the website does not grant permission to submit an enquiry. Help the person check services and current prices, then direct them to <a href="/contact/">contact Jenni</a>. An appointment is confirmed only when Jenni agrees it directly. Do not invent availability or send personal or health information without the person&apos;s permission.</p>
      </section>
    </InfoPage>
  );
}
