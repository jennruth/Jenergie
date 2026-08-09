const Arrow = () => <span aria-hidden="true">↗</span>;

const services = [
  {
    number: "01",
    title: "Solar & storage",
    copy: "Generate, store and use more of your own clean energy with a system designed around your real demand.",
    tag: "Make it",
  },
  {
    number: "02",
    title: "Heat & comfort",
    copy: "Move beyond fossil fuels with efficient, beautifully integrated heating that keeps every space just right.",
    tag: "Feel it",
  },
  {
    number: "03",
    title: "Electric mobility",
    copy: "Charge intelligently at home or at work, using the cleanest and most cost-effective energy available.",
    tag: "Move with it",
  },
];

const process = [
  ["Understand", "We listen first—your space, your priorities, your energy use and where you want to go."],
  ["Design", "We model the whole energy picture and turn the complexity into one clear, joined-up plan."],
  ["Deliver", "Our trusted specialists manage the detail, installation and aftercare from end to end."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Jenergie home">
          <span className="brand-mark" aria-hidden="true">J</span>
          <span>jenergie</span>
        </a>
        <div className="nav-links">
          <a href="#solutions">Solutions</a>
          <a href="#approach">Approach</a>
          <a href="#why">Why Jenergie</a>
        </div>
        <a className="button button-small" href="#contact">Start a project <Arrow /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> Smarter energy, made human</p>
          <h1>Power your<br />world <em>better.</em></h1>
          <p className="hero-intro">
            Clean energy should feel simple. We design joined-up solar, storage, heating and charging systems that put you in control.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">Plan your energy future <Arrow /></a>
            <a className="text-link" href="#solutions">Explore solutions <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="energy-stage" aria-label="A connected Jenergie home energy system">
          <div className="sun-orbit orbit-one" />
          <div className="sun-orbit orbit-two" />
          <div className="energy-core">
            <span className="core-label">LIVE</span>
            <strong>4.8</strong>
            <small>kW generating</small>
          </div>
          <div className="system-card card-solar">
            <span className="system-icon solar-icon" aria-hidden="true" />
            <span><small>Solar</small><strong>Generating</strong></span>
            <i className="status-dot" />
          </div>
          <div className="system-card card-home">
            <span className="system-icon home-icon" aria-hidden="true" />
            <span><small>Home</small><strong>Comfort · 21°</strong></span>
            <i className="status-dot" />
          </div>
          <div className="system-card card-battery">
            <span className="system-icon battery-icon" aria-hidden="true" />
            <span><small>Battery</small><strong>82% charged</strong></span>
            <i className="status-dot" />
          </div>
          <div className="stage-caption"><span>One connected system</span><span>Designed around you</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Jenergie promise">
        <div className="shell trust-inner">
          <span>Independent advice</span><i />
          <span>Whole-system thinking</span><i />
          <span>End-to-end delivery</span><i />
          <span>Long-term support</span>
        </div>
      </section>

      <section className="section shell" id="solutions">
        <div className="section-heading">
          <div>
            <p className="eyebrow">What we do</p>
            <h2>Everything works better<br />when it works <em>together.</em></h2>
          </div>
          <p>We look at the complete energy picture, then create a system that feels effortless today and ready for tomorrow.</p>
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
              <a href="#contact" aria-label={`Talk to us about ${service.title}`}>Discover more <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="dark-section" id="approach">
        <div className="shell">
          <div className="approach-intro">
            <p className="eyebrow light">The Jenergie way</p>
            <h2>Clear thinking.<br /><em>Bright outcomes.</em></h2>
            <p>No hard sell. No off-the-shelf answers. Just honest expertise, thoughtful design and a partner who stays with you.</p>
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
          <span>MAKE ENERGY MAKE SENSE</span><i>✦</i><span>MAKE ENERGY MAKE SENSE</span><i>✦</i><span>MAKE ENERGY MAKE SENSE</span>
        </div>
      </section>

      <section className="section impact shell" id="why">
        <div className="impact-copy">
          <p className="eyebrow">Why Jenergie</p>
          <h2>Energy is personal.<br />So is our <em>approach.</em></h2>
          <p>Every property, business and ambition is different. That’s why we start with your world—not a product list.</p>
          <a className="button button-dark" href="#contact">Meet your energy partner <Arrow /></a>
        </div>
        <div className="proof-grid">
          <article className="proof-card proof-primary">
            <span className="proof-symbol" aria-hidden="true">◎</span>
            <strong>One</strong>
            <h3>connected plan</h3>
            <p>Advice, design and delivery brought together under one roof.</p>
          </article>
          <article className="proof-card">
            <span className="proof-symbol" aria-hidden="true">↗</span>
            <strong>Future</strong>
            <h3>ready by design</h3>
            <p>Flexible systems that can evolve as your needs do.</p>
          </article>
          <article className="proof-card proof-wide">
            <div>
              <span className="proof-symbol" aria-hidden="true">○</span>
              <strong>Real</strong>
              <h3>people, long-term support</h3>
            </div>
            <blockquote>“The right energy solution isn’t the most complicated one. It’s the one that simply works for you.”</blockquote>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <div className="shell contact-inner">
          <p className="eyebrow light">Your energy future starts here</p>
          <h2>Ready to make<br />energy feel <em>easy?</em></h2>
          <p>Tell us where you are today. We’ll help you see what’s possible next.</p>
          <a className="button button-light" href="mailto:hello@jenergie.co.uk">hello@jenergie.co.uk <Arrow /></a>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-main">
          <a className="brand brand-light" href="#top" aria-label="Jenergie home">
            <span className="brand-mark" aria-hidden="true">J</span><span>jenergie</span>
          </a>
          <p>Smarter energy.<br />Designed around you.</p>
          <div className="footer-links">
            <div><span>Explore</span><a href="#solutions">Solutions</a><a href="#approach">Our approach</a><a href="#why">Why Jenergie</a></div>
            <div><span>Connect</span><a href="mailto:hello@jenergie.co.uk">Email us</a><a href="#contact">Start a project</a></div>
          </div>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Jenergie</span><span>Clean energy, clearly.</span></div>
      </footer>
    </main>
  );
}
