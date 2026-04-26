'use strict';

const viewBtn = document.querySelector("#view-packages-btn");
const backBtn = document.querySelector("#back-to-intro-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");
const packageWindow = document.querySelector(".package-window");

/**
 * Helper: Updates background height to match target element
 */
function updateHeight(element) {
  packageWindow.style.height = element.scrollHeight + "px";
}

// 1. Reveal Packages
if (viewBtn) {
  viewBtn.addEventListener("click", function () {
    // Fade out intro and bring in cards simultaneously
    packageIntro.classList.add("fade-out");
    packageContent.classList.remove("hidden");
    
    // Animate background growth
    updateHeight(packageContent);
  });
}

// 2. Back to Overview (The Reverse)
if (backBtn) {
  backBtn.addEventListener("click", function () {
    // Fade out cards and bring back intro simultaneously
    packageContent.classList.add("hidden");
    packageIntro.classList.remove("fade-out");
    
    // Animate background shrinking
    updateHeight(packageIntro);
  });
}

// Initialize height on load
window.addEventListener('load', () => {
  if (packageIntro) updateHeight(packageIntro);
});


/**
 * Helper: Updates background height with a small buffer
 */
function updateHeight(element) {
  // Adding 20px buffer prevents buttons/shadows from being cut off
  const buffer = 20; 
  packageWindow.style.height = (element.scrollHeight + buffer) + "px";
}




/**
 * PACKAGE CARD FLIP LOGIC
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

/**
 * SERVICE CARD OVERLAY LOGIC
 */
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



/**
 * GLOBAL SMOOTH SCROLLING
 */
// Targets every link that starts with a "#"
const allLinks = document.querySelectorAll('a[href^="#"]');

allLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

    // Skip links that are just "#" (like your "Get a Quote" buttons currently)
    if (targetId === '#' || targetId === '') return;

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      e.preventDefault(); // Stop the instant snap

      // Smoothly glide to the section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Automatically close mobile menu if it's open
      const navbar = document.querySelector("[data-navbar]");
      const navToggler = document.querySelector("[data-nav-toggler]");
      if (navbar?.classList.contains("active")) {
        navbar.classList.remove("active");
        navToggler.classList.remove("active");
      }
    }
  });
});

/**
 * MOBILE NAVBAR TOGGLE (Explicit Logic)
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

if (navbar && navToggler) {
  navToggler.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
  });
}




