import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "About Jenergie | Sports Massage in Higham Ferrers",
  description:
    "Learn about Jenergie, Jenni's sports massage practice in Higham Ferrers near Rushden, with optional personal training for North Northamptonshire clients.",
  alternates: {
    canonical: "/about/",
    types: { "text/markdown": "/about.md" },
  },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About Jenergie"
      title="Practical care, centred on you."
      intro="Jenergie is Jenni's sports massage practice in Higham Ferrers. The aim is simple: listen carefully, understand what is bothering you and provide treatment that fits your body and daily life."
    >
      <section>
        <h2>Sports massage is the main service</h2>
        <p>
          People visit Jenergie for many reasons. You may have tight or tired muscles after training, stiffness from work, an area that keeps feeling restricted or simply want regular maintenance. You do not need to be an athlete. Before treatment begins, Jenni will ask what you have noticed, what you would like help with and whether anything may affect the session. The treatment is then planned around that conversation and how you move on the day.
        </p>
      </section>

      <section>
        <h2>What an appointment is like</h2>
        <p>
          Your first appointment includes time to talk through your needs and look at movement before the hands-on treatment starts. Jenni will explain what she is doing and check that you are comfortable. Where useful, you may also receive straightforward aftercare or movement suggestions. Jenergie does not use the same routine for every person. The focus stays on the areas that matter to you and on making the session useful rather than complicated.
        </p>
      </section>

      <section>
        <h2>Personal training is optional</h2>
        <p>
          One-to-one personal training and bespoke exercise plans are available as extras. They may suit someone who wants more structure with strength, exercise confidence or movement after massage. There is no requirement to add personal training to a sports massage appointment. Jenni can talk through the options so you can decide whether it is relevant to your goals.
        </p>
      </section>

      <section>
        <h2>Local to Higham Ferrers and Rushden</h2>
        <p>
          Jenergie is based in Higham Ferrers, close to Rushden, and welcomes clients from across North Northamptonshire. To ask a question or arrange an appointment, contact Jenni by email or phone. Current appointment lengths and prices are always listed on the Jenergie homepage.
        </p>
        <a className="button button-dark" href="/contact/">Contact Jenni <span aria-hidden="true">↗</span></a>
      </section>
    </InfoPage>
  );
}
