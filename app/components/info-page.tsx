import type { ReactNode } from "react";
import Link from "next/link";
import { InsuranceBadge } from "./insurance-badge";

const Arrow = () => <span aria-hidden="true">↗</span>;

type InfoPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
};

export function InfoPage({ eyebrow, title, intro, children }: InfoPageProps) {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <Link className="brand" href="/" aria-label="Jenergie home">
          <span className="brand-lockup">
            <img className="lockup-icon" src="/brand/jenergie-icon.png" alt="" />
            <span className="lockup-copy">
              <strong>Jenergie</strong>
              <small>Sports Massage Therapy</small>
              <i>Personal Training</i>
            </span>
          </span>
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/treatments/">Treatments</Link>
          <Link href="/prices/">Prices</Link>
          <Link href="/about/">About</Link>
        </div>
        <Link className="button button-small" href="/contact/">Contact Jenni <Arrow /></Link>
      </nav>

      <section className="info-hero">
        <div className="shell info-hero-inner">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>

      <article className="info-content shell">{children}</article>

      <footer className="footer info-footer">
        <div className="shell info-footer-inner">
          <div>
            <strong>Jenergie</strong>
            <p>Energy for your body. Care for your muscles.</p>
          </div>
          <InsuranceBadge />
          <div className="info-footer-links">
            <Link href="/treatments/">Treatments</Link>
            <Link href="/prices/">Prices</Link>
            <Link href="/about/">About</Link>
            <Link href="/contact/">Contact</Link>
            <Link href="/cancellation-policy/">Cancellation policy</Link>
            <Link href="/privacy/">Privacy</Link>
            <Link href="/agent-resources/">Agent resources</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
