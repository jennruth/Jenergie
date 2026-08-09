const Arrow = () => <span aria-hidden="true">↗</span>;

const services = [
  {
    number: "01",
    title: "Sports massage",
    copy: "Focused, hands-on treatment to ease muscular tension, support mobility and help your body feel ready for whatever comes next.",
    tag: "Primary service",
  },
  {
    number: "02",
    title: "Recovery & mobility",
    copy: "A tailored approach for training fatigue, day-to-day stiffness or ongoing maintenance—built around how you move and feel.",
    tag: "Move with ease",
  },
  {
    number: "03",
    title: "Personal training",
    copy: "Optional one-to-one training to build strength, confidence and movement quality alongside your treatment plan.",
    tag: "Available as an extra",
  },
];

const process = [
  ["Talk", "We start with you—what feels restricted, what you want to get back to and what your body has been doing lately."],
  ["Assess", "A movement-led assessment helps identify where tension, compensation or reduced mobility may be holding you back."],
  ["Treat", "Your session is shaped around what your body needs, with clear aftercare and practical next steps to support progress."],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand brand-image" href="#top" aria-label="Jenergie home">
          <img src="/brand/jenergie-logo.png" alt="Jenergie — Sports Massage Therapy and Personal Training" />
        </a>
        <div className="nav-links">
          <a href="#treatments">Treatments</a>
          <a href="#approach">Approach</a>
          <a href="#why">Why Jenergie</a>
        </div>
        <a className="button button-small" href="#contact">Book a session <Arrow /></a>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="pulse" /> Sports massage therapy</p>
          <h1>Move freely.<br />Perform <em>fully.</em></h1>
          <p className="hero-intro">
            Tailored sports massage to ease tension, improve the way you move and help you feel more at home in your body—whether you train hard or simply want to feel better.
          </p>
          <div className="hero-actions">
            <a className="button" href="#contact">Book your treatment <Arrow /></a>
            <a className="text-link" href="#treatments">See how I can help <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="energy-stage treatment-stage" aria-label="Jenergie sports massage, tailored around your body and goals">
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
            <h2>Feel better in the body<br />you move through <em>life in.</em></h2>
          </div>
          <p>Sports massage is at the heart of Jenergie. Every treatment responds to your body, your routine and the way you want to feel.</p>
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

      <section className="dark-section" id="approach">
        <div className="shell">
          <div className="approach-intro">
            <p className="eyebrow light">The Jenergie approach</p>
            <h2>Listen first.<br /><em>Treat with purpose.</em></h2>
            <p>No two bodies arrive with the same story. Your treatment starts with what you feel, how you move and what you want to achieve.</p>
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
          <p>Jenergie combines attentive, hands-on treatment with a practical understanding of movement, training and everyday life.</p>
          <a className="button button-dark" href="#contact">Start feeling better <Arrow /></a>
        </div>
        <div className="proof-grid">
          <article className="proof-card proof-primary">
            <span className="proof-symbol" aria-hidden="true">◎</span>
            <strong>One</strong>
            <h3>treatment shaped around you</h3>
            <p>Your needs guide the session—not a standard routine.</p>
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
            <blockquote>“You don’t have to be an athlete to benefit from sports massage. You just need a body that deserves to feel better.”</blockquote>
          </article>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" aria-hidden="true" />
        <div className="shell contact-inner">
          <p className="eyebrow light">Your next move starts here</p>
          <h2>Ready to feel<br /><em>more like you?</em></h2>
          <p>Tell me what’s going on and what you’d like help with.</p>
          <a className="button button-light" href="mailto:hello@jenergie.co.uk?subject=Sports%20massage%20enquiry">Book a session <Arrow /></a>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-main">
          <a className="brand brand-image footer-brand" href="#top" aria-label="Jenergie home">
            <img src="/brand/jenergie-logo-dark.png" alt="Jenergie — Sports Massage Therapy and Personal Training" />
          </a>
          <p>Move freely.<br />Feel stronger.</p>
          <div className="footer-links">
            <div><span>Explore</span><a href="#treatments">Treatments</a><a href="#approach">My approach</a><a href="#why">Why Jenergie</a></div>
            <div><span>Connect</span><a href="mailto:hello@jenergie.co.uk?subject=Sports%20massage%20enquiry">Email Jenergie</a><a href="#contact">Book a session</a></div>
          </div>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Jenergie</span><span>Sports massage therapy · Personal training</span></div>
      </footer>
    </main>
  );
}
