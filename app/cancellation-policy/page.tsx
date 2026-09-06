import type { Metadata } from "next";
import { InfoPage } from "../components/info-page";

export const metadata: Metadata = {
  title: "Cancellation and Appointment Policy | Jenergie",
  description:
    "Read Jenergie's cancellation, rearrangement, late arrival and missed appointment policy for sports massage and personal training appointments.",
  alternates: {
    canonical: "/cancellation-policy/",
    types: { "text/markdown": "/cancellation-policy.md" },
  },
};

export default function CancellationPolicyPage() {
  return (
    <InfoPage
      eyebrow="Jenergie appointment policy"
      title="Cancellation and appointment policy."
      intro="Plans sometimes change. This policy protects reserved appointment time while treating clients fairly and allowing discretion when genuine emergencies or exceptional circumstances arise."
    >
      <section className="contact-details policy-highlights" aria-label="Cancellation charges at a glance">
        <div>
          <span>24 hours or more</span>
          <strong>No cancellation charge will normally apply.</strong>
        </div>
        <div>
          <span>Less than 24 hours</span>
          <strong>Up to 50% of the appointment fee may be charged.</strong>
        </div>
        <div>
          <span>No-show</span>
          <strong>Up to 100% of the appointment fee may be charged.</strong>
        </div>
      </section>

      <section>
        <h2>Cancelling or rearranging</h2>
        <div>
          <p>Please give at least <strong>24 hours&apos; notice</strong> if you need to cancel or rearrange your appointment. Where more than 24 hours&apos; notice is given, no cancellation charge will normally apply.</p>
          <p>Where less than 24 hours&apos; notice is given, Jenergie may charge up to <strong>50% of the appointment fee</strong> to reflect appointment time that may be difficult to refill at short notice.</p>
          <p>If you do not attend your appointment and have not contacted Jenergie in advance, up to <strong>100% of the appointment fee</strong> may be charged. If the cancelled appointment is successfully filled by another client, any cancellation charge may be reduced or waived.</p>
        </div>
      </section>

      <section>
        <h2>Exceptional circumstances</h2>
        <p>Jenergie understands that emergencies and unexpected circumstances can happen. Cancellation charges may be reduced or waived at Jenergie&apos;s discretion where appropriate.</p>
      </section>

      <section>
        <h2>Illness and treatment suitability</h2>
        <div>
          <p>Please contact Jenergie if you are unwell before your appointment. Treatment may need to be rearranged if you have an infectious illness, fever, vomiting or diarrhoea, or another condition that could make treatment unsafe or inappropriate.</p>
          <p>There will normally be no cancellation penalty where Jenergie asks you to rearrange because treatment would not be appropriate.</p>
        </div>
      </section>

      <section>
        <h2>Late arrival</h2>
        <p>Please arrive on time. If you arrive late, the session may need to be shortened so later appointments are not affected, and the full appointment fee may still apply. If you arrive too late for treatment to be provided safely or effectively, the appointment may be treated as a late cancellation.</p>
      </section>

      <section>
        <h2>If Jenergie cancels</h2>
        <p>If Jenergie needs to cancel or rearrange your appointment, you will be offered an alternative appointment. Any payment already made for an appointment Jenergie cannot provide will be refunded if you do not wish to rearrange.</p>
      </section>

      <section>
        <h2>Repeated cancellations or missed appointments</h2>
        <p>Where there are repeated late cancellations or missed appointments, Jenergie may ask for payment in advance before accepting future bookings.</p>
      </section>

      <section>
        <h2>Fair application of this policy</h2>
        <div>
          <p>Any cancellation charge is intended to reflect the impact of lost appointment time rather than act as a penalty. Jenergie may take account of whether the slot has been refilled and any genuine exceptional circumstances before applying a charge.</p>
          <p>Version 1.0. Effective from 5 September 2026. Review due September 2027.</p>
          <p>To cancel or rearrange, please <a href="/contact/">contact Jenni</a> or email <a href="mailto:jen@jenergie.co.uk">jen@jenergie.co.uk</a>.</p>
        </div>
      </section>
    </InfoPage>
  );
}
