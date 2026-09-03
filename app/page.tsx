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
      itemListElement: [
        {
          "@type": "Offer",
          price: "45",
          priceCurrency: "GBP",
          itemOffered: {
            "@type": "Service",
            name: "Initial sports massage appointment",
            serviceType: "Sports massage therapy",
          },
        },
        {
          "@type": "Offer",
          price: "35",
          priceCurrency: "GBP",
          itemOffered: {
            "@type": "Service",
            name: "30-minute sports massage",
            serviceType: "Sports massage therapy",
          },
        },
        {
          "@type": "Offer",
          price: "55",
          priceCurrency: "GBP",
          itemOffered: {
            "@type": "Service",
            name: "60-minute sports massage",
            serviceType: "Sports massage therapy",
          },
        },
        {
          "@type": "Offer",
          price: "45",
          priceCurrency: "GBP",
          itemOffered: {
            "@type": "Service",
            name: "One-to-one personal training",
            serviceType: "Personal training",
          },
        },
        {
          "@type": "Offer",
          price: "70",
          priceCurrency: "GBP",
          itemOffered: {
            "@type": "Service",
            name: "Bespoke exercise plan",
            serviceType: "Personal training",
          },
        },
      ],
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

const services = [
  {
    number: "01",
    title: "Sports massage therapy",
    copy: "Sports massage treatment in Higham Ferrers to help ease muscular tension and improve the way you move.",
    tag: "Primary service",
  },
  {
    number: "02",
    title: "Recovery & mobility",
    copy: "Useful for tired muscles after training, everyday stiffness or regular maintenance. Each appointment is based on how your body feels on the day.",
    tag: "Move with ease",
  },
  {
    number: "03",
    title: "One-to-one personal training",
    copy: "One-to-one sessions in Higham Ferrers for people who want help building strength and moving well. Available as an extra alongside sports massage.",
    tag: "Available as an extra",
  },
];

const process = [
  ["Talk", "First, we talk about what feels tight or uncomfortable, what you want to get back to and anything else that may affect the session."],
  ["Assess", "I look at how you move and check where tension or restricted movement may be coming from."],
  ["Treat", "I focus the treatment on what we find and explain any simple aftercare that may help."],
];

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Jenergie home">
          <BrandLockup />
        </a>
        <div className="nav-links">
          <a href="#treatments">Treatments</a>
          <a href="#prices">Prices</a>
          <a href="#approach">Approach</a>
          <a href="#areas">Areas</a>
        </div>
        <a className="button button-small" href="#contact">Contact Jenni <Arrow /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> Sports massage · Higham Ferrers</p>
          <h1 className="tagline-heading">Energy for your body.<br /><em>Care for your muscles.</em></h1>
          <p className="hero-intro">
            Sports massage therapy with Jenni in Higham Ferrers, near Rushden. Personal training is also available as an extra for clients across North Northamptonshire.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">Contact Jenni <Arrow /></a>
            <a className="text-link" href="#treatments">See how I can help <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="energy-stage treatment-stage" aria-label="Jenergie sports massage planned around your body and goals">
          <div className="sun-orbit orbit-one" />
          <div className="sun-orbit orbit-two" />
          <img className="body-mark" src="/brand/jenergie-icon.png" alt="" />
          <div className="energy-core treatment-core">
            <span className="core-label">TAILORED</span>
            <strong>YOU</strong>
            <small>at the centre</small>
          </div>
          <div className="system-card card-solar">
            <span className="system-icon tension-icon" aria-hidden="true" />
            <span><small>Release</small><strong>Muscular tension</strong></span>
            <i className="status-dot" />
          </div>
          <div className="system-card card-home">
            <span className="system-icon mobility-icon" aria-hidden="true" />
            <span><small>Restore</small><strong>Better movement</strong></span>
            <i className="status-dot" />
          </div>
          <div className="system-card card-battery">
            <span className="system-icon recovery-icon" aria-hidden="true" />
            <span><small>Support</small><strong>Recovery</strong></span>
            <i className="status-dot" />
          </div>
          <div className="stage-caption"><span>Sports massage therapy</span><span>Personal training available</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Jenergie services">
        <div className="shell trust-inner">
          <span>Release tension</span><i />
          <span>Move with confidence</span><i />
          <span>Support recovery</span><i />
          <span>Train with purpose</span>
        </div>
      </section>

      <section className="section shell" id="treatments">
        <div className="section-heading">
          <div>
            <p className="eyebrow">How Jenergie can help</p>
            <h2>Sports massage shaped<br />around <em>your body.</em></h2>
          </div>
          <p>Sports massage is the main service at Jenergie. I plan each treatment around what feels uncomfortable, how you move and what you would like help with.</p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="card-top"><span>{service.number}</span><span className="mini-arrow">↗</span></div>
              <div className={`service-visual visual-${service.number}`} aria-hidden="true">
                <span className="visual-ring" /><span className="visual-block" />
              </div>
              <p className="service-tag">{service.tag}</p>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href="#contact" aria-label={`Enquire about ${service.title}`}>Find out more <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="prices">
        <div className="shell">
          <div className="pricing-heading">
            <div>
              <p className="eyebrow">Simple, transparent pricing</p>
              <h2>Choose the support<br /><em>your body needs.</em></h2>
            </div>
            <p>Sports massage is Jenergie’s main service. Personal training is an optional extra if you would like help with strength, exercise or movement.</p>
          </div>

          <div className="pricing-grid">
            <article className="price-panel price-panel-primary">
              <div className="price-panel-top">
                <div><span>Primary service</span><h3>Sports massage therapy</h3></div>
                <span className="price-badge">SMT</span>
              </div>
              <div className="price-list">
                <div className="price-row">
                  <div><strong>Initial appointment</strong><small>Your first focused appointment</small></div>
                  <span>55 min</span><b>£45</b>
                </div>
                <div className="price-row">
                  <div><strong>One area</strong><small>Focused treatment for one area</small></div>
                  <span>30 min</span><b>£35</b>
                </div>
                <div className="price-row">
                  <div><strong>Two areas</strong><small>Extended treatment across two areas</small></div>
                  <span>60 min</span><b>£55</b>
                </div>
              </div>
              <a href="mailto:Jen@jenergie.co.uk?subject=Sports%20massage%20enquiry">Enquire about sports massage <Arrow /></a>
            </article>

            <article className="price-panel price-panel-secondary">
              <div className="price-panel-top">
                <div><span>Optional extra</span><h3>Personal training</h3></div>
                <span className="price-badge">PT</span>
              </div>
              <div className="price-list">
                <div className="price-row">
                  <div><strong>One-to-one session</strong><small>Personal training planned around you</small></div>
                  <span>1 hour</span><b>£45</b>
                </div>
                <div className="price-row">
                  <div><strong>Bespoke exercise plan</strong><small>A plan built around your goals</small></div>
                  <span>One-off</span><b>£70</b>
                </div>
              </div>
              <a href="mailto:Jen@jenergie.co.uk?subject=Personal%20training%20enquiry">Ask about personal training <Arrow /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="dark-section" id="approach">
        <div className="shell">
          <div className="approach-intro">
            <p className="eyebrow light">The Jenergie approach</p>
            <h2>Listen first.<br /><em>Treat with purpose.</em></h2>
            <p>No two appointments are exactly the same. I start by listening to what is bothering you, then look at how you move before beginning treatment.</p>
          </div>
          <div className="process-list">
            {process.map(([title, copy], index) => (
              <article className="process-item" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="ticker" aria-hidden="true">
          <span>MOVE · RECOVER · PERFORM</span><i>●</i><span>MOVE · RECOVER · PERFORM</span><i>●</i><span>MOVE · RECOVER · PERFORM</span>
        </div>
      </section>

      <section className="section impact shell" id="why">
        <div className="impact-copy">
          <p className="eyebrow">Why Jenergie</p>
          <h2>Your body.<br />Your goals. <em>Your session.</em></h2>
          <p>I take your work, exercise and day-to-day life into account, so the treatment makes sense for you.</p>
          <a className="button button-dark" href="#contact">Start feeling better <Arrow /></a>
        </div>
        <div className="proof-grid">
          <article className="proof-card proof-primary">
            <span className="proof-symbol" aria-hidden="true">◎</span>
            <strong>One</strong>
            <h3>treatment shaped around you</h3>
            <p>Your needs guide the session. I do not use a set routine.</p>
          </article>
          <article className="proof-card">
            <span className="proof-symbol" aria-hidden="true">↗</span>
            <strong>Move</strong>
            <h3>with greater confidence</h3>
            <p>Support for active bodies, working bodies and every body in between.</p>
          </article>
          <article className="proof-card proof-wide">
            <div>
              <span className="proof-symbol" aria-hidden="true">●</span>
              <strong>Real</strong>
              <h3>care, practical support</h3>
            </div>
            <p className="proof-quote">Sports massage is not only for athletes. It can help with aches, tight muscles and stiffness from everyday life.</p>
          </article>
        </div>
      </section>

      <section className="location-section" id="areas" aria-labelledby="areas-heading">
        <div className="shell location-layout">
          <div className="location-copy">
            <p className="eyebrow">Local sports massage</p>
            <h2 id="areas-heading">Sports massage and personal training<br /><em>in Higham Ferrers.</em></h2>
            <p>
              Jenergie is based in Higham Ferrers and is easy to reach from Rushden. Clients also visit from across North Northamptonshire for sports massage, personal training and exercise plans.
            </p>
            <a className="button button-dark" href="#contact">Contact Jenni <Arrow /></a>
          </div>
          <div className="area-grid" aria-label="Areas served">
            <article>
              <span>01</span>
              <h3>Higham Ferrers</h3>
              <p>Local sports massage therapy, personal training and bespoke exercise plans.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Rushden</h3>
              <p>Conveniently located for people seeking sports massage or personal training near Rushden.</p>
            </article>
            <article>
              <span>03</span>
              <h3>North Northamptonshire</h3>
              <p>Welcoming clients from across the local area for massage, recovery and fitness support.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <div className="shell contact-inner">
          <p className="eyebrow light">Contact Jenni</p>
          <h2>Want to arrange a session<br /><em>or ask a question?</em></h2>
          <p>Tell me what is bothering you or what you would like help with. I am based in Higham Ferrers, near Rushden.</p>
          <div className="contact-actions">
            <a className="button button-light" href="mailto:Jen@jenergie.co.uk?subject=Sports%20massage%20enquiry">Email Jen <Arrow /></a>
            <a className="contact-phone" href="tel:+447547254349">07547 254349</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-main">
          <a className="brand footer-brand" href="#top" aria-label="Jenergie home">
            <BrandLockup dark />
          </a>
          <p>Move freely.<br />Feel stronger.</p>
          <div className="footer-links">
            <div><span>Explore</span><a href="#treatments">Treatments</a><a href="#prices">Prices</a><a href="#approach">My approach</a><a href="#areas">Areas served</a></div>
            <div><span>Connect</span><a href="mailto:Jen@jenergie.co.uk?subject=Sports%20massage%20enquiry">Jen@jenergie.co.uk</a><a href="tel:+447547254349">07547 254349</a><a href="#contact">Contact Jenni</a></div>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Jenergie · Higham Ferrers · Rushden · North Northamptonshire</span>
          <span>Energy for your body. Care for your muscles.</span>
          <button className="cookie-settings" type="button" data-cookie-settings>Cookie settings</button>
        </div>
      </footer>

      <aside
        className="cookie-banner"
        id="analytics-consent"
        role="dialog"
        aria-labelledby="analytics-consent-title"
        aria-describedby="analytics-consent-description"
        aria-live="polite"
        hidden
      >
        <div>
          <strong id="analytics-consent-title">Your privacy choices</strong>
          <p id="analytics-consent-description">
            Jenergie uses optional Google Analytics cookies to see how people use the website and contact links. Analytics only loads if you allow it. Read Google’s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.
          </p>
        </div>
        <div className="cookie-actions">
          <button type="button" data-analytics-choice="denied">Necessary only</button>
          <button className="cookie-accept" type="button" data-analytics-choice="granted">Allow analytics</button>
        </div>
      </aside>
    </main>
  );
}
