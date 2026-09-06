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
      eyebrow="A little about me"
      title="Hi, I'm Jenni."
      intro="I run Jenergie, my sports massage practice in Higham Ferrers. My approach is simple: I listen to what is bothering you, look at how you move and shape your treatment around you."
    >
      <section>
        <h2>Sports massage is what I do</h2>
        <p>
          People come to see me for all sorts of reasons. You might have tight or tired muscles after training, feel stiff after a long week at work, have an area that never seems to move quite right or simply want some regular maintenance. You definitely do not need to be an athlete. Whatever brings you in, I will take the time to understand what is going on and what you would like to get from the session.
        </p>
      </section>

      <section>
        <h2>What to expect when you visit</h2>
        <p>
          We will start with a chat about how you are feeling, what you have noticed and anything that could affect your treatment. I may also look at how you move before we begin. During the massage, I will explain what I am doing and check that you are comfortable. If it would be helpful, I can also give you a few simple ideas for looking after the area afterwards. There is no one-size-fits-all routine here. Your appointment is about you.
        </p>
      </section>

      <section>
        <h2>A little extra support, if you want it</h2>
        <p>
          I also offer one-to-one personal training and bespoke exercise plans. These are completely optional, but they can be useful if you would like more structure with strength, movement or feeling confident with exercise. You never have to add personal training to a sports massage appointment. If you are curious, just ask me and we can talk through whether it would suit you and your goals.
        </p>
      </section>

      <section>
        <h2>Come and see me in Higham Ferrers</h2>
        <p>
          I am based in Higham Ferrers, close to Rushden, and I welcome clients from across North Northamptonshire. If you are not sure which appointment is right for you, please get in touch. I am always happy to answer a question before you decide. You can also take a look at the prices page for current appointment lengths and costs.
        </p>
        <a className="button button-dark" href="/prices/">See my prices <span aria-hidden="true">↗</span></a>
      </section>
    </InfoPage>
  );
}
