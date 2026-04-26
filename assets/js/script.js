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
