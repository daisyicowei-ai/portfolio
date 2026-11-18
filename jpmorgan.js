const caseStudySections = [
  "overview",
  "problem",
  "opportunity",
  "focus-areas",
  "how-we-work",
  "approach",
  "outcomes",
  "where-next",
];

const isEmbeddedCaseStudy = new URLSearchParams(window.location.search).has("embedded");
let currentCaseStudySection = "";
let sectionUpdatePending = false;
let requestedSection = "";

if (isEmbeddedCaseStudy) {
  document.body.classList.add("embedded-case-study");

  function reportCurrentSection() {
    sectionUpdatePending = false;
    const trackingLine = Math.min(220, window.innerHeight * 0.35);
    let activeSection = requestedSection || caseStudySections[0];

    if (!requestedSection) {
      for (const sectionId of caseStudySections) {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top <= trackingLine) {
          activeSection = sectionId;
        } else {
          break;
        }
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

    requestedSection = event.data.sectionId;
    document.getElementById(event.data.sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    scheduleSectionUpdate();
  });

  function resumeScrollTracking() {
    requestedSection = "";
    scheduleSectionUpdate();
  }

  window.addEventListener("wheel", resumeScrollTracking, { passive: true });
  window.addEventListener("touchstart", resumeScrollTracking, { passive: true });
  window.addEventListener("pointerdown", resumeScrollTracking);
  window.addEventListener("keydown", (event) => {
    if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
      resumeScrollTracking();
    }
  });
  window.addEventListener("load", scheduleSectionUpdate, { once: true });
  scheduleSectionUpdate();
}
