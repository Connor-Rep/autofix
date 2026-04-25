'use strict';

/**
 * NAVBAR TOGGLE & HEADER SCROLL
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll(".navbar-link");
const header = document.querySelector(".header");

// Toggle navbar on mobile
navTogglers.forEach(toggler => {
  toggler.addEventListener("click", function () {
    navbar.classList.toggle("active");
    this.classList.toggle("active");
  });
});

// Close navbar when a link is clicked (essential for smooth feel on mobile)
navbarLinks.forEach(link => {
  link.addEventListener("click", function () {
    navbar.classList.remove("active");
    navTogglers.forEach(t => t.classList.remove("active"));
  });
});

// Add 'active' class to header on scroll
window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});


/**
 * PACKAGE REVEAL & REVERSE LOGIC
 */
const viewBtn = document.querySelector("#view-packages-btn");
const backBtn = document.querySelector("#back-to-intro-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");

if (viewBtn && packageIntro && packageContent) {
  viewBtn.addEventListener("click", function () {
    packageIntro.classList.add("fade-out");
    setTimeout(() => {
      packageIntro.style.display = "none";
      packageContent.classList.remove("hidden");
      setTimeout(() => {
        packageContent.classList.add("active");
      }, 50);
    }, 500);
  });
}

if (backBtn && packageIntro && packageContent) {
  backBtn.addEventListener("click", function () {
    packageContent.classList.remove("active");
    setTimeout(() => {
      packageContent.classList.add("hidden");
      packageIntro.style.display = "block";
      setTimeout(() => {
        packageIntro.classList.remove("fade-out");
      }, 50);
    }, 800); 
  });
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
