'use strict';

/**
 * SELECTORS
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll(".navbar-link");

const viewBtn = document.querySelector("#view-packages-btn");
const backBtn = document.querySelector("#back-to-intro-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");
const packageWindow = document.querySelector(".package-window");


/**
 * 1. MOBILE MENU TOGGLE
 */
if (navToggler && navbar) {
  navToggler.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
  });
}


/**
 * 2. GLOBAL SMOOTH SCROLL (Fixes Desktop Snapping)
 */
navbarLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // Only run if it's a link to a section on the same page (starts with #)
    if (targetId && targetId.startsWith("#") && targetId !== "#") {
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault(); // Stop the instant snap

        // Calculate position
        const targetPosition = targetSection.offsetTop;

        // Smooth scroll via JS (most reliable for desktop)
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

        // Close mobile menu after clicking a link
        if (navbar.classList.contains("active")) {
          navbar.classList.remove("active");
          navToggler.classList.remove("active");
        }
      }
    }
  });
});


/**
 * 3. PACKAGE SECTION LOGIC
 */
function updateHeight(element) {
  if (!packageWindow || !element) return;
  const buffer = 20; // Prevents cutting off shadows/buttons
  packageWindow.style.height = (element.scrollHeight + buffer) + "px";
}

if (viewBtn) {
  viewBtn.addEventListener("click", function () {
    packageIntro.classList.add("fade-out");
    packageContent.classList.remove("hidden");
    updateHeight(packageContent);
  });
}

if (backBtn) {
  backBtn.addEventListener("click", function () {
    packageContent.classList.add("hidden");
    packageIntro.classList.remove("fade-out");
    updateHeight(packageIntro);
  });
}

// Initialize height on load
window.addEventListener('load', () => {
  if (packageIntro) updateHeight(packageIntro);
});


/**
 * 4. CARD INTERACTION LOGIC (Flip & Overlay)
 */
const flipTriggers = document.querySelectorAll(".flip-trigger");
const backTriggers = document.querySelectorAll(".flip-back-link");

flipTriggers.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.closest(".work-card").classList.add("flipped");
  });
});

backTriggers.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    this.closest(".work-card").classList.remove("flipped");
  });
});

const serviceReadMoreBtns = document.querySelectorAll(".service-read-more");
const serviceCloseBtns = document.querySelectorAll(".close-overlay");

serviceReadMoreBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    const overlay = this.closest(".service-card").querySelector(".card-overlay");
    if (overlay) overlay.classList.add("active");
  });
});

serviceCloseBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    this.closest(".card-overlay").classList.remove("active");
  });
});
