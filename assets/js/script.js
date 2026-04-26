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
 * (Restored this so the menu actually works on mobile)
 */
if (navToggler && navbar) {
  navToggler.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
  });
}

/**
 * 2. ROBUST SMOOTH SCROLL (Fixes Desktop Snapping)
 */
navbarLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // Only run if it's a link to a section (starts with #)
    if (targetId && targetId.startsWith("#") && targetId !== "#") {
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        e.preventDefault(); // Stop the instant snap

        // Manually scroll to the section
        window.scrollTo({
          top: targetSection.offsetTop - 20, // Adjust -20 to add a little gap at the top
          behavior: "smooth"
        });

        // Close mobile menu after clicking
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
  const buffer = 20; 
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

window.addEventListener('load', () => {
  if (packageIntro) updateHeight(packageIntro);
});

/**
 * 4. CARD INTERACTION LOGIC
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
