const quickUxSections = ["overview", "millennium-tv", "cookie-jar", "say-hi"];
const isEmbeddedQuickUx = new URLSearchParams(window.location.search).has("embedded");
let currentQuickUxSection = "";
let quickUxSectionUpdatePending = false;

if (isEmbeddedQuickUx) {
  document.body.classList.add("embedded-case-study");

  function reportCurrentSection() {
    quickUxSectionUpdatePending = false;
    const trackingLine = Math.min(220, window.innerHeight * 0.35);
    let activeSection = quickUxSections[0];

    for (const sectionId of quickUxSections) {
      const section = document.getElementById(sectionId);
      if (section && section.getBoundingClientRect().top <= trackingLine) {
        activeSection = sectionId;
      } else {
        break;
      }
    }

    if (activeSection === currentQuickUxSection) return;
    currentQuickUxSection = activeSection;
    window.parent.postMessage({
      type: "letplant-section-change",
      sectionId: activeSection,
    }, window.location.origin);
  }

  function scheduleSectionUpdate() {
    if (quickUxSectionUpdatePending) return;
    quickUxSectionUpdatePending = true;
    window.requestAnimationFrame(reportCurrentSection);
  }

  window.addEventListener("scroll", scheduleSectionUpdate, { passive: true });
  window.addEventListener("resize", scheduleSectionUpdate);
  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin || event.source !== window.parent) return;
    if (event.data?.type !== "letplant-navigate" || !quickUxSections.includes(event.data.sectionId)) return;

    document.getElementById(event.data.sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    scheduleSectionUpdate();
  });

  window.addEventListener("load", scheduleSectionUpdate, { once: true });
  scheduleSectionUpdate();
}
