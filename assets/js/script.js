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
    
    btnText.textContent = "Show Maintenance";
    toggleBtn.setAttribute("data-state", "detailing");
  } else {
    // Switch to Maintenance view
    dtlItems.forEach(item => item.classList.add("hidden"));
    mtnItems.forEach(item => item.classList.remove("hidden"));
    
    btnText.textContent = "Show Detailing";
    toggleBtn.setAttribute("data-state", "maintenance");
  }
});




const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});
