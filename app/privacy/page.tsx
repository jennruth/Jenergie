import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";
import clientNotice from "./client-notice.json";

export const metadata: Metadata = {
  title: "Privacy Notice | Jenergie",
  description:
    "How Jenergie handles consultation and treatment records, Tally forms, Proton Drive storage, website analytics and your privacy choices.",
  alternates: {
    canonical: "/privacy/",
    types: { "text/markdown": "/privacy.md" },
  },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Jenergie privacy notice"
      title="Your information and your choices."
      intro="How Jenergie handles client records and website information, and the choices available to you. Last updated 19 September 2026."
    >
      <section id="client-records">
        <h2>Client consultation and treatment records</h2>
        <p>This is the Jenergie Privacy Notice referred to in your consultation form.</p>
      </section>
      {clientNotice.map(({ title, text }) => (
        <section key={title}>
          <h2>{title}</h2>
          <p>{text}</p>
        </section>
      ))}
      <section>
        <h2>Contact Jenergie about your information</h2>
        <p><a href="mailto:Jen@jenergie.co.uk">Jen@jenergie.co.uk</a> · <a href="tel:+447547254349">07547 254349</a> · <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">Make a complaint to the ICO</a></p>
      </section>
      <section id="website-privacy">
        <h2>Website enquiries, analytics and cookies</h2>
        <p>The following additional information applies when you use this website.</p>
      </section>
      <section>
        <h2>Who is responsible for your information</h2>
        <p>
          Jennifer Meadows, trading as Jenergie, is the data controller responsible for personal information used in connection with this website and its services. Jenergie is a sports massage and personal training business based in Higham Ferrers, North Northamptonshire. If you have a privacy question, want to exercise a data protection right or want information corrected, email <a href="mailto:Jen@jenergie.co.uk">Jen@jenergie.co.uk</a> or call <a href="tel:+447547254349">07547 254349</a>.
        </p>
      </section>

      <section>
        <h2>Information you choose to provide</h2>
        <p>
          The website contact form collects your name, email address, optional phone number and message through Tally. We use these details to respond to your enquiry and arrange requested services. Tally stores form responses in Europe on our behalf. Please do not include detailed medical or health information in a general enquiry. The website does not create customer accounts. You can also contact us by email or phone. An enquiry may include your name, contact details, availability and information about what you would like help with. Jenergie uses this information to reply, discuss whether a service is suitable, arrange an appointment and keep appropriate records relating to the service you request. Please do not send information that is not needed for your enquiry.
        </p>
      </section>

      <section>
        <h2>Analytics and cookies</h2>
        <p>
          Jenergie uses Google Analytics only if you select “Allow analytics” in the privacy choices shown on the website. Before consent, analytics storage is denied and the Google Analytics library is not loaded. If you consent, Google Analytics may set cookies and collect information such as pages viewed, approximate location, device or browser details and interactions with contact links. Jenergie uses this information to understand how the website is used and improve it. You can change your choice at any time through the Cookie settings link in the footer. Selecting “Necessary only” removes the Jenergie analytics cookies that the site can access.
        </p>
      </section>

      <section>
        <h2>Use, sharing and retention</h2>
        <p>
          Contact information is used to respond to you, arrange or manage services, maintain necessary business records and meet legal obligations. Website analytics is used only with consent. Information is not sold. It may be handled by service providers where needed to operate communications, analytics or website hosting, including Google Analytics when you consent. General enquiries that do not lead to an appointment are normally deleted within 12 months of the last meaningful contact. If an enquiry leads to treatment or another service, relevant information becomes part of the corresponding client or business record and is kept for the period explained in this notice or required for insurance, tax or legal purposes. Jenergie&apos;s policy is to retain event-level Google Analytics data for no longer than 14 months. Aggregated reports may be retained for longer because they do not directly identify individual visitors.
        </p>
      </section>

      <section>
        <h2>Your data protection rights</h2>
        <p>
          Depending on the circumstances, you may ask for access to your personal information, ask for inaccurate information to be corrected, request deletion or restriction, object to certain uses, withdraw consent or ask for information in a portable format. Withdrawing analytics consent does not affect processing that took place before withdrawal. Contact Jenergie first so the request can be considered. You can also raise a concern with the UK Information Commissioner’s Office through <a href="https://ico.org.uk/make-a-complaint/" rel="noopener noreferrer">ico.org.uk</a>.
        </p>
      </section>

      <section>
        <h2>External links and updates</h2>
        <p>
          Tally&apos;s current <a href="https://tally.so/help/gdpr" target="_blank" rel="noopener noreferrer">data-protection information</a>, Proton Drive&apos;s <a href="https://proton.me/drive/privacy-policy" target="_blank" rel="noopener noreferrer">privacy information</a> and Google&apos;s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a> explain how those providers handle information. Other external websites may have their own privacy terms. This notice may be updated if the website, a provider or the way Jenergie handles information changes. The latest version will remain available at this address with its update date shown above.
        </p>
      </section>
    </InfoPage>
  );
}

