const capsForCareSections = [
  "overview",
  "mission",
  "product",
  "where-we-sold",
  "where-money-went",
  "recognition",
  "learning",
  "skills",
  "say-hi",
];
const isEmbeddedCapsForCare = new URLSearchParams(window.location.search).has("embedded");
let currentCapsForCareSection = "";

if (isEmbeddedCapsForCare) {
  document.body.classList.add("embedded-case-study");

  function reportCurrentSection() {
    const trackingLine = Math.min(220, window.innerHeight * 0.35);
    let activeSection = capsForCareSections[0];

    for (const sectionId of capsForCareSections) {
      const section = document.getElementById(sectionId);
      if (section && section.getBoundingClientRect().top <= trackingLine) {
        activeSection = sectionId;
      } else {
        break;
      }
    }

    if (activeSection === currentCapsForCareSection) return;
    currentCapsForCareSection = activeSection;
    window.parent.postMessage({
      type: "letplant-section-change",
      sectionId: activeSection,
    }, window.location.origin);
  }

  let sectionUpdatePending = false;
  function scheduleSectionUpdate() {
    if (sectionUpdatePending) return;
    sectionUpdatePending = true;
    window.requestAnimationFrame(() => {
      sectionUpdatePending = false;
      reportCurrentSection();
    });
  }

  window.addEventListener("scroll", scheduleSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleSectionUpdate);
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type !== "letplant-navigate") return;
    if (!capsForCareSections.includes(event.data.sectionId)) return;

    document.getElementById(event.data.sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  window.addEventListener("load", scheduleSectionUpdate, { once: true });
  scheduleSectionUpdate();
}
