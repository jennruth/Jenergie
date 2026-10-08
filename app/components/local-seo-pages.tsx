import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "./info-page";

const siteUrl = "https://jenergie.co.uk";

export type ServiceKey = "smt" | "rm" | "pt";
export type LocationKey = "burton-latimer" | "irchester" | "podington" | "raunds" | "wellingborough";

type Service = {
  name: string;
  navName: string;
  eyebrow: string;
  summary: string;
  description: string;
  includes: string[];
  priceSummary: string;
  priceDetail: string;
};

type Location = {
  name: string;
  direction: string;
  localNote: string;
  serviceNotes: Record<ServiceKey, string>;
};

export const services: Record<ServiceKey, Service> = {
  smt: {
    name: "Sports massage therapy",
    navName: "Sports massage",
    eyebrow: "Sports massage therapy",
    summary: "Focused, hands-on treatment planned around the areas that feel tight, tired or uncomfortable.",
    description: "Sports massage at Jenergie begins with a conversation about how you feel, how you move and what you would like help with. You do not need to be an athlete. The treatment is adapted to your activity, work and everyday routine.",
    includes: ["A conversation about what is bothering you", "A simple movement assessment where appropriate", "Treatment focused on one or two areas", "Practical aftercare where it may help"],
    priceSummary: "Sports massage appointments from £35",
    priceDetail: "Initial appointment: 55 minutes, £45. One area: 30 minutes, £35. Two areas: 60 minutes, £55.",
  },
  rm: {
    name: "Recovery and movement",
    navName: "Recovery and movement",
    eyebrow: "Recovery and movement",
    summary: "Sports massage focused on tired muscles, everyday stiffness, movement and regular maintenance.",
    description: "Recovery and movement support is a focus within a Jenergie sports massage appointment, not a separate treatment type. Jenni can adapt the session around training, a physically demanding routine or areas that regularly feel restricted.",
    includes: ["Treatment shaped around your current activity", "Attention to muscular tension and movement", "A pace and pressure that are checked with you", "Simple ideas to support recovery between visits"],
    priceSummary: "Included within sports massage appointments",
    priceDetail: "Choose an initial 55-minute appointment for £45, one area for 30 minutes at £35, or two areas for 60 minutes at £55.",
  },
  pt: {
    name: "One-to-one personal training",
    navName: "Personal training",
    eyebrow: "Personal training",
    summary: "Individual exercise support for building strength, moving confidently and working towards realistic goals.",
    description: "Personal training is an optional Jenergie service. Sessions are planned around your starting point, preferences and goals, without a one-size-fits-all programme. You can choose a one-to-one session or ask for a bespoke exercise plan.",
    includes: ["A conversation about your goals and experience", "Exercises selected for your current level", "Clear guidance on technique and progression", "A practical plan that fits your routine"],
    priceSummary: "One-to-one sessions from £45",
    priceDetail: "One-to-one personal training: one hour, £45. Bespoke exercise plan: £70.",
  },
};

export const locations: Record<LocationKey, Location> = {
  "burton-latimer": {
    name: "Burton Latimer",
    direction: "Jenergie is based in Higham Ferrers, south-east of Burton Latimer and close to Rushden.",
    localNote: "If you live or work around Burton Latimer, contact Jenni before travelling for the appointment location and to check which session best suits you.",
    serviceNotes: {
      smt: "For Burton Latimer clients, sports massage can be shaped around gym training, running, physical work or the muscular tension that builds up through an ordinary week.",
      rm: "Recovery-focused massage may suit Burton Latimer clients who want support between training sessions or regular maintenance for areas that repeatedly feel tight.",
      pt: "Personal training gives Burton Latimer clients one-to-one support without requiring a generic group programme or an online-only plan.",
    },
  },
  irchester: {
    name: "Irchester",
    direction: "Jenergie is based in Higham Ferrers, north-east of Irchester and near Rushden.",
    localNote: "Irchester clients are welcome by appointment. Contact Jenni for the exact appointment details before setting off.",
    serviceNotes: {
      smt: "Sports massage for Irchester clients is tailored to the area that needs attention, whether tension is linked to exercise, work or everyday movement.",
      rm: "Irchester clients can use a sports massage appointment for recovery, movement or ongoing muscular maintenance, with the session adapted to current needs.",
      pt: "One-to-one personal training is available to Irchester clients who want practical guidance with strength, movement and a manageable exercise routine.",
    },
  },
  podington: {
    name: "Podington",
    direction: "Jenergie is based in Higham Ferrers, north of Podington across the Bedfordshire and North Northamptonshire boundary.",
    localNote: "Appointments are arranged directly with Jenni, so Podington clients can confirm the location and suitable appointment length before travelling.",
    serviceNotes: {
      smt: "Podington clients can arrange a focused sports massage for muscular tension, stiffness or regular maintenance, without needing to be an athlete.",
      rm: "Recovery and movement work can be included in sports massage for Podington clients after training, during busy periods or as regular maintenance.",
      pt: "Personal training is available to Podington clients who prefer individual support and exercises selected around their own goals and experience.",
    },
  },
  raunds: {
    name: "Raunds",
    direction: "Jenergie is based in Higham Ferrers, a short journey west of Raunds.",
    localNote: "Raunds clients are welcome by appointment. Get in touch before travelling so Jenni can confirm the appointment details and help you choose the right option.",
    serviceNotes: {
      smt: "Sports massage for Raunds clients can focus on one or two areas and is planned around what feels tight, tired or restricted on the day.",
      rm: "Raunds clients can choose a sports massage with a recovery and movement focus after activity or for regular muscular maintenance.",
      pt: "One-to-one personal training gives Raunds clients an individual session or bespoke exercise plan built around realistic personal goals.",
    },
  },
  wellingborough: {
    name: "Wellingborough",
    direction: "Jenergie is based in Higham Ferrers, north-east of Wellingborough and close to Rushden.",
    localNote: "Wellingborough clients can contact Jenni to discuss the right appointment and receive the exact location details before travelling.",
    serviceNotes: {
      smt: "Sports massage for Wellingborough clients is suitable for active people and anyone whose work or routine leaves muscles feeling tight or tired.",
      rm: "A recovery and movement focus can help Wellingborough clients use sports massage as part of training recovery or regular muscular maintenance.",
      pt: "Personal training offers Wellingborough clients practical one-to-one support with strength, confidence and an exercise routine that fits everyday life.",
    },
  },
};

const serviceOrder: ServiceKey[] = ["smt", "rm", "pt"];
const locationOrder: LocationKey[] = ["wellingborough", "burton-latimer", "raunds", "podington", "irchester"];

function pageAlternates(path: string) {
  return {
    canonical: `${path}/`,
    types: { "text/markdown": `${path}.md` },
  };
}

export function serviceMetadata(serviceKey: ServiceKey): Metadata {
  const service = services[serviceKey];
  return {
    title: `${service.name} in Higham Ferrers | Jenergie`,
    description: `${service.summary} Visit Jenergie in Higham Ferrers, near Rushden, serving North Northamptonshire.`,
    alternates: pageAlternates(`/${serviceKey}`),
  };
}

export function locationMetadata(locationKey: LocationKey): Metadata {
  const location = locations[locationKey];
  return {
    title: `Sports Massage near ${location.name} | Jenergie`,
    description: `Sports massage and optional personal training near ${location.name}. Visit Jenergie in Higham Ferrers and contact Jenni to arrange an appointment.`,
    alternates: pageAlternates(`/${locationKey}`),
  };
}

export function locationServiceMetadata(locationKey: LocationKey, serviceKey: ServiceKey): Metadata {
  const location = locations[locationKey];
  const service = services[serviceKey];
  return {
    title: `${service.navName} near ${location.name} | Jenergie`,
    description: `${service.summary} Available near ${location.name} at Jenergie in Higham Ferrers. Contact Jenni to ask about an appointment.`,
    alternates: pageAlternates(`/${locationKey}/${serviceKey}`),
  };
}

function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

function ServiceLinks({ locationKey }: { locationKey?: LocationKey }) {
  return (
    <div className="local-service-grid">
      {serviceOrder.map((key, index) => {
        const service = services[key];
        const href = locationKey ? `/${locationKey}/${key}/` : `/${key}/`;
        return (
          <Link className="local-service-card" href={href} key={key}>
            <span>0{index + 1}</span>
            <h3>{service.navName}</h3>
            <p>{service.summary}</p>
            <strong>Explore service <span aria-hidden="true">↗</span></strong>
          </Link>
        );
      })}
    </div>
  );
}

export function ServicePage({ serviceKey }: { serviceKey: ServiceKey }) {
  const service = services[serviceKey];
  const path = `/${serviceKey}/`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${siteUrl}${path}`,
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: locationOrder.map((key) => ({ "@type": "City", name: locations[key].name })),
  };

  return (
    <InfoPage eyebrow={service.eyebrow} title={`${service.name}.`} intro={`${service.summary} Appointments take place with Jenni in Higham Ferrers, near Rushden.`}>
      <JsonLd data={serviceSchema} />
      <section>
        <h2>What to expect</h2>
        <div><p>{service.description}</p><p>{service.priceDetail}</p></div>
      </section>
      <section>
        <h2>What is included</h2>
        <ul className="service-check-list">{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="page-card-section">
        <div>
          <p className="eyebrow">Areas served</p>
          <h2>Local support from Higham Ferrers</h2>
          <p className="section-support-copy">Choose your town for practical travel information and details about this service near you.</p>
          <div className="location-link-grid">
            {locationOrder.map((key) => <Link href={`/${key}/${serviceKey}/`} key={key}>{locations[key].name}<span aria-hidden="true">↗</span></Link>)}
          </div>
        </div>
      </section>
      <section>
        <h2>{service.priceSummary}</h2>
        <div><p>{service.priceDetail}</p><Link className="button button-dark" href="/contact/">Contact Jenni <span aria-hidden="true">↗</span></Link></div>
      </section>
    </InfoPage>
  );
}

export function LocationPage({ locationKey }: { locationKey: LocationKey }) {
  const location = locations[locationKey];
  const path = `/${locationKey}/`;
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Jenergie services near ${location.name}`,
    url: `${siteUrl}${path}`,
    description: `Sports massage, recovery and movement support, and optional personal training near ${location.name}.`,
    about: { "@id": `${siteUrl}/#business` },
  };

  return (
    <InfoPage eyebrow={`Serving ${location.name}`} title={`Sports massage near ${location.name}.`} intro={`Visit Jenergie in Higham Ferrers for tailored sports massage, recovery support and optional personal training. ${location.direction}`}>
      <JsonLd data={collectionSchema} />
      <section className="page-card-section">
        <div>
          <h2>Choose a service</h2>
          <p className="section-support-copy">Each page explains what the service involves, current prices and what to expect when travelling from {location.name}.</p>
          <ServiceLinks locationKey={locationKey} />
        </div>
      </section>
      <section>
        <h2>Visiting from {location.name}</h2>
        <div><p>{location.direction}</p><p>{location.localNote}</p><p>Jenergie is an appointment-based practice. The exact address is shared when your appointment is arranged.</p></div>
      </section>
      <section>
        <h2>Not sure where to start?</h2>
        <div><p>Your first sports massage appointment is 55 minutes and costs £45. If you are unsure whether sports massage or personal training is right for you, contact Jenni and explain what you would like help with.</p><Link className="button button-dark" href="/contact/">Contact Jenni <span aria-hidden="true">↗</span></Link></div>
      </section>
    </InfoPage>
  );
}

export function LocationServicePage({ locationKey, serviceKey }: { locationKey: LocationKey; serviceKey: ServiceKey }) {
  const location = locations[locationKey];
  const service = services[serviceKey];
  const path = `/${locationKey}/${serviceKey}/`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.name} near ${location.name}`,
      description: location.serviceNotes[serviceKey],
      url: `${siteUrl}${path}`,
      provider: { "@id": `${siteUrl}/#business` },
      areaServed: { "@type": "City", name: location.name },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Jenergie", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: location.name, item: `${siteUrl}/${locationKey}/` },
        { "@type": "ListItem", position: 3, name: service.name, item: `${siteUrl}${path}` },
      ],
    },
  ];

  return (
    <InfoPage eyebrow={`${service.eyebrow} · ${location.name}`} title={`${service.navName} near ${location.name}.`} intro={`${location.serviceNotes[serviceKey]} Appointments take place with Jenni at Jenergie in Higham Ferrers.`}>
      <JsonLd data={schemas} />
      <section>
        <h2>How this service works</h2>
        <div><p>{service.description}</p><p>{service.priceDetail}</p></div>
      </section>
      <section>
        <h2>What is included</h2>
        <ul className="service-check-list">{service.includes.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>
      <section>
        <h2>Travelling from {location.name}</h2>
        <div><p>{location.direction}</p><p>{location.localNote}</p><p>Appointments are arranged directly with Jenni. The exact address is provided when the appointment is confirmed.</p></div>
      </section>
      <section>
        <h2>Other Jenergie services near {location.name}</h2>
        <div className="related-service-links">
          {serviceOrder.filter((key) => key !== serviceKey).map((key) => <Link href={`/${locationKey}/${key}/`} key={key}>{services[key].navName}<span aria-hidden="true">↗</span></Link>)}
          <Link href={`/${locationKey}/`}>All services near {location.name}<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <section>
        <h2>Ask about an appointment</h2>
        <div><p>Tell Jenni which service you are interested in and that you will be travelling from {location.name}. Sending a message is an enquiry; the appointment is confirmed directly with Jenni.</p><Link className="button button-dark" href="/contact/">Contact Jenni <span aria-hidden="true">↗</span></Link></div>
      </section>
    </InfoPage>
  );
}
