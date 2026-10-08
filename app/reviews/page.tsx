import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../components/info-page";

const googleBusinessProfile = "https://maps.app.goo.gl/WaAbT69aPrdSKALi8";

export const metadata: Metadata = {
  title: "Jenergie Google Reviews | Higham Ferrers",
  description:
    "Read verified Google feedback for Jenergie sports massage therapy and personal training in Higham Ferrers, near Rushden.",
  alternates: {
    canonical: "/reviews/",
    types: { "text/markdown": "/reviews.md" },
  },
};

export default function ReviewsPage() {
  return (
    <InfoPage
      eyebrow="Client feedback"
      title="Jenergie reviews."
      intro="Feedback helps you get a feel for Jenergie before you contact me. This page shares reviews from my public Google Business Profile and links back to the original source."
    >
      <section className="reviews-overview">
        <div>
          <h2>Reviews on Google</h2>
          <p className="review-updated">Checked 8 October 2026</p>
        </div>
        <div className="google-rating" aria-label="Jenergie is rated 5 out of 5 from 1 Google review">
          <strong>5.0</strong>
          <span className="review-stars" aria-hidden="true">★★★★★</span>
          <p>Based on 1 Google review</p>
          <a href={googleBusinessProfile} target="_blank" rel="noreferrer">View Jenergie on Google <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="review-list-section">
        <div>
          <h2>What a client says</h2>
          <p>Shown as it appears on Google.</p>
        </div>
        <article className="review-card">
          <div className="review-card-top">
            <span className="review-stars" aria-label="5 out of 5 stars">★★★★★</span>
            <span>Google review</span>
          </div>
          <blockquote>“10/10 service, would recommend Jen to anyone looking for a personal trainer”</blockquote>
          <footer>
            <strong>Adam M.</strong>
            <span>Posted on Google</span>
          </footer>
        </article>
      </section>

      <section>
        <h2>Ready to ask a question?</h2>
        <div>
          <p>
            Sports massage is the main service at Jenergie, with personal training available as an optional extra. If you would like to talk through what you need, contact me and I will help you choose the right appointment.
          </p>
          <Link className="button button-dark" href="/contact/">Contact Jenni <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </InfoPage>
  );
}
