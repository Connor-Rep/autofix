'use strict';



const searchInput = document.querySelector("#service-search");
const cards = document.querySelectorAll(".card-item");

// Header Button Targets
const headerBookingBtn = document.getElementById("header-booking-btn");
const headerBtnText = document.getElementById("header-btn-text");

let selectedCount = 0;

// 1. Navigation & Mobile Menu Logic
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler?.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

document.querySelectorAll("#header-back-btn, #header-logo").forEach(el => {
    el?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/";
    });
});

// 2. Search Logic
searchInput?.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    cards.forEach(card => {
        card.classList.remove("highlight");
        if (val && card.dataset.service.toLowerCase().includes(val)) {
            card.classList.add("highlight");
        }
    });
});

// 3 & 4. Selection Toggle & Local Storage Logic
let selectedServices = JSON.parse(localStorage.getItem('safetay_cart')) || [];
let selectedCount = selectedServices.length;

// On page load, highlight any cards that were already in the cart
cards.forEach(card => {
    const serviceName = card.dataset.service;
    
    // If it's in local storage, visually select it immediately
    if (selectedServices.includes(serviceName)) {
        card.classList.add("selected");
        card.querySelector(".add-btn").innerHTML = "✓ ADDED";
    }

    card.addEventListener("click", () => {
        card.classList.toggle("selected");
        const btn = card.querySelector(".add-btn");
        
        if (card.classList.contains("selected")) {
            btn.innerHTML = "✓ ADDED";
            if (!selectedServices.includes(serviceName)) {
                selectedServices.push(serviceName); // Add to memory array
            }
        } else {
            btn.innerHTML = "+ ADD";
            selectedServices = selectedServices.filter(s => s !== serviceName); // Remove from memory array
        }

        // Save the new array to the browser's memory
        selectedCount = selectedServices.length;
        localStorage.setItem('safetay_cart', JSON.stringify(selectedServices));
        updateHeaderCart();
    });
});

function updateHeaderCart() {
    const cartCountBadge = document.getElementById("cart-count");
    if (cartCountBadge) {
        cartCountBadge.innerText = selectedCount;
        cartCountBadge.classList.add("pop");
        setTimeout(() => cartCountBadge.classList.remove("pop"), 200);
    }
}

// Run immediately on load to update the badge number
updateHeaderCart();

// 5. Header Booking Button Click
headerBookingBtn?.addEventListener("click", () => {
    if (selectedCount > 0) {
        const selectedServices = Array.from(document.querySelectorAll('.card-item.selected'))
                                      .map(card => card.dataset.service);
        console.log("Services to book:", selectedServices);
        // window.location.href = "/quote.html";
    } else {
        // If empty, smoothly scroll them to the grid
        document.getElementById("services-grid-section").scrollIntoView({ behavior: "smooth" });
    }
});

// Clean URLs
window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => { history.replaceState(null, null, window.location.pathname); }, 10);
  }
});
