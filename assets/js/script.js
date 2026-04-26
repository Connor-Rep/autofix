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
  // We use scrollHeight to get the full height, 
  // then add 40px to account for the horizontal scrollbar and button spacing.
  const extraSpace = 40; 
  packageWindow.style.height = (element.scrollHeight + extraSpace) + "px";
}

// In the View Packages listener, ensure layout is calculated first
if (viewBtn) {
  viewBtn.addEventListener("click", function () {
    packageIntro.classList.add("fade-out");
    packageContent.classList.remove("hidden");
    
    // Using requestAnimationFrame ensures the browser has calculated the 
    // card positions before we measure the height.
    requestAnimationFrame(() => {
      updateHeight(packageContent);
      packageContent.classList.add("active");
    });
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
