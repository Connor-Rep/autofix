'use strict';

const viewBtn = document.querySelector("#view-packages-btn");
const backBtn = document.querySelector("#back-to-intro-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");
const packageWindow = document.querySelector(".package-window");

// Function to sync the background height to the visible content
function syncHeight(element) {
  packageWindow.style.height = element.scrollHeight + "px";
}

// 1. View Packages
if (viewBtn) {
  viewBtn.addEventListener("click", function () {
    // Start fading out intro
    packageIntro.classList.add("fade-out");
    
    // Immediately prepare content and start background growth
    packageContent.classList.remove("hidden");
    syncHeight(packageContent);

    // Trigger the fade-in almost immediately
    setTimeout(() => {
      packageContent.classList.add("active");
    }, 10);
  });
}

// 2. Back to Overview
if (backBtn) {
  backBtn.addEventListener("click", function () {
    // Start fading out cards
    packageContent.classList.remove("active");
    
    // Immediately bring back intro and shrink background
    packageIntro.classList.remove("fade-out");
    syncHeight(packageIntro);

    // Hide cards after the transition finishes (matching 1.2s CSS)
    setTimeout(() => {
      packageContent.classList.add("hidden");
    }, 1200);
  });
}

// Initialize height on load
window.addEventListener('load', () => {
  if (packageIntro) syncHeight(packageIntro);
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
