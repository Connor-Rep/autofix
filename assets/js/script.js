'use strict';

/**
 * PACKAGE REVEAL & REVERSE LOGIC
 */
const viewBtn = document.querySelector("#view-packages-btn");
const backBtn = document.querySelector("#back-to-intro-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");

// 1. Reveal Packages Logic
if (viewBtn && packageIntro && packageContent) {
  viewBtn.addEventListener("click", function () {
    // We just toggle classes; CSS handles the smooth height growth
    packageIntro.classList.add("fade-out");
    packageContent.classList.remove("hidden");
    
    // Tiny delay ensures the 'active' transition triggers properly
    setTimeout(() => {
      packageContent.classList.add("active");
    }, 10);
  });
}

// 2. Back to Overview Logic (Reverse)
if (backBtn && packageIntro && packageContent) {
  backBtn.addEventListener("click", function () {
    // Reverse the classes
    packageContent.classList.remove("active");
    
    // Wait slightly for the cards to start sliding down before showing intro
    setTimeout(() => {
      packageContent.classList.add("hidden");
      packageIntro.classList.remove("fade-out");
    }, 300); 
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











