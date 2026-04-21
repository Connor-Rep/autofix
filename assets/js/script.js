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
 * MEMBERSHIP CARD FLIP LOGIC
 */

const flipTriggers = document.querySelectorAll(".flip-trigger");
const backTriggers = document.querySelectorAll(".flip-back-text");

// Flip to back
flipTriggers.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.closest(".work-card").classList.add("flipped");
  });
});

// Flip to front
backTriggers.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.closest(".work-card").classList.remove("flipped");
  });
});








const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});
