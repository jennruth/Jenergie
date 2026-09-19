import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Contact Jenergie | Higham Ferrers Sports Massage",
  description:
    "Contact Jenni at Jenergie to ask about sports massage or personal training and arrange an appointment in Higham Ferrers, near Rushden.",
  alternates: {
    canonical: "/contact/",
    types: { "text/markdown": "/contact.md" },
  },
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact Jenergie"
      title="Ask a question or arrange a session."
      intro="Send me a message using the form below, or email or call me directly. I can help you choose the right appointment and confirm availability."
    >
      <section className="contact-enquiry" aria-label="Contact Jenni">
        <div className="contact-options">
          <h2>Email or call</h2>
          <p>I am happy to talk through the options before you decide.</p>
          <a href="mailto:Jen@jenergie.co.uk?subject=Jenergie%20enquiry"><span>Email</span><strong>Jen@jenergie.co.uk</strong></a>
          <a href="tel:+447547254349"><span>Phone</span><strong>07547 254349</strong></a>
          <p className="contact-location">Based in Higham Ferrers, North Northamptonshire, close to Rushden.</p>
        </div>
        <div className="contact-form-wrap">
          <h2>Send a message</h2>
          <iframe
            src="https://tally.so/embed/xXqDQJ?alignLeft=1&hideTitle=1&transparentBackground=1"
            title="Contact Jenni enquiry form"
            width="100%"
            height="950"
            style={{ border: 0 }}
          />
          <p>Having trouble with the form? <a href="https://tally.so/r/xXqDQJ" target="_blank" rel="noopener noreferrer">Open it in a new tab</a> or email <a href="mailto:jen@jenergie.co.uk">jen@jenergie.co.uk</a>.</p>
        </div>
      </section>

      <section>
        <h2>What to include in your message</h2>
        <p>
          Let Jenni know whether you are asking about sports massage, personal training or an exercise plan, along with the days or times that usually work for you. Please keep detailed medical and health information for your consultation. Jenni will reply to discuss the most suitable appointment and confirm availability. Sending a message is an enquiry and does not create a booking until Jenni confirms it with you.
        </p>
      </section>

      <section>
        <h2>Before your appointment</h2>
        <p>
          If it is your first sports massage appointment, allow 55 minutes. This gives time to discuss your needs before treatment. Please tell Jenni about relevant injuries, health conditions or changes in how you feel when you make contact. Jenergie provides sports massage and fitness support, not emergency or diagnostic medical care. If you have severe, sudden or worrying symptoms, seek advice from an appropriate healthcare professional or emergency service.
        </p>
      </section>

      <section>
        <h2>Getting in touch from the local area</h2>
        <p>
          The practice is based in Higham Ferrers and is convenient for Rushden. Clients also travel from elsewhere in North Northamptonshire. If you are unsure whether Jenergie is right for what you need, contact Jenni and ask. She can explain what the service involves before you decide whether to arrange an appointment.
        </p>
      </section>
    </InfoPage>
  );
}
