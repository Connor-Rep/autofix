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
    packageIntro.classList.add("fade-out");

    setTimeout(() => {
      packageIntro.style.display = "none";
      packageContent.classList.remove("hidden");
      
      setTimeout(() => {
        packageContent.classList.add("active");
      }, 50);
    }, 500); // Matches the 0.5s intro fade-out in CSS
  });
}

// 2. Back to Overview Logic (Reverse)
if (backBtn && packageIntro && packageContent) {
  backBtn.addEventListener("click", function () {
    // Start by sliding the cards back down/fading out
    packageContent.classList.remove("active");

    // Wait for the card transition (800ms per CSS) before swapping visibility
    setTimeout(() => {
      packageContent.classList.add("hidden");
      packageIntro.style.display = "block";
      
      // Small delay to ensure display:block has rendered before fading in
      setTimeout(() => {
        packageIntro.classList.remove("fade-out");
      }, 50);
    }, 800); 
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











