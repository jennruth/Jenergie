import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://jenergie.co.uk";
const siteTitle = "Higham Ferrers Sports Massage & Personal Training | Jenergie";
const siteDescription =
  "Sports massage and one-to-one personal training in Higham Ferrers, near Rushden, serving clients across North Northamptonshire. Contact Jenergie to arrange an appointment.";
const googleAnalyticsId = "G-T8LFTR9P1B";

const analyticsScript = `
(function (window, document) {
  "use strict";

  var measurementId = "${googleAnalyticsId}";
  var consentKey = "jenergie-analytics-consent-v1";
  var googleTagSelector = "script[data-jenergie-google-tag]";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted"
  });

  function readConsent() {
    try { return window.localStorage.getItem(consentKey); }
    catch (error) { return null; }
  }

  function saveConsent(value) {
    try { window.localStorage.setItem(consentKey, value); }
    catch (error) { /* The current page still respects the visitor's choice. */ }
  }

  function loadGoogleAnalytics() {
    if (document.querySelector(googleTagSelector)) return;

    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });

    var tag = document.createElement("script");
    tag.async = true;
    tag.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    tag.setAttribute("data-jenergie-google-tag", "");
    document.head.appendChild(tag);
  }

  function clearAnalyticsCookies() {
    ["_ga", "_ga_T8LFTR9P1B"].forEach(function (name) {
      document.cookie = name + "=; Max-Age=0; Path=/; SameSite=Lax";
      document.cookie = name + "=; Max-Age=0; Path=/; Domain=.jenergie.co.uk; SameSite=Lax";
    });
  }

  function setBannerVisibility(show) {
    var banner = document.getElementById("analytics-consent");
    if (!banner) return;
    banner.hidden = !show;
    if (show) {
      var primaryAction = banner.querySelector('[data-analytics-choice="granted"]');
      if (primaryAction) primaryAction.focus();
    }
  }

  function applyChoice(choice) {
    var previousChoice = readConsent();
    saveConsent(choice);
    setBannerVisibility(false);

    if (choice === "granted") {
      loadGoogleAnalytics();
      return;
    }

    window.gtag("consent", "update", { analytics_storage: "denied" });
    clearAnalyticsCookies();
    if (previousChoice === "granted") window.location.reload();
  }

  function initialiseAnalytics() {
    var choice = readConsent();
    if (choice === "granted") loadGoogleAnalytics();
    if (choice !== "granted" && choice !== "denied") setBannerVisibility(true);

    document.addEventListener("click", function (event) {
      var target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      var choiceButton = target.closest("[data-analytics-choice]");
      if (choiceButton) {
        applyChoice(choiceButton.getAttribute("data-analytics-choice"));
        return;
      }

      if (target.closest("[data-cookie-settings]")) {
        setBannerVisibility(true);
        return;
      }

      if (readConsent() !== "granted") return;
      var link = target.closest("a[href]");
      if (!link) return;
      var href = link.getAttribute("href") || "";
      if (href.indexOf("mailto:") === 0) {
        window.gtag("event", "generate_lead", { method: "email" });
      } else if (href.indexOf("tel:") === 0) {
        window.gtag("event", "generate_lead", { method: "phone" });
      } else if (href === "/contact" || href === "/contact/") {
        window.gtag("event", "contact_page_click");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseAnalytics, { once: true });
  } else {
    initialiseAnalytics();
  }
})(window, document);
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Jenergie",
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Jenergie",
    "Jenergie sports massage",
    "sports massage Higham Ferrers",
    "sports massage Rushden",
    "personal training Higham Ferrers",
    "North Northamptonshire sports massage",
  ],
  alternates: {
    canonical: "/",
    types: { "text/markdown": "/index.md" },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Jenergie",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "Jenergie sports massage and personal training in Higham Ferrers and Rushden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "health and wellbeing",
  icons: {
    icon: "/brand/jenergie-icon.png",
    shortcut: "/brand/jenergie-icon.png",
    apple: "/brand/jenergie-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <head>
        <script
          src="/vendor/gsap.min.js"
          defer
          data-jenergie-animation="gsap"
        />
        <script
          src="/vendor/ScrollTrigger.min.js"
          defer
          data-jenergie-animation="scroll-trigger"
        />
        <script
          src="/animations.js"
          defer
          data-jenergie-animation="setup"
        />
        <script
          data-jenergie-analytics="consent"
          dangerouslySetInnerHTML={{ __html: analyticsScript }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
