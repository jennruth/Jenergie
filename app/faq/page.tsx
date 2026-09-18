import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Sports Massage FAQs in Higham Ferrers | Jenergie",
  description:
    "Answers to common questions about Jenergie sports massage, first appointments, prices and contacting Jenni in Higham Ferrers, near Rushden.",
  alternates: {
    canonical: "/faq/",
    types: { "text/markdown": "/faq.md" },
  },
};

export default function FaqPage() {
  return (
    <InfoPage
      eyebrow="Good to know"
      title="Frequently asked questions."
      intro="A few useful answers before you get in touch. If your question is not here, please ask me. I am happy to help you choose the right appointment."
    >
      <section className="faq-section">
        <div>
          <h2>Before your visit</h2>
          <p>Sports massage is the main service at Jenergie. Personal training is there if you want it, but it is never required.</p>
        </div>
        <div className="faq-list">
          <details>
            <summary>Do I need to be an athlete to have a sports massage?</summary>
            <p>No. People come to me after exercise, because work or daily routines leave them feeling stiff, or simply for regular muscular maintenance. We will talk about what you would like from the session.</p>
          </details>
          <details>
            <summary>What happens at my first appointment?</summary>
            <p>Your first sports massage appointment is 55 minutes. We will start by talking about how you are feeling and anything that could affect treatment. I may look at how you move before the massage, and I will check that you are comfortable as we go.</p>
          </details>
          <details>
            <summary>Which sports massage appointment should I choose?</summary>
            <p>If it is your first visit, choose the 55-minute initial appointment at £45. Follow-up options are one area for 30 minutes at £35, or two areas for 60 minutes at £55. If you are unsure, <Link href="/contact/">contact me</Link> and we can talk it through.</p>
          </details>
          <details>
            <summary>Is personal training part of a massage appointment?</summary>
            <p>No. One-to-one personal training and bespoke exercise plans are optional extras. A one-hour training session is £45, and a bespoke exercise plan is £70. You do not need to book either to have sports massage.</p>
          </details>
          <details>
            <summary>How do I arrange an appointment?</summary>
            <p>Send me a message through the <Link href="/contact/">contact page</Link>, email <a href="mailto:Jen@jenergie.co.uk">Jen@jenergie.co.uk</a> or call <a href="tel:+447547254349">07547 254349</a>. There is no online booking system. Your appointment is confirmed when I have agreed the details with you.</p>
          </details>
          <details>
            <summary>What if I feel unwell before my appointment?</summary>
            <p>Please contact me before you come in. Treatment may need to be rearranged if you have an infectious illness, fever, vomiting or diarrhoea, or if treatment would not be appropriate that day. The <Link href="/cancellation-policy/">appointment policy</Link> explains how this is handled.</p>
          </details>
          <details>
            <summary>What if I need to cancel or rearrange?</summary>
            <p>Please give at least 24 hours&apos; notice where you can. A charge may apply for late cancellations or missed appointments. There is room for discretion in exceptional circumstances. Read the full <Link href="/cancellation-policy/">cancellation and appointment policy</Link> for the terms.</p>
          </details>
          <details>
            <summary>Where is Jenergie based?</summary>
            <p>I am based in Higham Ferrers, close to Rushden, and welcome clients from across North Northamptonshire. <Link href="/contact/">Get in touch</Link> for appointment details.</p>
          </details>
        </div>
      </section>
      <section>
        <h2>Still have a question?</h2>
        <div>
          <p>Tell me what you would like help with, and I can explain the options before you decide. Sending a message is an enquiry, not a confirmed booking.</p>
          <Link className="button button-dark" href="/contact/">Contact Jenni <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </InfoPage>
  );
}
