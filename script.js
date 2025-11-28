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

// Scroll reveal için
let revealElements;

// Tema toggle için
let themeToggleButton;

document.addEventListener("DOMContentLoaded", () => {
  typingElement = document.getElementById("typing-text");
  revealElements = document.querySelectorAll(".reveal");
  themeToggleButton = document.getElementById("theme-toggle");

  startTypingEffect();
  setupScrollReveal();
  setupThemeToggle();
});

// === TYPING EFFECT ===
function startTypingEffect() {
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
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

// === THEME TOGGLE ===
function setupThemeToggle() {
  if (!themeToggleButton) return;

  themeToggleButton.addEventListener("click", () => {
    const body = document.body;
    const currentTheme = body.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);

    // Buton iconunu değiştir
    if (newTheme === "light") {
      themeToggleButton.textContent = "☀️";
    } else {
      themeToggleButton.textContent = "🌙";
    }
  });
}
