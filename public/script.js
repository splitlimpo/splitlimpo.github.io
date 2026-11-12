/* Progressive enhancement only: content, FAQs and WhatsApp links also work without JS. */
const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");
const header = document.querySelector(".site-header");

if (menuButton && navigation && header) {
  const desktop = window.matchMedia("(min-width: 1024px)");

  function closeMenu(returnFocus = false) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu de navegação");
    navigation.classList.remove("is-open");
    if (returnFocus && !desktop.matches) menuButton.focus();
  }

  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    menuButton.setAttribute("aria-label", expanded ? "Abrir menu de navegação" : "Fechar menu de navegação");
    navigation.classList.toggle("is-open", !expanded);
  });

  navigation.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a");
    if (!link || desktop.matches) return;
    const targetId = link.getAttribute("href");
    closeMenu();
    if (targetId && targetId.startsWith("#")) {
      const destination = document.getElementById(targetId.slice(1));
      if (destination) destination.focus({ preventScroll: true });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu(true);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !header.contains(event.target)) closeMenu();
  });

  desktop.addEventListener("change", () => closeMenu());
}

const questions = document.querySelectorAll("[data-faq]");
for (const question of questions) {
  question.addEventListener("toggle", () => {
    if (!question.open) return;
    for (const other of questions) {
      if (other !== question) other.open = false;
    }
  });
}

const year = document.querySelector("[data-current-year]");
if (year) year.textContent = String(new Date().getFullYear());

// The native range provides keyboard and screen-reader support. Pointer capture
// makes the whole image draggable with a mouse, pen or a finger.
for (const comparison of document.querySelectorAll("[data-comparison]")) {
  const range = comparison.querySelector("[data-comparison-range]");
  const viewport = comparison.querySelector("[data-comparison-viewport]");
  if (!(range instanceof HTMLInputElement) || !viewport) continue;

  let activePointer = null;

  function showPosition() {
    const before = Math.round(Number(range.value));
    comparison.style.setProperty("--comparison-position", `${before}%`);
    range.setAttribute("aria-valuetext", `${before}% antes da limpeza; ${100 - before}% depois da limpeza`);
  }

  function moveToPointer(event) {
    const bounds = viewport.getBoundingClientRect();
    if (bounds.width === 0) return;
    const position = ((event.clientX - bounds.left) / bounds.width) * 100;
    range.value = String(Math.round(Math.max(0, Math.min(100, position))));
    showPosition();
  }

  range.addEventListener("input", showPosition);
  range.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    event.preventDefault();
    activePointer = event.pointerId;
    range.focus({ preventScroll: true });
    range.setPointerCapture(event.pointerId);
    moveToPointer(event);
  });
  range.addEventListener("pointermove", (event) => {
    if (event.pointerId === activePointer) moveToPointer(event);
  });

  function stopDragging(event) {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
    if (range.hasPointerCapture(event.pointerId)) range.releasePointerCapture(event.pointerId);
  }

  range.addEventListener("pointerup", stopDragging);
  range.addEventListener("pointercancel", stopDragging);
  range.addEventListener("lostpointercapture", () => { activePointer = null; });
  showPosition();
}

// Keep both photo frames in the same natural grid footprint, so rotating
// between portrait and landscape photographs does not move the surrounding page.
for (const carousel of document.querySelectorAll("[data-team-carousel]")) {
  const slides = Array.from(carousel.querySelectorAll("[data-team-slide]"));
  const dots = Array.from(carousel.querySelectorAll("[data-carousel-dot]"));
  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const caption = carousel.querySelector("[data-carousel-caption]");
  const status = carousel.querySelector("[data-carousel-status]");
  if (slides.length < 2 || !viewport || !caption) continue;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const rotationInterval = 5000;
  let index = 0;
  let rotationEnabled = !motionPreference.matches;
  let focusPaused = false;
  let inView = typeof IntersectionObserver === "undefined";
  let timer = null;

  function showSlide(requestedIndex, announce = false) {
    index = (requestedIndex + slides.length) % slides.length;
    for (let position = 0; position < slides.length; position += 1) {
      const active = position === index;
      slides[position].classList.toggle("is-active", active);
      slides[position].setAttribute("aria-hidden", String(!active));
      if (dots[position]) dots[position].setAttribute("aria-current", String(active));
    }
    const description = slides[index].dataset.caption || "Equipe Split Limpo em atendimento";
    caption.textContent = description;
    if (announce && status) status.textContent = `Foto ${index + 1} de ${slides.length}: ${description}`;
  }

  function scheduleRotation() {
    window.clearTimeout(timer);
    timer = null;
    if (!rotationEnabled || focusPaused || document.hidden || !inView) return;
    timer = window.setTimeout(() => {
      showSlide(index + 1);
      scheduleRotation();
    }, rotationInterval);
  }

  dots.forEach((dot, position) => {
    dot.addEventListener("click", (event) => {
      if (event.detail > 0) focusPaused = false;
      showSlide(position, true);
      scheduleRotation();
    });
  });

  carousel.addEventListener("focusin", (event) => {
    focusPaused = event.target instanceof Element && event.target.matches(":focus-visible");
    scheduleRotation();
  });
  carousel.addEventListener("focusout", (event) => {
    if (event.relatedTarget instanceof Node && carousel.contains(event.relatedTarget)) return;
    focusPaused = false;
    scheduleRotation();
  });
  document.addEventListener("visibilitychange", scheduleRotation);
  motionPreference.addEventListener("change", (event) => {
    rotationEnabled = !event.matches;
    scheduleRotation();
  });

  if (typeof IntersectionObserver !== "undefined") {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) inView = entry.isIntersecting;
      scheduleRotation();
    }, { threshold: 0.15 });
    observer.observe(carousel);
  }

  showSlide(0);
  scheduleRotation();
}
