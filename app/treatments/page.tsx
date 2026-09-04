import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Sports Massage Treatments in Higham Ferrers | Jenergie",
  description:
    "Explore sports massage therapy, recovery support and optional personal training with Jenergie in Higham Ferrers, near Rushden.",
  alternates: {
    canonical: "/treatments/",
    types: { "text/markdown": "/treatments.md" },
  },
};

const services = [
  {
    number: "01",
    title: "Sports massage therapy",
    copy: "Focused treatment to help ease muscular tension and improve the way you move. Your session is planned around what feels uncomfortable and what you would like help with.",
    tag: "Primary service",
  },
  {
    number: "02",
    title: "Recovery and mobility",
    copy: "Useful for tired muscles after training, everyday stiffness or regular maintenance. Each appointment is based on how your body feels on the day.",
    tag: "Move with ease",
  },
  {
    number: "03",
    title: "One-to-one personal training",
    copy: "Individual sessions for people who want help building strength and moving well. Personal training is available as an extra alongside sports massage.",
    tag: "Available as an extra",
  },
];

const process = [
  ["Talk", "First, we talk about what feels tight or uncomfortable, what you want to get back to and anything else that may affect the session."],
  ["Assess", "I look at how you move and check where tension or restricted movement may be coming from."],
  ["Treat", "I focus the treatment on what we find and explain any simple aftercare that may help."],
];

export default function TreatmentsPage() {
  return (
    <InfoPage
      eyebrow="Jenergie treatments"
      title="Care shaped around your body."
      intro="Sports massage is the main service at Jenergie. You do not need to be an athlete. Treatment can support active bodies, working bodies and anyone dealing with muscular tension or stiffness."
    >
      <section className="page-card-section">
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="card-top"><span>{service.number}</span><span className="mini-arrow">↗</span></div>
              <div className={`service-visual visual-${service.number}`} aria-hidden="true">
                <span className="visual-ring" /><span className="visual-block" />
              </div>
              <p className="service-tag">{service.tag}</p>
              <h2>{service.title}</h2>
              <p>{service.copy}</p>
              <a href="/contact/" aria-label={`Enquire about ${service.title}`}>Contact Jenni <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="page-process-section">
        <div>
          <p className="eyebrow">The Jenergie approach</p>
          <h2>Listen first. Treat with purpose.</h2>
          <p>No two appointments are exactly the same. The session begins with a conversation about what is bothering you and what you want to achieve.</p>
        </div>
        <div className="process-list light-process">
          {process.map(([title, copy], index) => (
            <article className="process-item" key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Not only for athletes</h2>
        <div>
          <p>Sports massage may be useful if exercise leaves your muscles feeling tight, but it can also help with stiffness linked to work, travel and everyday routines. Jenni takes your activity, work and day-to-day life into account rather than using the same treatment for everyone.</p>
          <p>If you are unsure which appointment to choose, contact Jenni before arranging a session. She can explain the options and whether an initial appointment would be the best place to start.</p>
          <a className="button button-dark" href="/prices/">View prices <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </InfoPage>
  );
}
