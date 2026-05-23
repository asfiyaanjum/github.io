const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navLinks = document.querySelectorAll(".nav__link");
const header = document.getElementById("header");
const scrollUp = document.getElementById("scroll-up");
const themeToggle = document.getElementById("theme-toggle");
const copyEmail = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

navToggle.addEventListener("click", () => {
  navMenu.classList.add("show-menu");
  document.body.classList.add("no-scroll");
});

navClose.addEventListener("click", closeMenu);

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  navMenu.classList.remove("show-menu");
  document.body.classList.remove("no-scroll");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  localStorage.setItem(
    "portfolio-theme",
    document.body.classList.contains("light-theme") ? "light" : "dark",
  );
});

const words = [
  "Frontend & Java Developer",
  "CSE (Data Science) Student",
  "AI & Data Science Enthusiast",
];
const typingText = document.getElementById("typing-text");
let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];
  typingText.textContent = currentWord.slice(0, letterIndex);

  if (!isDeleting && letterIndex < currentWord.length) {
    letterIndex += 1;
    setTimeout(typeLoop, 92);
    return;
  }

  if (isDeleting && letterIndex > 0) {
    letterIndex -= 1;
    setTimeout(typeLoop, 48);
    return;
  }

  if (!isDeleting) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
  } else {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeLoop, 260);
  }
}

typeLoop();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("section[id]");

function updateScrollState() {
  const scrollY = window.scrollY;
  header.classList.toggle("scrolled", scrollY > 40);
  scrollUp.classList.toggle("show-scroll", scrollY > 520);

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const activeLink = document.querySelector(
      `.nav__link[href="#${sectionId}"]`,
    );

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active-link"));
      activeLink?.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", updateScrollState);
updateScrollState();

scrollUp.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    document.querySelectorAll(".tab").forEach((button) => {
      button.classList.remove("active");
      button.setAttribute("aria-selected", "false");
    });

    document.querySelectorAll(".timeline").forEach((timeline) => {
      timeline.classList.remove("active");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    document.getElementById(target).classList.add("active");
  });
});

if (copyEmail) {
  copyEmail.addEventListener("click", async () => {
    const email = copyEmail.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = "Email copied to clipboard.";
    } catch (error) {
      copyStatus.textContent = email;
    }

    setTimeout(() => {
      copyStatus.textContent = "";
    }, 2400);
  });
}

function initProjectSlider() {
  if (window.Swiper) {
    new Swiper(".project-swiper", {
      slidesPerView: 1,
      spaceBetween: 18,
      loop: true,
      grabCursor: true,
      speed: 650,
      autoplay: {
        delay: 3600,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        540: {
          slidesPerView: 1.15,
          centeredSlides: true,
        },
        760: {
          slidesPerView: 2,
          centeredSlides: false,
          spaceBetween: 20,
        },
        1100: {
          slidesPerView: 3,
          spaceBetween: 22,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 28,
        },
      },
    });
    return;
  }

  // Lightweight fallback for offline viewing when the CDN is unavailable.
  const wrapper = document.querySelector(".swiper-wrapper");
  const slides = document.querySelectorAll(".swiper-slide");
  let active = 0;

  wrapper.style.display = "flex";
  wrapper.style.transition = "transform .45s ease";
  slides.forEach((slide) => {
    slide.style.flex = "0 0 100%";
  });

  document
    .querySelector(".swiper-button-next")
    .addEventListener("click", () => {
      active = (active + 1) % slides.length;
      wrapper.style.transform = `translateX(-${active * 100}%)`;
    });

  document
    .querySelector(".swiper-button-prev")
    .addEventListener("click", () => {
      active = (active - 1 + slides.length) % slides.length;
      wrapper.style.transform = `translateX(-${active * 100}%)`;
    });
}

window.addEventListener("load", initProjectSlider);

const projectDetails = {
  voting: {
    title: "Online Voting System",
    banner: "images/project-voting-upload.jpeg",
    image: [
      "screenshots/login-page.png",
      "screenshots/voter-management.png",
      "screenshots/live-results.png",
    ],
    description:
      "A Java Swing based voting application designed with separate admin and voter flows, secure one-vote validation, candidate management, vote tracking, and persistent file handling.",
    features: [
      "Admin and voter modules",
      "Candidate and election management",
      "One vote per user validation",
      "Persistent storage with Java file handling",
    ],
    tech: ["Java", "Java Swing", "OOP", "File Handling"],
  },
  amazon: {
    title: "Amazon Homepage Clone",
    banner: "images/project-amazon-upload.webp",
    image: ["screenshots/amazon1.png", "screenshots/amazon2.png"],
    description:
      "A responsive e-commerce homepage clone focused on layout precision, navbar structure, hero sections, product cards, and visual hierarchy.",
    features: [
      "Responsive navbar",
      "Hero and product sections",
      "E-commerce card layout",
      "Clean HTML/CSS structure",
    ],
    tech: ["HTML", "CSS", "Responsive Design"],
  },
  currency: {
    title: "Currency Converter",
    banner: "images/project-currency-upload.png",
    image: [
      "screenshots/currency1.png",
      "screenshots/currency2.png",
      "screenshots/currency3.png",
    ],
    description:
      "A browser-based converter interface with country-based selection concepts, exchange-rate logic, flag-ready layout, and polished user interaction.",
    features: [
      "Currency selection",
      "Exchange-rate logic",
      "Flag display concept",
      "Interactive JavaScript UI",
    ],
    tech: ["JavaScript", "HTML", "CSS", "API Concepts"],
  },
  tictactoe: {
    title: "Tic Tac Toe",
    banner: "images/project-tictactoe-upload.png",
    image: [
      "screenshots/ttt1.png",
      "screenshots/ttt2.png",
      "screenshots/ttt3.png",
    ],
    description:
      "An interactive browser game built to practice DOM manipulation, game state, winner detection, restart logic, and smooth player feedback.",
    features: [
      "Winner detection",
      "Reset functionality",
      "Dynamic board state",
      "Interactive game feedback",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  },
  rockpaper: {
    title: "Rock Paper Scissors",
    banner: "images/project-rockpaper-upload.jpg",
    image: [
      "screenshots/rps1.png",
      "screenshots/rps2.png",
      "screenshots/rps3.png",
    ],
    description:
      "A polished browser-based Rock Paper Scissors game focused on player interaction, score tracking, randomized computer moves, and clear result feedback.",
    features: [
      "Player versus computer flow",
      "Score tracking",
      "Dynamic result display",
      "DOM event handling",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
  },
  netflix: {
    title: "Netflix Data Analysis",
    banner: "images/project-netflix-upload.jpeg",
    image: [
      "screenshots/nda1.png",
      "screenshots/nda2.png",
      "screenshots/nda3.png",
    ],
    description:
      "A data analytics showcase concept focused on Netflix-style content patterns, visual exploration, dashboard thinking, and insight storytelling.",
    features: [
      "Content pattern analysis",
      "Visual insight storytelling",
      "Dashboard-ready thinking",
      "Clean analytics presentation",
    ],
    tech: ["Python", "Data Analysis", "Tableau", "Visualization"],
  },
};

const projectModal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");
const modalFeatures = document.getElementById("modal-features");
const modalTech = document.getElementById("modal-tech");
const modalShots = document.getElementById("modal-shots");

function openProjectModal(projectKey) {
  const project = projectDetails[projectKey];
  if (!project || !projectModal) return;

  modalTitle.textContent = project.title;
  modalImage.src = project.banner;
  modalImage.alt = `${project.title} banner`;
  modalDescription.textContent = project.description;
  modalFeatures.innerHTML = project.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");
  modalTech.innerHTML = project.tech
    .map((item) => `<span>${item}</span>`)
    .join("");
  modalShots.innerHTML = project.image
    .map((shot) => `<img src="${shot}" alt="${project.title} screenshot">`)
    .join("");

  projectModal.classList.add("open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProjectModal() {
  if (!projectModal) return;
  projectModal.classList.remove("open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.addEventListener("click", (event) => {
  const card = event.target.closest(".project-card[data-project]");
  if (!card || event.target.closest("a")) return;
  openProjectModal(card.dataset.project);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest(".project-card[data-project]");
  if (!card) return;
  event.preventDefault();
  openProjectModal(card.dataset.project);
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeProjectModal();
});

/* ===== PREMIUM CURSOR ===== */

const cursor = document.querySelector(".custom-cursor");
const cursorBlur = document.querySelector(".cursor-blur");

if (cursor && cursorBlur && window.innerWidth > 768) {
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    cursorBlur.style.left = `${e.clientX}px`;
    cursorBlur.style.top = `${e.clientY}px`;
  });

  const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .service-card, .contact-card",
  );

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("cursor-hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("cursor-hover");
    });
  });
}

/* ===== MAGNETIC BUTTON EFFECT ===== */

const magneticButtons = document.querySelectorAll(".button, .icon-button");

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

/* ===== PROJECT CARD TILT EFFECT ===== */

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = (x / rect.width - 0.5) * 8;
    const rotateX = (y / rect.height - 0.5) * -8;

    card.style.transform = `perspective(1000px)
   translateY(-8px)
   rotateX(${rotateX}deg)
   rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
