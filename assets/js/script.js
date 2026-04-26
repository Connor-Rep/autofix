'use strict';

const viewBtn = document.querySelector("#view-packages-btn");
const backBtn = document.querySelector("#back-to-intro-btn");
const packageIntro = document.querySelector("#package-intro");
const packageContent = document.querySelector("#package-content");
const packageWindow = document.querySelector(".package-window");

// Helper to set height accurately
function setWindowHeight(element) {
  // We temporarily make it relative to get its true height
  const originalPosition = element.style.position;
  element.style.position = 'relative';
  element.style.visibility = 'hidden';
  element.classList.remove('hidden');
  
  const height = element.offsetHeight;
  
  // Reset styles
  element.style.position = originalPosition;
  element.style.visibility = '';
  element.classList.add('hidden');
  
  packageWindow.style.height = height + "px";
}

// Initial height set on load
window.addEventListener('load', () => {
  if(packageIntro) packageWindow.style.height = packageIntro.offsetHeight + "px";
});

// 1. Reveal Packages
if (viewBtn) {
  viewBtn.addEventListener("click", function () {
    packageIntro.classList.add("fade-out");

    setTimeout(() => {
      packageIntro.classList.add("hidden");
      packageContent.classList.remove("hidden");
      
      // Grow the background
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
    packageContent.classList.remove("active");

    setTimeout(() => {
      packageContent.classList.add("hidden");
      packageIntro.classList.remove("hidden");
      
      // Shrink the background back to intro size
      packageWindow.style.height = packageIntro.scrollHeight + "px";

      setTimeout(() => {
        packageIntro.classList.remove("fade-out");
      }, 50);
    }, 600); 
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
