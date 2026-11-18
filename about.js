const aboutSections = ["overview", "path", "more-about-me", "say-hi"];
const isEmbeddedAbout = new URLSearchParams(window.location.search).has("embedded");
let currentAboutSection = "";
let sectionUpdatePending = false;

if (isEmbeddedAbout) {
  document.body.classList.add("embedded-case-study");

  function reportCurrentSection() {
    sectionUpdatePending = false;
    const trackingLine = Math.min(220, window.innerHeight * 0.35);
    let activeSection = aboutSections[0];

    for (const sectionId of aboutSections) {
      const section = document.getElementById(sectionId);
      if (section && section.getBoundingClientRect().top <= trackingLine) {
        activeSection = sectionId;
      } else {
        break;
      }
    }

    if (activeSection === currentAboutSection) return;
    currentAboutSection = activeSection;
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
    if (event.data?.type !== "letplant-navigate" || !aboutSections.includes(event.data.sectionId)) return;

    document.getElementById(event.data.sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    scheduleSectionUpdate();
  });

  window.addEventListener("load", scheduleSectionUpdate, { once: true });
  scheduleSectionUpdate();
}
