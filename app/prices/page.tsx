import { bookingUrl } from "../booking";
import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Sports Massage Prices in Higham Ferrers | Jenergie",
  description:
    "See Jenergie sports massage prices in Higham Ferrers, near Rushden. Appointments start from £35.",
  alternates: {
    canonical: "/prices/",
    types: { "text/markdown": "/prices.md" },
  },
};

export default function PricesPage() {
  return (
    <InfoPage
      eyebrow="Simple, transparent pricing"
      title="Choose the support your body needs."
      intro="Choose the sports massage appointment that best fits what you would like help with. If you are unsure, Jenni can talk you through the options."
    >
      <section className="page-pricing-section">
        <div className="pricing-grid">
          <article className="price-panel price-panel-primary">
            <div className="price-panel-top">
              <div><span>Primary service</span><h2>Sports massage therapy</h2></div>
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
            <a href="mailto:Jen@jenergie.co.uk?subject=Sports%20massage%20enquiry">Enquire about sports massage <span aria-hidden="true">↗</span></a>
          </article>
        </div>
      </section>

      <section>
        <h2>Not sure what to choose?</h2>
        <div>
          <p>Your first sports massage appointment is 55 minutes, allowing time to discuss what you would like help with before treatment begins. Follow-up appointments can focus on one area for 30 minutes or two areas for 60 minutes.</p>
          <p>Contact Jenni if you would like to talk through the options. Sending a message is an enquiry, and your appointment is confirmed directly with Jenni.</p>
          <a className="button button-dark" href={bookingUrl}>Book now <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </InfoPage>
  );
}
