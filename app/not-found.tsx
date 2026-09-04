import { InfoPage } from "./components/info-page";
import Link from "next/link";

export default function NotFound() {
  return (
    <InfoPage
      eyebrow="404 page not found"
      title="That page does not exist."
      intro="The address may be incorrect or the page may have moved. Use one of the links below to find official Jenergie information."
    >
      <section>
        <h2>Where to look next</h2>
        <ul className="resource-list">
          <li><Link href="/">Jenergie homepage</Link><span>An introduction to the practice and links to each section.</span></li>
          <li><Link href="/treatments/">Treatments</Link><span>Sports massage, recovery support and optional personal training.</span></li>
          <li><Link href="/prices/">Prices</Link><span>Current appointment lengths and prices.</span></li>
          <li><a href="/sitemap.xml">XML sitemap</a><span>All indexable pages on this website.</span></li>
          <li><a href="/llms.txt">llms.txt</a><span>Concise machine-readable site guide.</span></li>
          <li><a href="/agent-resources/">Agent resources</a><span>Usage guidance and official sources.</span></li>
        </ul>
        <pre className="agent-recovery">{`# Jenergie page not found\n\nThe requested path does not exist.\n\n- Homepage: https://jenergie.co.uk/\n- Sitemap: https://jenergie.co.uk/sitemap.xml\n- LLM guide: https://jenergie.co.uk/llms.txt\n- Agent resources: https://jenergie.co.uk/agent-resources/`}</pre>
      </section>
    </InfoPage>
  );
}
