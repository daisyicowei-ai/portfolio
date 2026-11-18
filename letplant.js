const caseStudySections = [
  "overview",
  "what-it-does",
  "challenge",
  "role",
  "principles",
  "redesign",
  "paywall",
  "impact",
];

const isEmbeddedCaseStudy = new URLSearchParams(window.location.search).has("embedded");
let currentCaseStudySection = "";
let sectionUpdatePending = false;

if (isEmbeddedCaseStudy) {
  document.body.classList.add("embedded-case-study");

  function reportCurrentSection() {
    sectionUpdatePending = false;
    const trackingLine = Math.min(220, window.innerHeight * 0.35);
    let activeSection = caseStudySections[0];

    for (const sectionId of caseStudySections) {
      const section = document.getElementById(sectionId);
      if (section && section.getBoundingClientRect().top <= trackingLine) {
        activeSection = sectionId;
      } else {
        break;
      }
    }

    if (activeSection === currentCaseStudySection) return;
    currentCaseStudySection = activeSection;
    window.parent.postMessage({
      type: "letplant-section-change",
      sectionId: activeSection,
    }, window.location.origin);
  }

  function scheduleSectionUpdate() {
    if (sectionUpdatePending) return;
    sectionUpdatePending = true;
    window.requestAnimationFrame(reportCurrentSection);
  }

  window.addEventListener("scroll", scheduleSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleSectionUpdate);
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type !== "letplant-navigate") return;
    if (!caseStudySections.includes(event.data.sectionId)) return;

    document.getElementById(event.data.sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  window.addEventListener("load", scheduleSectionUpdate, { once: true });
  scheduleSectionUpdate();
}
