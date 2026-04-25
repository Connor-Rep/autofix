'use strict';

/**
 * MOBILE NAVBAR TOGGLE
 */


const toggleBtn = document.querySelector("#membership-toggle");
const mtnItems = document.querySelectorAll(".maintenance-item");
const dtlItems = document.querySelectorAll(".detailing-item");
const btnText = toggleBtn.querySelector(".span");

toggleBtn.addEventListener("click", function () {
  // Check the current state
  const isMaintenance = toggleBtn.getAttribute("data-state") === "maintenance";

  if (isMaintenance) {
    // Switch to Detailing view
    mtnItems.forEach(item => item.classList.add("hidden"));
    dtlItems.forEach(item => item.classList.remove("hidden"));
    
    btnText.textContent = "Show Maintenance Memberships";
    toggleBtn.setAttribute("data-state", "detailing");
  } else {
    // Switch to Maintenance view
    dtlItems.forEach(item => item.classList.add("hidden"));
    mtnItems.forEach(item => item.classList.remove("hidden"));
    
    btnText.textContent = "Show Detailing Memberships";
    toggleBtn.setAttribute("data-state", "maintenance");
  }
});


const navbarLinks = document.querySelectorAll(".navbar-link");

navbarLinks.forEach(link => {
  link.addEventListener("click", () => {
    // This removes the 'active' class from your navbar and toggle button
    document.querySelector("[data-navbar]").classList.remove("active");
    document.querySelector("[data-nav-toggler]").classList.remove("active");
  });
});



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











