(function (window, document) {
  "use strict";

  function initialiseAnimations() {
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    function reveal(targets, trigger, options) {
      var elements = gsap.utils.toArray(targets);
      if (elements.length === 0) return;

      gsap.fromTo(
        elements,
        {
          autoAlpha: 0,
          y: options.y || 34,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: options.duration || 0.78,
          stagger: options.stagger || 0,
          ease: "power2.out",
          clearProps: "opacity,visibility,transform",
          scrollTrigger: {
            trigger: trigger,
            start: options.start || "top 84%",
            once: true,
          },
        },
      );
    }

    gsap.fromTo(
      ".hero-copy > *",
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.82,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "opacity,visibility,transform",
      },
    );

    gsap.fromTo(
      ".energy-stage",
      { autoAlpha: 0, scale: 0.96 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        delay: 0.18,
        ease: "power2.out",
        clearProps: "opacity,visibility,transform",
      },
    );

    gsap.fromTo(
      ".info-hero-inner > *",
      { autoAlpha: 0, y: 22 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "opacity,visibility,transform",
      },
    );

    [
      [".section-heading > *", ".section-heading", { stagger: 0.08 }],
      [".route-card", ".route-grid", { y: 38, stagger: 0.1 }],
      [".service-card", ".service-grid", { y: 46, stagger: 0.12 }],
      [".pricing-heading > *", ".pricing-heading", { stagger: 0.08 }],
      [".price-panel", ".pricing-grid", { y: 44, stagger: 0.14 }],
      [".approach-intro > *", ".approach-intro", { stagger: 0.08 }],
      [".process-item", ".process-list", { y: 30, stagger: 0.1 }],
      [".impact-copy > *", ".impact-copy", { stagger: 0.08 }],
      [".proof-card", ".proof-grid", { y: 38, stagger: 0.11 }],
      [".location-copy > *", ".location-copy", { stagger: 0.08 }],
      [".area-grid article", ".area-grid", { y: 28, stagger: 0.1 }],
      [".contact-inner > *", ".contact-section", { y: 30, stagger: 0.09 }],
    ].forEach(function (group) {
      reveal(group[0], group[1], group[2]);
    });

    gsap.utils.toArray(".info-content > section").forEach(function (section) {
      reveal(section.children, section, { y: 28, stagger: 0.08, start: "top 87%" });
    });

    var media = gsap.matchMedia();
    media.add("(min-width: 768px)", function () {
      var stage = document.querySelector(".energy-stage");
      if (!stage) return undefined;

      gsap.to(stage, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      return function () {
        gsap.set(stage, { clearProps: "transform" });
      };
    });

    window.addEventListener("load", function () {
      ScrollTrigger.refresh();
    }, { once: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseAnimations, { once: true });
  } else {
    initialiseAnimations();
  }
})(window, document);
