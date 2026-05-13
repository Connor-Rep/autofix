'use strict';

const searchInput = document.querySelector("#service-search");
const cards = document.querySelectorAll(".card-item");
const headerBookingBtn = document.getElementById("header-booking-btn");

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

// 3. Selection Toggle & Local Storage Memory
let selectedServices = JSON.parse(localStorage.getItem('safetay_cart')) || [];
let selectedCount = selectedServices.length;

function updateHeaderCart() {
    const cartCountBadge = document.getElementById("cart-count");
    if (cartCountBadge) {
        cartCountBadge.innerText = selectedCount;
        cartCountBadge.classList.add("pop");
        setTimeout(() => cartCountBadge.classList.remove("pop"), 200);
    }

    // Add the glowing pulse effect if items are in cart
    if (headerBookingBtn) {
        if (selectedCount > 0) {
            headerBookingBtn.classList.add("ready-to-click");
        } else {
            headerBookingBtn.classList.remove("ready-to-click");
        }
    }
}

// 4. Card Click Logic
cards.forEach(card => {
    const serviceName = card.dataset.service;
    const btn = card.querySelector(".add-btn");
    
    // On page load, if it's in local storage, visually select it immediately
    if (selectedServices.includes(serviceName)) {
        card.classList.add("selected");
        if (btn) btn.innerHTML = "✓ ADDED";
    }

    card.addEventListener("click", () => {
        card.classList.toggle("selected");
        
        if (card.classList.contains("selected")) {
            if (btn) btn.innerHTML = "✓ ADDED";
            if (!selectedServices.includes(serviceName)) {
                selectedServices.push(serviceName); // Save to memory
            }
        } else {
            if (btn) btn.innerHTML = "+ ADD";
            selectedServices = selectedServices.filter(s => s !== serviceName); // Remove from memory
        }

        // Save to browser memory and update the UI
        selectedCount = selectedServices.length;
        localStorage.setItem('safetay_cart', JSON.stringify(selectedServices));
        updateHeaderCart();
    });
});

// 5. Header Booking Button Click (Always go to Quote Page)
headerBookingBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    // No matter what is in the basket, go straight to the checkout page!
    window.location.href = "/quote.html"; 
});

// Clean URLs
window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => { history.replaceState(null, null, window.location.pathname); }, 10);
  }
});

// 6. Stop links from triggering the card selection
document.querySelectorAll('.card-details-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // This physically stops the click from "bubbling up" to the card underneath
        e.stopPropagation(); 
    });
});

// Run immediately on load to update the badge
updateHeaderCart();
