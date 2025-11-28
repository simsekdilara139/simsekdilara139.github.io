// Typing effect için cümleler
const typingPhrases = [
  "yazılım mühendisliği öğrencisiyim.",
  "web geliştiricisiyim.",
  "öğrenmekten kaçmayan bir insanım.",
  "algoritmalarla kavga etmeye alışığım."
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingElement;

// Scroll reveal
let revealElements;

// Scrollspy
let sections;
let navLinks;

// Tema toggle
let themeToggleButton;

// Back-to-top
let backToTopButton;

document.addEventListener("DOMContentLoaded", () => {
  // HTML'deki elemanları JS tarafında yakalıyoruz
  typingElement = document.getElementById("typing-text");
  revealElements = document.querySelectorAll(".reveal");
  sections = document.querySelectorAll("section[id]");
  navLinks = document.querySelectorAll(".nav-link");
  themeToggleButton = document.getElementById("theme-toggle");
  backToTopButton = document.getElementById("back-to-top");

  // Efektleri başlat
  startTypingEffect();
  setupScrollReveal();
  setupThemeToggle();
  setupScrollSpy();
  setupBackToTop();
});

// === TYPING EFFECT ===
function startTypingEffect() {
  if (!typingElement) return;

  const currentPhrase = typingPhrases[typingIndex];

  if (!isDeleting) {
    // Yazma
    typingElement.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      // Cümlenin sonuna gelince biraz bekle
      isDeleting = true;
      setTimeout(startTypingEffect, 1200);
      return;
    }
  } else {
    // Silme
    typingElement.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingPhrases.length;
    }
  }

  const typingSpeed = isDeleting ? 40 : 90;
  setTimeout(startTypingEffect, typingSpeed);
}

// === SCROLL REVEAL ===
function setupScrollReveal() {
  if (!revealElements || revealElements.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    // Eski tarayıcılar için: hepsini direkt göster
    revealElements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => observer.observe(el));
}

// === THEME TOGGLE ===
function setupThemeToggle() {
  if (!themeToggleButton) return;

  // Sayfa ilk açıldığında buton ikonunu body'deki data-theme'e göre ayarla
  const body = document.body;
  const currentTheme = body.getAttribute("data-theme") || "dark";
  themeToggleButton.textContent = currentTheme === "dark" ? "🌙" : "☀️";

  themeToggleButton.addEventListener("click", () => {
    const current = body.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", next);
    themeToggleButton.textContent = next === "dark" ? "🌙" : "☀️";
  });
}

// === SCROLLSPY (hangi section aktif) ===
function setupScrollSpy() {
  if (!sections || sections.length === 0 || !("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          setActiveNav(id);
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach(section => observer.observe(section));
}

function setActiveNav(id) {
  if (!navLinks) return;

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === `#${id}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// === BACK TO TOP ===
function setupBackToTop() {
  if (!backToTopButton) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
