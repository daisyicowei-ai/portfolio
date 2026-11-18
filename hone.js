const honeSections = ["overview", "screens", "say-hi"];
const isEmbeddedHone = new URLSearchParams(window.location.search).has("embedded");
let currentHoneSection = "";

if (isEmbeddedHone) {
  document.body.classList.add("embedded-case-study");

  function reportCurrentSection() {
    const trackingLine = Math.min(220, window.innerHeight * 0.35);
    let activeSection = honeSections[0];

    for (const sectionId of honeSections) {
      const section = document.getElementById(sectionId);
      if (section && section.getBoundingClientRect().top <= trackingLine) {
        activeSection = sectionId;
      } else {
        break;
      }
    }

    if (activeSection === currentHoneSection) return;
    currentHoneSection = activeSection;
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
    if (!honeSections.includes(event.data.sectionId)) return;

    document.getElementById(event.data.sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  window.addEventListener("load", scheduleSectionUpdate, { once: true });
  scheduleSectionUpdate();
}
