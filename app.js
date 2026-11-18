const viewport = document.querySelector(".canvas-viewport");
const world = document.querySelector("#canvas-world");
const zoomOutput = document.querySelector("#zoom-level");
const onboarding = document.querySelector(".onboarding-card");
const onboardingStepLabel = onboarding.querySelector(".onboarding-step");
const onboardingTitle = onboarding.querySelector("#onboarding-title");
const onboardingCopy = onboarding.querySelector("#onboarding-copy");
const dialog = document.querySelector("#project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogCopy = document.querySelector("#dialog-copy");
const caseStudyFrame = document.querySelector(".case-study-frame");
const caseStudyIframe = caseStudyFrame.querySelector("iframe");
const mapGrid = document.querySelector(".map-grid");
const mapTopGrid = document.querySelector(".map-top-grid");
const mapProjectGrid = document.querySelector(".map-project-grid");
const mapSelectedWork = document.querySelector(".map-selected-work");
const locationLabel = document.querySelector(".location-pill span");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuPanel = document.querySelector("#mobile-menu-panel");
const rightSidebarToggle = document.querySelector(".right-sidebar-toggle");
const mobileViewButtons = document.querySelectorAll("[data-mobile-view]");
const canvasModeButtons = document.querySelectorAll("[data-canvas-mode]");
const typewriterText = document.querySelector(".typewriter-text");

if (typewriterText && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const headline = typewriterText.textContent;
  typewriterText.textContent = "";
  typewriterText.classList.add("is-typing");
  let characterIndex = 0;

  const typeNextCharacter = () => {
    typewriterText.textContent = headline.slice(0, ++characterIndex);
    if (characterIndex < headline.length) {
      window.setTimeout(typeNextCharacter, 42);
    } else {
      typewriterText.classList.remove("is-typing");
    }
  };

  window.setTimeout(typeNextCharacter, 250);
}

const mobileSections = [
  "about",
  "process",
  "work",
  "letplant-project",
  "jpmorgan-project",
  "vim-project",
  "bonus-projects",
  "quick-ux-wins",
  "early-career-projects",
  "hinge-feature-design",
  "internet-health-visualisations",
  "personal-social-impact",
  "hone-personal-project",
  "caps-for-care",
  "contact",
];

const canvasMapSections = [
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "letplant-project", label: "LetPlant", group: "selected-work" },
  { id: "jpmorgan-project", label: "J.P. Morgan", group: "selected-work" },
  { id: "vim-project", label: "VIM", group: "selected-work" },
];

const canvasSections = [
  ...canvasMapSections,
  { id: "work", label: "Selected work" },
  { id: "contact", label: "Contact" },
  { id: "bonus-projects", label: "Bonus projects" },
  { id: "quick-ux-wins", label: "Quick UX Wins" },
  { id: "early-career-projects", label: "Early career" },
  { id: "hinge-feature-design", label: "Hinge Feature Design" },
  { id: "internet-health-visualisations", label: "Internet Health Visualisations" },
  { id: "personal-social-impact", label: "Personal & Social Impact" },
  { id: "hone-personal-project", label: "Hone — Personal Project" },
  { id: "caps-for-care", label: "Caps for Care" },
];

const letPlantSections = [
  { id: "overview", label: "Overview" },
  { id: "what-it-does", label: "What LetPlant does" },
  { id: "challenge", label: "Why we redesigned" },
  { id: "role", label: "My role" },
  { id: "principles", label: "Design principles" },
  { id: "redesign", label: "The redesign" },
  { id: "paywall", label: "Rebuilding the paywall" },
  { id: "impact", label: "Impact & next steps" },
];

const jpMorganSections = [
  { id: "overview", label: "Unified Client Reporting" },
  { id: "problem", label: "Problem" },
  { id: "opportunity", label: "Opportunity" },
  { id: "focus-areas", label: "Focus areas" },
  { id: "how-we-work", label: "How we work" },
  { id: "approach", label: "How I approached it", map: false },
  { id: "outcomes", label: "Outcomes", map: false },
  { id: "where-next", label: "Where this went next", map: false },
];

const caseStudyRoutes = {
  "#about-me": {
    title: "About Me",
    navSection: "about",
    returnSection: "about",
    returnLabel: "Back to About",
    source: "./about.html?embedded=1&theme=purple-v2",
    sections: [
      { id: "overview", label: "Hello, I’m Daisy" },
      { id: "path", label: "My path to product design" },
      { id: "more-about-me", label: "A little more me" },
      { id: "say-hi", label: "Say hi" },
    ],
  },
  "#letplant-case-study": {
    title: "LetPlant Redesign",
    project: "LetPlant Redesign",
    source: "./letplant.html?embedded=1&layout=cards-v2",
    sections: letPlantSections,
  },
  "#jpmorgan-case-study": {
    title: "J.P. Morgan Chase",
    project: "J.P. Morgan Chase",
    source: "./jpmorgan.html?embedded=1&layout=single-column-v1",
    sections: jpMorganSections,
  },
  "#hinge-case-study": {
    title: "Hinge: Trivia Match Feature",
    project: "Hinge Feature Design",
    source: "./hinge.html?embedded=1&theme=lilac-v3&images=v6",
    sections: [
      { id: "overview", label: "Trivia Match" },
      { id: "about-hinge", label: "About Hinge" },
      { id: "problem", label: "The problem" },
      { id: "goal", label: "The goal" },
      { id: "solution", label: "Trivia request" },
      { id: "role", label: "My role & deliverables" },
      { id: "why-it-works", label: "Why it works" },
      { id: "reflection", label: "Reflection" },
      { id: "gallery", label: "Want to see it?" },
      { id: "say-hi", label: "Let’s chat" },
    ],
  },
  "#vim-case-study": {
    title: "VIM: Voices in Maternity",
    project: "VIM: Voices in Maternity",
    source: "./vim.html?embedded=1&images=vim-v3",
    sections: [
      { id: "overview", label: "The project" },
      { id: "aim", label: "The project aim" },
      { id: "problem", label: "The problem" },
      { id: "design-goal", label: "The design goal" },
      { id: "research", label: "Research approaches" },
      { id: "concept", label: "The concept" },
      { id: "five-cs", label: "The Five C’s" },
      { id: "role", label: "My role" },
      { id: "focus", label: "What I focused on" },
      { id: "outcomes", label: "Outcomes" },
      { id: "reflection", label: "What I learned" },
      { id: "say-hi", label: "Let’s chat" },
    ],
  },
  "#hone-case-study": {
    title: "Hone — Personal Project",
    project: "Hone Personal Project",
    navSection: "hone-personal-project",
    returnSection: "hone-personal-project",
    returnLabel: "Back to canvas",
    source: "./hone.html?embedded=1&screens=hone-v1",
    sections: [
      { id: "overview", label: "Hone" },
      { id: "screens", label: "Early screens" },
      { id: "say-hi", label: "Let’s chat" },
    ],
  },
  "#caps-for-care-case-study": {
    title: "Caps For Care",
    project: "Caps for Care",
    navSection: "caps-for-care",
    returnSection: "caps-for-care",
    returnLabel: "Back to canvas",
    source: "./caps-for-care.html?embedded=1&gallery=cfc-v1",
    sections: [
      { id: "overview", label: "Caps For Care" },
      { id: "mission", label: "Our mission" },
      { id: "product", label: "The Care Cap" },
      { id: "where-we-sold", label: "Where we sold" },
      { id: "where-money-went", label: "Where the money went" },
      { id: "recognition", label: "Recognition" },
      { id: "learning", label: "What I learned" },
      { id: "skills", label: "Skills" },
      { id: "say-hi", label: "Let’s chat" },
    ],
  },
  "#quick-ux-case-study": {
    title: "Quick UX Wins",
    project: "Quick UX Wins in Fast-Paced Environments",
    navSection: "quick-ux-wins",
    returnSection: "quick-ux-wins",
    returnLabel: "Back to canvas",
    source: "./quick-ux.html?embedded=1&theme=blue-v1&screens=v3",
    sections: [
      { id: "overview", label: "Quick UX Wins" },
      { id: "millennium-tv", label: "Millennium TV redesign" },
      { id: "cookie-jar", label: "Cookie Jar" },
      { id: "say-hi", label: "Let’s chat" },
    ],
  },
  "#internet-health-case-study": {
    title: "Internet Health: Data Visualisations",
    project: "Internet Health Data Visualisations",
    navSection: "internet-health-visualisations",
    returnSection: "internet-health-visualisations",
    returnLabel: "Back to canvas",
    source: "./internet-health.html?embedded=1&theme=red-v1",
    sections: [
      { id: "overview", label: "Project overview" },
      { id: "contribution", label: "My contribution" },
      { id: "why-it-matters", label: "Why it matters" },
      { id: "explore", label: "Explore it" },
      { id: "reflection", label: "Reflection" },
      { id: "say-hi", label: "Let’s chat" },
    ],
  },
};

let activeCaseStudySection = "overview";

function renderCanvasMap(isCaseStudy) {
  const route = caseStudyRoutes[window.location.hash];
  const sections = isCaseStudy
    ? route.sections.filter(({ map: showInMap }) => showInMap !== false)
    : canvasMapSections;
  mapGrid.classList.toggle("case-study-map", isCaseStudy);
  mapSelectedWork.hidden = isCaseStudy;
  const createMapButton = ({ id, label }) => {
    const button = document.createElement("button");
    const active = isCaseStudy
      ? id === activeCaseStudySection
      : id === state.section;
    button.type = "button";
    button.className = `map-pill${active ? " map-active" : ""}`;
    button.dataset.jump = id;
    button.textContent = label;
    button.setAttribute("aria-pressed", String(active));
    return button;
  };
  mapTopGrid.replaceChildren(...sections
    .filter(({ group }) => isCaseStudy || group !== "selected-work")
    .map(createMapButton));
  mapProjectGrid.replaceChildren(...sections
    .filter(({ group }) => group === "selected-work")
    .map(createMapButton));
  locationLabel.textContent = isCaseStudy
    ? `You’re here: ${sections.find(({ id }) => id === activeCaseStudySection)?.label || sections[0].label}`
    : `You’re here: ${(canvasSections.find(({ id }) => id === state.section)?.label || "About").replace(" ↗", "")}`;
}

function updateCaseStudyRoute() {
  const route = caseStudyRoutes[window.location.hash];
  const isCaseStudy = Boolean(route);
  caseStudyFrame.hidden = !isCaseStudy;
  document.body.classList.toggle("showing-case-study", isCaseStudy);
  if (isCaseStudy) state.section = route.navSection || "work";
  setActiveSection(state.section);
  if (isCaseStudy) {
    document.querySelector(".crumb-current").textContent = route.title;
    caseStudyIframe.title = route.title === "About Me" ? "About Daisy Owei" : `${route.title} case study`;
  }
  const backButton = document.querySelector(".case-study-back");
  backButton.hidden = !isCaseStudy;
  backButton.lastChild.textContent = isCaseStudy
    ? ` ${route.returnLabel || "Back to canvas"}`
    : " Back to canvas";
  renderCanvasMap(isCaseStudy);
  document.querySelectorAll(".case-nav [data-project]").forEach((link) => {
    const active = isCaseStudy && link.dataset.project === route.project;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (isCaseStudy && caseStudyIframe.getAttribute("src") !== route.source) {
    caseStudyIframe.src = route.source;
  }
  if (isCaseStudy && caseStudyIframe.src) {
    activeCaseStudySection = "overview";
    caseStudyIframe.contentWindow.scrollTo(0, 0);
  }
}

caseStudyIframe.addEventListener("load", () => {
  if (caseStudyRoutes[window.location.hash]) {
    caseStudyIframe.contentWindow.scrollTo(0, 0);
  }
});

window.addEventListener("message", (event) => {
  if (
    event.origin !== window.location.origin
    || event.source !== caseStudyIframe.contentWindow
    || event.data?.type !== "letplant-section-change"
  ) return;

  const route = caseStudyRoutes[window.location.hash];
  const section = route?.sections.find(({ id }) => id === event.data.sectionId);
  if (!section) return;
  activeCaseStudySection = section.id;
  mapGrid.querySelectorAll(".map-pill").forEach((button) => {
    const active = button.dataset.jump === section.id;
    button.classList.toggle("map-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  locationLabel.textContent = `You’re here: ${section.label}`;
});

const projectDescriptions = {
  "LetPlant Redesign":
    "A visual redesign of an AI-powered plant-care app used by more than 14,000 people. The work focused on making important care tools easier to find and creating a calmer, more welcoming experience.",
  "J.P. Morgan Chase":
    "Enterprise product design for global financial clients: bringing complex data into clearer, more useful tools that help people make decisions with confidence.",
  "VIM: Voices in Maternity":
    "A final-year capstone exploring more equitable, supportive experiences in maternal healthcare and amplifying the voices of the people most affected.",
  "Quick UX Wins in Fast-Paced Environments":
    "A collection of fast, practical UX improvements, including mobile discovery and brand engagement for Millennium TV and core product experiences for Cookie Jar.",
  "Hinge Feature Design":
    "An early-career feature design case study. More project details coming soon.",
  "Internet Health Data Visualisations":
    "An interactive D3.js exploration of internet shutdowns in Myanmar and India, combining regional trends with the human impact of blackouts.",
  "Hone Personal Project":
    "A passion project I’m designing and building end-to-end, still early stage. A consumer app for habit-building and follow-through, with screens that are still evolving.",
  "Caps for Care":
    "A social-impact project. More project details coming soon.",
};

const state = {
  scale: 1,
  x: 0,
  y: 0,
  pointer: null,
  view: "about",
  section: "about",
  canvasMode: "scroll",
};

let activeTourStep = 0;

const tourSteps = {
  1: {
    title: "Welcome to my portfolio.",
    copy: "Take a look around at your own pace. I’ll show you a few ways to explore.",
    target: null,
  },
  2: {
    title: "Choose how to explore.",
    copy: "Use Scroll to move through the page, or switch to Pan to drag around the canvas.",
    mobileCopy: "On mobile, use Website for a scroll-friendly layout or Canvas to explore the project map.",
    target: ".canvas-mode-switch",
    mobileTarget: ".mobile-view-switch",
  },
  3: {
    title: "Zoom in and out.",
    copy: "In Pan mode, use + and − to zoom. Fit overview brings the full canvas back into view. You can switch back to Scroll whenever you like.",
    target: ".zoom-toolbar",
    mobileTarget: ".zoom-toolbar",
  },
  4: {
    title: "Find your way around.",
    copy: "Use the left navigation for sections and the right navigation for the canvas map and project links. You can close this guide any time.",
    mobileCopy: "Use Menu for sections and project links. On larger screens, the left and right sidebars provide the same navigation.",
    target: null,
    mobileTarget: null,
  },
};

function positionTourCard(target) {
  const cardRect = onboarding.getBoundingClientRect();
  const margin = 14;
  const clamp = (value, max) => Math.min(Math.max(margin, value), Math.max(margin, max));
  const setPosition = (left, top) => {
    onboarding.style.left = `${clamp(left, window.innerWidth - cardRect.width - margin)}px`;
    onboarding.style.top = `${clamp(top, window.innerHeight - cardRect.height - margin)}px`;
  };

  if (!target) {
    setPosition((window.innerWidth - cardRect.width) / 2, window.innerHeight - cardRect.height - margin);
    return;
  }

  const targetRect = target.getBoundingClientRect();
  const candidates = [
    { left: targetRect.left + targetRect.width / 2 - cardRect.width / 2, top: targetRect.top - cardRect.height - 12 },
    { left: targetRect.left + targetRect.width / 2 - cardRect.width / 2, top: targetRect.bottom + 12 },
    { left: targetRect.left - cardRect.width - 12, top: targetRect.top + targetRect.height / 2 - cardRect.height / 2 },
    { left: targetRect.right + 12, top: targetRect.top + targetRect.height / 2 - cardRect.height / 2 },
  ].map(({ left, top }) => ({
    left: clamp(left, window.innerWidth - cardRect.width - margin),
    top: clamp(top, window.innerHeight - cardRect.height - margin),
  }));
  const scoredCandidates = candidates.map((candidate) => {
    const overlapsTarget = candidate.left < targetRect.right
      && candidate.left + cardRect.width > targetRect.left
      && candidate.top < targetRect.bottom
      && candidate.top + cardRect.height > targetRect.top;
    const dx = candidate.left + cardRect.width / 2 - (targetRect.left + targetRect.width / 2);
    const dy = candidate.top + cardRect.height / 2 - (targetRect.top + targetRect.height / 2);
    return { ...candidate, score: (overlapsTarget ? 100000 : 0) + Math.hypot(dx, dy) };
  });
  const bestPosition = scoredCandidates.reduce((best, candidate) => candidate.score < best.score ? candidate : best);
  setPosition(bestPosition.left, bestPosition.top);
}

function showTourStep(step) {
  activeTourStep = step;
  const content = tourSteps[step];
  const isMobile = window.innerWidth <= 700;
  if (step === 4 && !isMobile && window.innerWidth > 960) {
    setRightSidebarCollapsed(false);
  }
  if (step === 3) {
    if (isMobile) setMobileView("canvas");
    setCanvasMode("pan");
  }

  document.querySelectorAll(".tour-highlight").forEach((element) => {
    element.classList.remove("tour-highlight");
  });
  const targetSelectors = step === 4
    ? (isMobile ? [".mobile-menu", ".mobile-nav"] : [".left-sidebar", ".right-sidebar"])
    : [isMobile ? content.mobileTarget || content.target : content.target].filter(Boolean);
  const targets = targetSelectors
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);
  targets.forEach((element) => element.classList.add("tour-highlight"));

  onboarding.dataset.tourStep = String(step);
  onboardingStepLabel.textContent = `Step ${step} of 4`;
  onboardingTitle.textContent = content.title;
  onboardingCopy.textContent = isMobile ? content.mobileCopy || content.copy : content.copy;
  onboarding.querySelector("[data-action='start-exploring']").hidden = step !== 1;
  onboarding.querySelector("[data-action='next-tour-step']").hidden = false;
  onboarding.querySelector("[data-action='next-tour-step']").textContent = step === 4 ? "Finish" : "Next";
  onboarding.hidden = false;
  document.body.classList.add("tour-active");
  const positionTarget = step === 4
    ? document.querySelector(isMobile
      ? ".mobile-menu"
      : document.querySelector(".guide-tour-button").getClientRects().length
        ? ".guide-tour-button"
        : ".primary-nav")
    : targets[0];
  requestAnimationFrame(() => positionTourCard(positionTarget));
}

function endTour() {
  activeTourStep = 0;
  onboarding.hidden = true;
  onboarding.style.removeProperty("left");
  onboarding.style.removeProperty("top");
  delete onboarding.dataset.tourStep;
  document.body.classList.remove("tour-active");
  document.querySelectorAll(".tour-highlight").forEach((element) => {
    element.classList.remove("tour-highlight");
  });
}

function startTour() {
  setCanvasMode("scroll");
  showTourStep(1);
}

function updateTransform() {
  world.style.transform = `translate3d(calc(-50% + ${state.x}px), ${state.y}px, 0) scale(${state.scale})`;
  zoomOutput.value = `${Math.round(state.scale * 100)}%`;
  zoomOutput.textContent = `${Math.round(state.scale * 100)}%`;
}

function fitCanvas() {
  if (state.canvasMode === "scroll") {
    state.view = "overview";
    state.section = "about";
    viewport.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("about");
    return;
  }
  const horizontalFit = (viewport.clientWidth - 48) / world.offsetWidth;
  const verticalFit = (viewport.clientHeight - 80) / world.offsetHeight;
  state.view = "overview";
  state.scale = window.innerWidth <= 700
    ? Math.min(0.7, horizontalFit)
    : Math.min(1, horizontalFit, verticalFit);
  state.x = 0;
  state.y = window.innerWidth <= 700
    ? 12
    : Math.max(12, (viewport.clientHeight - world.offsetHeight * state.scale) / 2);
  updateTransform();
}

function fitAbout() {
  const about = document.querySelector("#about");
  const horizontalFit = (viewport.clientWidth - 48) / about.offsetWidth;
  const verticalFit = (viewport.clientHeight - 72) / about.offsetHeight;
  state.view = "about";
  state.section = "about";
  state.scale = Math.min(1.5, horizontalFit, verticalFit);
  focusSection("about");
}

function resizeCanvas() {
  if (state.canvasMode === "scroll") {
    return;
  }
  if (state.view === "overview") {
    fitCanvas();
  } else if (state.view === "about") {
    fitAbout();
  } else if (state.view === "section") {
    focusSection(state.section);
  }
}

function setActiveSection(section) {
  document.querySelectorAll("[data-section]").forEach((link) => {
    const active = link.dataset.section === section;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  const labels = Object.fromEntries(canvasSections.map(({ id, label }) => [id, label]));
  document.querySelector(".crumb-current").textContent = labels[section] || "About";
  if (!caseStudyRoutes[window.location.hash]) {
    locationLabel.textContent = `You’re here: ${(labels[section] || "About").replace(" ↗", "")}`;
    mapGrid.querySelectorAll(".map-pill").forEach((pill) => {
      const active = pill.dataset.jump === section;
      pill.classList.toggle("map-active", active);
      pill.setAttribute("aria-pressed", String(active));
    });
  }
  document.querySelectorAll("[data-mobile-section]").forEach((link) => {
    const active = link.dataset.mobileSection === section;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function setMobileMenuOpen(open) {
  mobileMenuPanel.hidden = !open;
  document.body.classList.toggle("mobile-menu-open", open);
  mobileMenu.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-label", open ? "Close portfolio guide" : "Show portfolio guide");
  mobileMenu.querySelector("span:first-child").textContent = open ? "Close" : "Menu";
  mobileMenu.querySelector(".menu-icon").textContent = open ? "×" : "☰";
}

function setRightSidebarCollapsed(collapsed) {
  document.body.classList.toggle("right-sidebar-collapsed", collapsed);
  rightSidebarToggle.setAttribute("aria-expanded", String(!collapsed));
  rightSidebarToggle.textContent = collapsed ? "Show guide" : "Hide guide";
}

rightSidebarToggle.addEventListener("click", () => {
  setRightSidebarCollapsed(!document.body.classList.contains("right-sidebar-collapsed"));
});

function setMobileView(view) {
  document.body.classList.toggle("mobile-website-mode", view === "website");
  document.body.classList.toggle("mobile-canvas-mode", view === "canvas");
  mobileViewButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mobileView === view));
  });
  if (view === "canvas") {
    if (state.view === "mobile-website") {
      state.view = state.section === "about" ? "about" : "section";
    }
    resizeCanvas();
  } else {
    state.view = "mobile-website";
    updateMobileSectionFromScroll();
  }
}

function updateMobileSectionFromScroll() {
  const isMobileWebsite = document.body.classList.contains("mobile-website-mode");
  const isCanvasScroll = viewport.classList.contains("canvas-scroll-mode");
  if (!isMobileWebsite && !isCanvasScroll) return;
  if (isCanvasScroll && viewport.scrollTop < 24) {
    state.section = "about";
    setActiveSection("about");
    return;
  }
  const activeSection = mobileSections
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .map((element) => ({ element, top: element.getBoundingClientRect().top }))
    .filter(({ top }) => top <= 180)
    .sort((a, b) => b.top - a.top)[0]?.element;
  if (!activeSection) return;
  state.section = activeSection.id;
  setActiveSection(activeSection.id);
}

function focusSection(section) {
  const target = document.getElementById(section);
  if (!target) return;
  state.section = section;
  if (window.innerWidth <= 700 && document.body.classList.contains("mobile-website-mode")) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(section);
    return;
  }
  if (state.canvasMode === "scroll") {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(section);
    return;
  }
  if (state.view !== "tour") state.view = section === "about" ? "about" : "section";
  const horizontalFit = (viewport.clientWidth - 48) / target.offsetWidth;
  const verticalFit = (viewport.clientHeight - 80) / target.offsetHeight;
  state.scale = Math.max(0.45, Math.min(1.5, horizontalFit, verticalFit));

  let localX = 0;
  let localY = 0;
  let ancestor = target;
  while (ancestor && ancestor !== world) {
    localX += ancestor.offsetLeft;
    localY += ancestor.offsetTop;
    ancestor = ancestor.offsetParent;
  }

  state.x = (world.offsetWidth / 2 - localX - target.offsetWidth / 2) * state.scale;
  const targetIsTallerThanViewport = target.offsetHeight * state.scale > viewport.clientHeight - 80;
  state.y = targetIsTallerThanViewport
    ? 24 - (26 + localY) * state.scale
    : viewport.clientHeight / 2 - (26 + localY + target.offsetHeight / 2) * state.scale;
  updateTransform();
  setActiveSection(section);
}

function zoomBy(amount, pointX = viewport.clientWidth / 2, pointY = viewport.clientHeight / 2) {
  if (state.canvasMode === "scroll") return;
  const previousScale = state.scale;
  const nextScale = Math.min(1.8, Math.max(0.45, previousScale + amount));
  if (nextScale === previousScale) return;

  const rect = viewport.getBoundingClientRect();
  const localX = pointX - rect.left - rect.width / 2;
  const localY = pointY - rect.top - state.y;
  const ratio = nextScale / previousScale;
  state.x -= localX * (ratio - 1);
  state.y -= localY * (ratio - 1);
  state.scale = nextScale;
  state.view = "custom";
  updateTransform();
}

function openProject(name) {
  dialogTitle.textContent = name;
  dialogCopy.textContent = projectDescriptions[name] || "Explore the thinking, research, and design decisions behind this project.";
  dialog.showModal();
}

document.querySelectorAll("[data-action='fit']").forEach((button) => {
  button.addEventListener("click", () => {
    if (caseStudyRoutes[window.location.hash]) {
      window.location.hash = "about";
      updateCaseStudyRoute();
    }
    fitCanvas();
  });
});

document.querySelector("[data-action='back-to-canvas']").addEventListener("click", () => {
  const route = caseStudyRoutes[window.location.hash];
  const section = route?.returnSection || "work";
  window.location.hash = section;
  updateCaseStudyRoute();
  focusSection(section);
});

document.querySelectorAll("[data-action='zoom-in']").forEach((button) => {
  button.addEventListener("click", () => zoomBy(0.1));
});

document.querySelectorAll("[data-action='zoom-out']").forEach((button) => {
  button.addEventListener("click", () => zoomBy(-0.1));
});

document.querySelectorAll("[data-jump]:not(.map-pill)").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button instanceof HTMLAnchorElement) event.preventDefault();
    const section = button.dataset.jump;
    if (caseStudyRoutes[window.location.hash]) {
      window.location.hash = section;
      updateCaseStudyRoute();
    }
    focusSection(section);
    endTour();
  });
});

mapGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".map-pill");
  if (!button) return;

  if (caseStudyRoutes[window.location.hash]) {
    caseStudyIframe.contentWindow.postMessage({
      type: "letplant-navigate",
      sectionId: button.dataset.jump,
    }, window.location.origin);
    return;
  }

  focusSection(button.dataset.jump);
  endTour();
});

document.querySelectorAll("[data-section]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (caseStudyRoutes[window.location.hash]) {
      window.location.hash = link.dataset.section;
      updateCaseStudyRoute();
    }
    focusSection(link.dataset.section);
  });
});

document.querySelectorAll("[data-project]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const projectRoutes = {
      "LetPlant Redesign": "#letplant-case-study",
      "J.P. Morgan Chase": "#jpmorgan-case-study",
      "Hinge Feature Design": "#hinge-case-study",
      "VIM: Voices in Maternity": "#vim-case-study",
      "Hone Personal Project": "#hone-case-study",
      "Caps for Care": "#caps-for-care-case-study",
      "Quick UX Wins in Fast-Paced Environments": "#quick-ux-case-study",
      "Internet Health Data Visualisations": "#internet-health-case-study",
    };
    const route = projectRoutes[link.dataset.project];
    if (route) {
      event.preventDefault();
      if (window.location.hash === route) {
        activeCaseStudySection = "overview";
        caseStudyIframe.contentWindow.scrollTo(0, 0);
        renderCanvasMap(true);
      } else {
        window.location.hash = route;
      }
      return;
    }
    if (caseStudyRoutes[window.location.hash]) window.location.hash = "work";
    event.preventDefault();
    const projectSections = {
      "LetPlant Redesign": "letplant-project",
      "J.P. Morgan Chase": "jpmorgan-project",
      "VIM: Voices in Maternity": "vim-project",
      "Quick UX Wins in Fast-Paced Environments": "quick-ux-wins",
      "Hinge Feature Design": "hinge-feature-design",
      "Internet Health Data Visualisations": "internet-health-visualisations",
      "Hone Personal Project": "hone-personal-project",
      "Caps for Care": "caps-for-care",
    };
    focusSection(projectSections[link.dataset.project] || "work");
    if (!link.closest(".right-project-nav")) openProject(link.dataset.project);
  });
});

document.querySelector("[data-about-story]").addEventListener("click", (event) => {
  event.preventDefault();
  window.location.hash = "about-me";
});

document.querySelectorAll("[data-open-project]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const projectRoutes = {
      "LetPlant Redesign": "#letplant-case-study",
      "J.P. Morgan Chase": "#jpmorgan-case-study",
      "Hinge Feature Design": "#hinge-case-study",
      "VIM: Voices in Maternity": "#vim-case-study",
      "Hone Personal Project": "#hone-case-study",
      "Caps for Care": "#caps-for-care-case-study",
      "Quick UX Wins in Fast-Paced Environments": "#quick-ux-case-study",
      "Internet Health Data Visualisations": "#internet-health-case-study",
    };
    const route = projectRoutes[link.dataset.openProject];
    if (route) {
      window.location.hash = route;
      return;
    }
    openProject(link.dataset.openProject);
  });
});

document.querySelector(".onboarding-close").addEventListener("click", endTour);

document.querySelector("[data-action='start-exploring']").addEventListener("click", () => {
  endTour();
  focusSection("about");
});

document.querySelector("[data-action='next-tour-step']").addEventListener("click", () => {
  if (activeTourStep === 4) {
    endTour();
    return;
  }
  showTourStep(activeTourStep + 1);
});

document.querySelectorAll("[data-action='canvas-tour']").forEach((button) => {
  button.addEventListener("click", startTour);
});

document.querySelector(".mobile-menu").addEventListener("click", () => {
  setMobileMenuOpen(mobileMenuPanel.hidden);
});

mobileViewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMobileMenuOpen(false);
    setMobileView(button.dataset.mobileView);
  });
});

mobileMenuPanel.addEventListener("click", (event) => {
  const link = event.target.closest("[data-mobile-section]");
  if (!link) return;
  event.preventDefault();
  const section = link.dataset.mobileSection;
  setMobileMenuOpen(false);

  const projectRoutes = {
    "letplant-project": "#letplant-case-study",
    "jpmorgan-project": "#jpmorgan-case-study",
    "hinge-feature-design": "#hinge-case-study",
    "vim-project": "#vim-case-study",
    "hone-personal-project": "#hone-case-study",
    "caps-for-care": "#caps-for-care-case-study",
    "quick-ux-wins": "#quick-ux-case-study",
    "internet-health-visualisations": "#internet-health-case-study",
  };
  if (projectRoutes[section]) {
    window.location.hash = projectRoutes[section];
    updateCaseStudyRoute();
    return;
  }

  if (caseStudyRoutes[window.location.hash]) {
    window.location.hash = section;
    updateCaseStudyRoute();
  }
  setMobileView("website");
  focusSection(section);
});

document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

function setCanvasMode(mode) {
  state.canvasMode = mode;
  const isScrollMode = mode === "scroll";
  viewport.classList.toggle("canvas-scroll-mode", isScrollMode);
  world.classList.toggle("canvas-scroll-world", isScrollMode);
  canvasModeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.canvasMode === mode));
  });
  state.pointer = null;
  viewport.classList.remove("is-dragging");
  world.classList.remove("is-panning");

  if (isScrollMode) {
    state.view = "scroll";
    state.scale = 1;
    state.x = 0;
    state.y = 0;
    updateTransform();
    requestAnimationFrame(() => {
      document.getElementById(state.section)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  } else {
    state.view = state.section === "about" ? "about" : "section";
    focusSection(state.section);
  }
}

canvasModeButtons.forEach((button) => {
  button.addEventListener("click", () => setCanvasMode(button.dataset.canvasMode));
});

viewport.addEventListener("pointerdown", (event) => {
  if (state.canvasMode !== "pan") return;
  if (event.button !== 0 || event.target.closest("a, button, dialog")) return;
  state.pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, startX: state.x, startY: state.y };
  viewport.setPointerCapture(event.pointerId);
  viewport.classList.add("is-dragging");
  world.classList.add("is-panning");
});

viewport.addEventListener("pointermove", (event) => {
  if (!state.pointer || state.pointer.id !== event.pointerId) return;
  state.view = "custom";
  state.x = state.pointer.startX + (event.clientX - state.pointer.x) / state.scale;
  state.y = state.pointer.startY + (event.clientY - state.pointer.y) / state.scale;
  updateTransform();
});

function stopPanning(event) {
  if (!state.pointer || state.pointer.id !== event.pointerId) return;
  state.pointer = null;
  viewport.classList.remove("is-dragging");
  world.classList.remove("is-panning");
}

viewport.addEventListener("pointerup", stopPanning);
viewport.addEventListener("pointercancel", stopPanning);

viewport.addEventListener("wheel", (event) => {
  if (!event.ctrlKey && !event.metaKey) return;
  event.preventDefault();
  zoomBy(event.deltaY < 0 ? 0.05 : -0.05, event.clientX, event.clientY);
}, { passive: false });

window.addEventListener("scroll", updateMobileSectionFromScroll, { passive: true });
viewport.addEventListener("scroll", updateMobileSectionFromScroll, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth <= 700) {
    if (!document.body.classList.contains("mobile-website-mode")
      && !document.body.classList.contains("mobile-canvas-mode")) {
      setMobileView("website");
    }
    if (document.body.classList.contains("mobile-canvas-mode")) resizeCanvas();
  } else {
    document.body.classList.remove("mobile-website-mode", "mobile-canvas-mode", "mobile-menu-open");
    setMobileMenuOpen(false);
    resizeCanvas();
  }
  if (activeTourStep) showTourStep(activeTourStep);
});
window.addEventListener("load", resizeCanvas);
window.addEventListener("hashchange", updateCaseStudyRoute);
if (window.innerWidth <= 700) setMobileView("website");
updateCaseStudyRoute();
setCanvasMode("scroll");
if (!caseStudyRoutes[window.location.hash]) showTourStep(1);
