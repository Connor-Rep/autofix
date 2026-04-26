'use strict';

const viewBtn = document.querySelector("#view-packages-btn");
const backBtn = document.querySelector("#back-to-intro-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");
const packageWindow = document.querySelector(".package-window");

// 1. Reveal Packages
if (viewBtn) {
  viewBtn.addEventListener("click", function () {
    packageIntro.classList.add("fade-out");

    // Increased from 500 to 1200 (1.2 seconds) to match CSS
    setTimeout(() => {
      packageIntro.classList.add("hidden");
      packageContent.classList.remove("hidden");
      
      const newHeight = packageContent.scrollHeight;
      packageWindow.style.height = newHeight + "px";

      setTimeout(() => {
        packageContent.classList.add("active");
      }, 50);
    }, 1200); 
  });
}

// 2. Back to Overview
if (backBtn) {
  backBtn.addEventListener("click", function () {
    packageContent.classList.remove("active");

    // Increased from 500 to 1200 (1.2 seconds) to match CSS
    setTimeout(() => {
      packageContent.classList.add("hidden");
      packageIntro.classList.remove("fade-out");
      
      const introHeight = packageIntro.scrollHeight;
      packageWindow.style.height = introHeight + "px";
    }, 1200); 
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
