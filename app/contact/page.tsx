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
      intro="Jenergie does not use an online booking system. Contact Jenni directly by email or phone and she will help you choose the right appointment."
    >
      <section className="contact-details" aria-label="Jenergie contact details">
        <div>
          <span>Email</span>
          <a href="mailto:Jen@jenergie.co.uk?subject=Jenergie%20enquiry">Jen@jenergie.co.uk</a>
        </div>
        <div>
          <span>Phone</span>
          <a href="tel:+447547254349">07547 254349</a>
        </div>
        <div>
          <span>Location</span>
          <strong>Higham Ferrers, North Northamptonshire</strong>
        </div>
      </section>

      <section>
        <h2>What to include in your message</h2>
        <p>
          Briefly explain what you would like help with, which area feels tight or uncomfortable and whether you are asking about sports massage, personal training or an exercise plan. You can also mention the days or times that usually work for you. Jenni will reply to discuss the most suitable appointment and confirm availability. Sending a message is an enquiry and does not create a booking until Jenni confirms it with you.
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
