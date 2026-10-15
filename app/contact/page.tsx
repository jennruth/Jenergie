import { bookingUrl } from "../booking";
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
      intro="Book online with Fresha, or email or call me directly if you would like help choosing the right appointment."
    >
      <section><h2>Book your appointment</h2><p>Choose a service and see available appointments on Fresha. You can also get in touch below if you need help choosing.</p><a className="button button-dark" href={bookingUrl}>Book now on Fresha</a></section><section className="contact-enquiry" aria-label="Contact Jenni">
        <div className="contact-options">
          <h2>Email or call</h2>
          <p>I am happy to talk through the options before you decide.</p>
          <a href="mailto:Jen@jenergie.co.uk?subject=Jenergie%20enquiry"><span>Email</span><strong>Jen@jenergie.co.uk</strong></a>
          <a href="tel:+447547254349"><span>Phone</span><strong>07547 254349</strong></a>
          <p className="contact-location">Based in Higham Ferrers, North Northamptonshire, close to Rushden.</p>
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
          If it is your first sports massage appointment, allow 55 minutes. This gives time to discuss your needs before treatment. Relevant injuries, health conditions and changes in how you feel will be covered securely as part of your consultation, so please do not include detailed health information in your initial enquiry. Jenergie provides sports massage and fitness support, not emergency or diagnostic medical care. If you have severe, sudden or worrying symptoms, seek advice from an appropriate healthcare professional or emergency service.
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
