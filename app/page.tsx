import { InsuranceBadge } from "./components/insurance-badge";
import Link from "next/link";

const Arrow = () => <span aria-hidden="true">↗</span>;
const siteUrl = "https://jenergie.co.uk";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: "Jenergie",
    alternateName: "Jenergie Sports Massage Therapy",
    inLanguage: "en-GB",
  },
  {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Jenergie",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/brand/jenergie-icon.png`,
    image: `${siteUrl}/og.png`,
    description:
      "Sports massage therapy and one-to-one personal training in Higham Ferrers, near Rushden, serving clients across North Northamptonshire.",
    telephone: "+447547254349",
    email: "Jen@jenergie.co.uk",
    priceRange: "£35 to £70",
    knowsAbout: [
      "Sports massage therapy",
      "Muscle tension and mobility",
      "Exercise and recovery",
      "One-to-one personal training",
      "Bespoke exercise plans",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Higham Ferrers",
      addressRegion: "North Northamptonshire",
      addressCountry: "GB",
    },
    areaServed: [
      { "@type": "City", name: "Higham Ferrers" },
      { "@type": "City", name: "Rushden" },
      { "@type": "AdministrativeArea", name: "North Northamptonshire" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Jenergie treatments and training",
      url: `${siteUrl}/prices/`,
      itemListElement: [
        { "@type": "Offer", price: "45", priceCurrency: "GBP", itemOffered: { "@type": "Service", name: "Initial sports massage appointment", serviceType: "Sports massage therapy" } },
        { "@type": "Offer", price: "35", priceCurrency: "GBP", itemOffered: { "@type": "Service", name: "30-minute sports massage", serviceType: "Sports massage therapy" } },
        { "@type": "Offer", price: "55", priceCurrency: "GBP", itemOffered: { "@type": "Service", name: "60-minute sports massage", serviceType: "Sports massage therapy" } },
        { "@type": "Offer", price: "45", priceCurrency: "GBP", itemOffered: { "@type": "Service", name: "One-to-one personal training", serviceType: "Personal training" } },
        { "@type": "Offer", price: "70", priceCurrency: "GBP", itemOffered: { "@type": "Service", name: "Bespoke exercise plan", serviceType: "Personal training" } },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Jenergie",
    alternateName: "Jenergie Sports Massage Therapy",
    url: `${siteUrl}/`,
    logo: `${siteUrl}/brand/jenergie-icon.png`,
    description:
      "Jenergie provides sports massage therapy in Higham Ferrers, near Rushden, with optional personal training for clients across North Northamptonshire.",
    email: "Jen@jenergie.co.uk",
    telephone: "+447547254349",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer enquiries",
      email: "Jen@jenergie.co.uk",
      telephone: "+447547254349",
      areaServed: "GB",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Higham Ferrers",
      addressRegion: "North Northamptonshire",
      addressCountry: "GB",
    },
  },
];

const BrandLockup = ({ dark = false }: { dark?: boolean }) => (
  <span className={`brand-lockup${dark ? " brand-lockup-dark" : ""}`}>
    <img className="lockup-icon" src="/brand/jenergie-icon.png" alt="" />
    <span className="lockup-copy">
      <strong>Jenergie</strong>
      <small>Sports Massage Therapy</small>
      <i>Personal Training</i>
    </span>
  </span>
);

const pages = [
  { number: "01", title: "Treatments", copy: "Explore sports massage, recovery support and optional personal training.", href: "/treatments/" },
  { number: "02", title: "Prices", copy: "See appointment lengths and clear prices for every Jenergie service.", href: "/prices/" },
  { number: "03", title: "About Jenergie", copy: "Learn about Jenni's practical, personal approach and the local practice.", href: "/about/" },
];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <nav className="nav shell" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Jenergie home"><BrandLockup /></Link>
        <div className="nav-links">
          <Link href="/treatments/">Treatments</Link>
          <Link href="/prices/">Prices</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </div>
        <Link className="button button-small" href="/contact/">Contact Jenni <Arrow /></Link>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> Sports massage · Higham Ferrers</p>
          <h1 className="tagline-heading">Energy for your body.<br /><em>Care for your muscles.</em></h1>
          <p className="hero-intro">
            Sports massage therapy with Jenni in Higham Ferrers, near Rushden. Personal training is also available as an extra for clients across North Northamptonshire.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/contact/">Contact Jenni <Arrow /></Link>
            <Link className="text-link" href="/treatments/">Explore treatments <Arrow /></Link>
          </div>
        </div>

        <div className="energy-stage treatment-stage" aria-label="Jenergie sports massage planned around your body and goals">
          <div className="sun-orbit orbit-one" />
          <div className="sun-orbit orbit-two" />
          <img className="body-mark" src="/brand/jenergie-icon.png" alt="" />
          <div className="energy-core treatment-core"><span className="core-label">TAILORED</span><strong>YOU</strong><small>at the centre</small></div>
          <div className="system-card card-solar"><span className="system-icon tension-icon" aria-hidden="true" /><span><small>Release</small><strong>Muscular tension</strong></span><i className="status-dot" /></div>
          <div className="system-card card-home"><span className="system-icon mobility-icon" aria-hidden="true" /><span><small>Restore</small><strong>Better movement</strong></span><i className="status-dot" /></div>
          <div className="system-card card-battery"><span className="system-icon recovery-icon" aria-hidden="true" /><span><small>Support</small><strong>Recovery</strong></span><i className="status-dot" /></div>
          <div className="stage-caption"><span>Sports massage therapy</span><span>Personal training available</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Jenergie services">
        <div className="shell trust-inner"><span>Release tension</span><i /><span>Move with confidence</span><i /><span>Support recovery</span><i /><span>Train with purpose</span></div>
      </section>

      <section className="home-pages section shell" aria-labelledby="explore-heading">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore Jenergie</p>
            <h2 id="explore-heading">Find what you need,<br /><em>without the long scroll.</em></h2>
          </div>
          <p>Each area now has its own page, so treatments, prices and contact details are quicker to find.</p>
        </div>
        <div className="route-grid">
          {pages.map((page) => (
            <Link className="route-card" href={page.href} key={page.number}>
              <span>{page.number}</span><h3>{page.title}</h3><p>{page.copy}</p><strong>View page <Arrow /></strong>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-main">
          <div className="footer-brand-column"><Link className="brand footer-brand" href="/" aria-label="Jenergie home"><BrandLockup dark /></Link><InsuranceBadge /></div>
          <p>Move freely.<br />Feel stronger.</p>
          <div className="footer-links">
            <div><span>Explore</span><Link href="/treatments/">Treatments</Link><Link href="/prices/">Prices</Link><Link href="/about/">About Jenergie</Link><Link href="/cancellation-policy/">Cancellation policy</Link><Link href="/privacy/">Privacy</Link></div>
            <div><span>Connect</span><a href="mailto:Jen@jenergie.co.uk?subject=Sports%20massage%20enquiry">Jen@jenergie.co.uk</a><a href="tel:+447547254349">07547 254349</a><Link href="/contact/">Contact Jenni</Link><Link href="/agent-resources/">Agent resources</Link></div>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Jenergie · Higham Ferrers · Rushden · North Northamptonshire</span>
          <span>Energy for your body. Care for your muscles.</span>
          <button className="cookie-settings" type="button" data-cookie-settings>Cookie settings</button>
        </div>
      </footer>

      <aside className="cookie-banner" id="analytics-consent" role="dialog" aria-labelledby="analytics-consent-title" aria-describedby="analytics-consent-description" aria-live="polite" hidden>
        <div>
          <strong id="analytics-consent-title">Your privacy choices</strong>
          <p id="analytics-consent-description">Jenergie uses optional Google Analytics cookies to see how people use the website and contact links. Analytics only loads if you allow it. Read Google’s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>
        </div>
        <div className="cookie-actions"><button type="button" data-analytics-choice="denied">Necessary only</button><button className="cookie-accept" type="button" data-analytics-choice="granted">Allow analytics</button></div>
      </aside>
    </main>
  );
}
