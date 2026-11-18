const vimSections = [
  "overview",
  "aim",
  "problem",
  "design-goal",
  "research",
  "concept",
  "five-cs",
  "role",
  "focus",
  "outcomes",
  "reflection",
  "say-hi",
];
const isEmbeddedVim = new URLSearchParams(window.location.search).has("embedded");
let currentVimSection = "";
let sectionUpdatePending = false;

if (isEmbeddedVim) {
  document.body.classList.add("embedded-case-study");

  function reportCurrentSection() {
    sectionUpdatePending = false;
    const trackingLine = Math.min(220, window.innerHeight * 0.35);
    let activeSection = vimSections[0];

    for (const sectionId of vimSections) {
      const section = document.getElementById(sectionId);
      if (section && section.getBoundingClientRect().top <= trackingLine) {
        activeSection = sectionId;
      } else {
        break;
      }
    }

    if (activeSection === currentVimSection) return;
    currentVimSection = activeSection;
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
    if (event.data?.type !== "letplant-navigate" || !vimSections.includes(event.data.sectionId)) return;

    document.getElementById(event.data.sectionId).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    scheduleSectionUpdate();
  });

  window.addEventListener("load", scheduleSectionUpdate, { once: true });
  scheduleSectionUpdate();
}
