'use strict';

/**
 * SELECTORS
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll(".navbar-link");

// Package Section Selectors
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
 * 2. FORCED SMOOTH SCROLL (The Desktop Fix)
 */
navbarLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Only run if the link starts with # (like #services)
    if (href && href.startsWith("#") && href !== "#") {
      const targetSection = document.querySelector(href);

      if (targetSection) {
        // Stop the browser from "snapping" instantly
        e.preventDefault();

        // Force a smooth scroll to the element's position
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth"
        });

        // Close the mobile menu automatically after clicking
        if (navbar.classList.contains("active")) {
          navbar.classList.remove("active");
          navToggler.classList.remove("active");
        }
      }
    }
  });
});


/**
 * 3. PACKAGE SECTION LOGIC (Fixed Duplicates)
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
 * 4. CARD & OVERLAY LOGIC
 */
// Card Flips
document.querySelectorAll(".flip-trigger").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.closest(".work-card").classList.add("flipped");
  });
});

document.querySelectorAll(".flip-back-link").forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.closest(".work-card").classList.remove("flipped");
  });
});

// Service Overlays
document.querySelectorAll(".service-read-more").forEach(btn => {
  btn.addEventListener("click", function() {
    const overlay = this.closest(".service-card").querySelector(".card-overlay");
    if (overlay) overlay.classList.add("active");
  });
});

document.querySelectorAll(".close-overlay").forEach(btn => {
  btn.addEventListener("click", function() {
    this.closest(".card-overlay").classList.remove("active");
  });
});
