const internetHealthSections = [
  "overview",
  "contribution",
  "why-it-matters",
  "explore",
  "reflection",
  "say-hi",
];
const isEmbeddedInternetHealth = new URLSearchParams(window.location.search).has("embedded");
let currentInternetHealthSection = "";
let internetHealthUpdatePending = false;

if (isEmbeddedInternetHealth) {
  document.body.classList.add("embedded-case-study");

  function reportCurrentSection() {
    internetHealthUpdatePending = false;
    const trackingLine = Math.min(220, window.innerHeight * 0.35);
    let activeSection = internetHealthSections[0];

    for (const sectionId of internetHealthSections) {
      const section = document.getElementById(sectionId);
      if (section && section.getBoundingClientRect().top <= trackingLine) {
        activeSection = sectionId;
      } else {
        break;
      }
    }

    if (activeSection === currentInternetHealthSection) return;
    currentInternetHealthSection = activeSection;
    window.parent.postMessage({
      type: "letplant-section-change",
      sectionId: activeSection,
    }, window.location.origin);
  }

  function scheduleSectionUpdate() {
    if (internetHealthUpdatePending) return;
    internetHealthUpdatePending = true;
    window.requestAnimationFrame(reportCurrentSection);
  }

  window.addEventListener("scroll", scheduleSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleSectionUpdate);
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type !== "letplant-navigate" || !internetHealthSections.includes(event.data.sectionId)) return;

    document.getElementById(event.data.sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    scheduleSectionUpdate();
  });

  window.addEventListener("load", scheduleSectionUpdate, { once: true });
  scheduleSectionUpdate();
}
