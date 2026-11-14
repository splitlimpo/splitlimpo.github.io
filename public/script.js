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

// Native scrolling keeps touch navigation and all reviews available without JS.
for (const carousel of document.querySelectorAll("[data-reviews-carousel]")) {
  const viewport = carousel.querySelector("[data-reviews-viewport]");
  const cards = Array.from(carousel.querySelectorAll(".review-card"));
  const controls = carousel.querySelector("[data-reviews-controls]");
  const toggle = carousel.querySelector("[data-reviews-toggle]");
  const previous = carousel.querySelector("[data-reviews-previous]");
  const next = carousel.querySelector("[data-reviews-next]");
  const count = carousel.querySelector("[data-reviews-count]");
  const status = carousel.querySelector("[data-reviews-status]");
  const pauseIcon = carousel.querySelector("[data-reviews-pause]");
  const playIcon = carousel.querySelector("[data-reviews-play]");
  if (!viewport || cards.length < 2 || !controls || !toggle || !previous || !next || !count || !status || !pauseIcon || !playIcon) continue;

  const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let index = 0;
  let rotationEnabled = !motionPreference.matches;
  let focusPaused = false;
  let hoverPaused = false;
  let pointerPaused = false;
  let inView = false;
  let timer = null;
  let scrollTarget = null;
  let viewportWidth = 0;
  let cloneCount = 0;
  const navigationQueue = [];

  function visibleCount() {
    return Number(getComputedStyle(carousel).getPropertyValue("--reviews-per-view"));
  }

  function wrapIndex(position) {
    return ((position % cards.length) + cards.length) % cards.length;
  }

  function cardOffset(position) {
    const card = viewport.children[cloneCount + position];
    return card.getBoundingClientRect().left - viewport.firstElementChild.getBoundingClientRect().left;
  }

  function scrollPosition() {
    const step = cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    return Math.round((viewport.scrollLeft - cardOffset(0)) / step);
  }

  function updateCount(announce = false) {
    const positions = Array.from({ length: Math.min(visibleCount(), cards.length) }, (_, offset) => wrapIndex(index + offset) + 1);
    const first = positions[0];
    const end = positions[positions.length - 1];
    const range = positions.length === 1 ? first : end > first ? `${first}–${end}` : positions.join(" · ");
    count.textContent = `${range} de ${cards.length}`;
    if (announce) status.textContent = `Avaliações: ${count.textContent}`;
  }

  function scheduleRotation() {
    window.clearTimeout(timer);
    if (!rotationEnabled || focusPaused || hoverPaused || pointerPaused || scrollTarget !== null || document.hidden || !inView || cards.length <= visibleCount()) return;
    timer = window.setTimeout(() => showReview(index + 1), 6500);
  }

  function showReview(requestedIndex, announce = false, behavior = motionPreference.matches ? "instant" : "smooth") {
    // Adjacent navigation may land on a visual copy at either end of the track.
    // Once scrolling ends, the identical original replaces it without animation.
    const destination = cardOffset(requestedIndex);
    index = wrapIndex(requestedIndex);
    scrollTarget = Math.abs(viewport.scrollLeft - destination) > 1 ? destination : null;
    viewport.scrollTo({ left: destination, behavior });
    updateCount(announce);
    scheduleRotation();
  }

  function navigate(action) {
    navigationQueue.push(action);
    runNextNavigation();
  }

  function runNextNavigation() {
    while (scrollTarget === null && navigationQueue.length > 0) {
      const action = navigationQueue.shift();
      action();
    }
  }

  function finishScroll() {
    // A reset can emit its own scrollend while the next queued move has started.
    if (scrollTarget !== null && Math.abs(viewport.scrollLeft - scrollTarget) > 1) return;
    scrollTarget = null;
    const position = scrollPosition();
    index = wrapIndex(position);
    if (position !== index) viewport.scrollTo({ left: cardOffset(index), behavior: "instant" });
    updateCount();
    runNextNavigation();
    scheduleRotation();
  }

  function rebuildLoop() {
    if (viewport.clientWidth === viewportWidth) return;
    viewportWidth = viewport.clientWidth;
    scrollTarget = null;
    navigationQueue.length = 0;
    for (const clone of viewport.querySelectorAll("[data-review-clone]")) clone.remove();
    cloneCount = Math.min(visibleCount(), cards.length);

    function copyCard(card) {
      const clone = card.cloneNode(true);
      clone.dataset.reviewClone = "";
      clone.setAttribute("aria-hidden", "true");
      clone.removeAttribute("aria-label");
      clone.inert = true;
      return clone;
    }

    viewport.prepend(...cards.slice(-cloneCount).map(copyCard));
    viewport.append(...cards.slice(0, cloneCount).map(copyCard));
    viewport.scrollTo({ left: cardOffset(index), behavior: "instant" });
    updateCount();
    scheduleRotation();
  }

  function updateToggle() {
    toggle.setAttribute("aria-label", rotationEnabled ? "Pausar rotação automática" : "Iniciar rotação automática");
    pauseIcon.hidden = !rotationEnabled;
    playIcon.hidden = rotationEnabled;
    scheduleRotation();
  }

  previous.addEventListener("click", () => navigate(() => showReview(index - 1, true)));
  next.addEventListener("click", () => navigate(() => showReview(index + 1, true)));
  toggle.addEventListener("click", () => {
    rotationEnabled = !rotationEnabled;
    // An explicit play action also resumes rotation after keyboard navigation.
    if (rotationEnabled) focusPaused = false;
    updateToggle();
  });

  viewport.addEventListener("keydown", (event) => {
    const destinations = {
      ArrowLeft: () => showReview(index - 1, true),
      ArrowRight: () => showReview(index + 1, true),
      Home: () => showReview(0, true),
      End: () => showReview(cards.length - 1, true),
    };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    navigate(destinations[event.key]);
  });
  viewport.addEventListener("scroll", () => {
    if (scrollTarget === null) {
      index = wrapIndex(scrollPosition());
      updateCount();
    }
    scheduleRotation();
  }, { passive: true });
  viewport.addEventListener("scrollend", finishScroll);

  function interruptNavigation() {
    scrollTarget = null;
    navigationQueue.length = 0;
    scheduleRotation();
  }

  viewport.addEventListener("wheel", interruptNavigation, { passive: true });
  viewport.addEventListener("pointerdown", () => {
    pointerPaused = true;
    interruptNavigation();
  });
  function releasePointer() {
    if (!pointerPaused) return;
    pointerPaused = false;
    scheduleRotation();
  }
  window.addEventListener("pointerup", releasePointer);
  window.addEventListener("pointercancel", releasePointer);
  carousel.addEventListener("mouseenter", () => { hoverPaused = true; scheduleRotation(); });
  carousel.addEventListener("mouseleave", () => { hoverPaused = false; scheduleRotation(); });
  carousel.addEventListener("focusin", () => { focusPaused = true; scheduleRotation(); });
  carousel.addEventListener("focusout", (event) => {
    if (event.relatedTarget instanceof Node && carousel.contains(event.relatedTarget)) return;
    focusPaused = false;
    scheduleRotation();
  });
  document.addEventListener("visibilitychange", scheduleRotation);
  motionPreference.addEventListener("change", () => {
    rotationEnabled = !motionPreference.matches;
    updateToggle();
  });
  new IntersectionObserver((entries) => {
    inView = entries[0].isIntersecting;
    scheduleRotation();
  }, { threshold: 0.15 }).observe(carousel);
  new ResizeObserver(rebuildLoop).observe(viewport);

  carousel.classList.add("is-enhanced");
  controls.hidden = false;
  rebuildLoop();
  updateToggle();
}
