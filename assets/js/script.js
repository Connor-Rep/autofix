'use strict';

/**
 * PACKAGE REVEAL LOGIC
 */
const viewBtn = document.querySelector("#view-packages-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");

if (viewBtn && packageIntro && packageContent) {
  viewBtn.addEventListener("click", function () {
    // 1. Fade out the intro
    packageIntro.classList.add("fade-out");

    // 2. Wait for fade out (500ms matches CSS), then show content
    setTimeout(() => {
      packageIntro.style.display = "none";
      packageContent.classList.remove("hidden");
      
      // Allow a tiny delay for the slide-in animation to trigger
      setTimeout(() => {
        packageContent.classList.add("active");
      }, 50);
    }, 500);
  });
}


/**
 * PACKAGE REVEAL LOGIC
 */
const viewBtn = document.querySelector("#view-packages-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");

if (viewBtn) {
  viewBtn.addEventListener("click", function () {
    // 1. Fade out the intro
    packageIntro.classList.add("fade-out");

    // 2. Wait for fade out, then swap visibility and trigger slide-in
    setTimeout(() => {
      packageIntro.style.display = "none";
      packageContent.classList.remove("hidden");
      
      // Small timeout to ensure display:block has rendered before adding active class
      setTimeout(() => {
        packageContent.classList.add("active");
      }, 50);
    }, 500);
  });
}

/**
 * PACKAGE CARD FLIP LOGIC (Previously Membership Card Flip)
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
    // Find the overlay specifically within this card
    const overlay = this.closest(".service-card").querySelector(".card-overlay");
    overlay.classList.add("active");
  });
});

serviceCloseBtns.forEach(btn => {
  btn.addEventListener("click", function() {
    // Remove the active class to slide it back down
    this.closest(".card-overlay").classList.remove("active");
  });
});











