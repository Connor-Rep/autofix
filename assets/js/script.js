'use strict';

const viewBtn = document.querySelector("#view-packages-btn");
const backBtn = document.querySelector("#back-to-intro-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");
const packageWindow = document.querySelector(".package-window");

// 1. Reveal Packages
if (viewBtn) {
  viewBtn.addEventListener("click", function () {
    // Phase 1: Fade out Intro
    packageIntro.classList.add("fade-out");

    setTimeout(() => {
      // Phase 2: Switch to Content
      packageContent.classList.remove("hidden");
      
      // Phase 3: Measure the cards and expand background
      const newHeight = packageContent.scrollHeight;
      packageWindow.style.height = newHeight + "px";

      setTimeout(() => {
        packageContent.classList.add("active");
      }, 50);
    }, 500); 
  });
}

// 2. Back to Overview
if (backBtn) {
  backBtn.addEventListener("click", function () {
    // Phase 1: Fade out Cards
    packageContent.classList.remove("active");

    setTimeout(() => {
      // Phase 2: Switch back to Intro
      packageContent.classList.add("hidden");
      packageIntro.classList.remove("fade-out");
      
      // Phase 3: Measure intro and shrink background
      const introHeight = packageIntro.scrollHeight;
      packageWindow.style.height = introHeight + "px";
    }, 500); 
  });
}

// Ensure the background fits the intro on page load
window.addEventListener('load', () => {
  if(packageIntro) packageWindow.style.height = packageIntro.offsetHeight + "px";
});
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
