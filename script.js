// Typing effect cümleleri
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

// Müzik
let musicAudio;
let musicToggleButton;

document.addEventListener("DOMContentLoaded", () => {
  typingElement = document.getElementById("typing-text");
  revealElements = document.querySelectorAll(".reveal");
  sections = document.querySelectorAll("section[id]");
  navLinks = document.querySelectorAll(".nav-link");
  themeToggleButton = document.getElementById("theme-toggle");
  backToTopButton = document.getElementById("back-to-top");
  musicAudio = document.getElementById("bg-music");
  musicToggleButton = document.getElementById("music-toggle");

  startTypingEffect();
  setupScrollReveal();
  setupThemeToggle();
  setupScrollSpy();
  setupBackToTop();
  setupMusicPlayer();
});

// === TYPING EFFECT ===
function startTypingEffect() {
  const currentPhrase = typingPhrases[typingIndex];

  if (!isDeleting) {
    typingElement.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(startTypingEffect, 1200);
      return;
    }
  } else {
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

    if (newTheme === "light") {
      themeToggleButton.textContent = "☀️";
    } else {
      themeToggleButton.textContent = "🌙";
    }
  });
}

// === SCROLLSPY (hangi section aktif) ===
function setupScrollSpy() {
  if (!("IntersectionObserver" in window)) {
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
    {
      threshold: 0.5
    }
  );

  sections.forEach(section => observer.observe(section));
}

function setActiveNav(id) {
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

// === MÜZİK PLAYER ===
function setupMusicPlayer() {
  if (!musicAudio || !musicToggleButton) return;

  let isPlaying = false;

  musicToggleButton.addEventListener("click", async () => {
    try {
      if (!isPlaying) {
        await musicAudio.play();
        isPlaying = true;
        musicToggleButton.textContent = "⏸";
      } else {
        musicAudio.pause();
        isPlaying = false;
        musicToggleButton.textContent = "▶";
      }
    } catch (err) {
      console.warn("Müzik çalınamadı:", err);
    }
  });
}
