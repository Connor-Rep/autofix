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
        if (val && card.dataset.service?.toLowerCase().includes(val)) {
            card.classList.add("highlight");
        }
    });
});

// 3. Self-Healing Memory (Catches crashes from old corrupted test data)
let selectedServices = [];
try {
    const stored = localStorage.getItem('safetay_cart');
    if (stored) {
        selectedServices = JSON.parse(stored);
        if (!Array.isArray(selectedServices)) selectedServices = []; // Forces it to be a clean array
    }
} catch (error) {
    console.warn("Cleared old corrupted cart data.");
    selectedServices = [];
    localStorage.removeItem('safetay_cart');
}

let selectedCount = selectedServices.length;

function updateHeaderCart() {
    const cartCountBadge = document.getElementById("cart-count");
    if (cartCountBadge) {
        cartCountBadge.innerText = selectedCount;
        cartCountBadge.classList.add("pop");
        setTimeout(() => cartCountBadge.classList.remove("pop"), 200);
    }

    if (headerBookingBtn) {
        if (selectedCount > 0) {
            headerBookingBtn.classList.add("ready-to-click");
        } else {
            headerBookingBtn.classList.remove("ready-to-click");
        }
    }
}

// 4. Bulletproof Card Click Logic
cards.forEach(card => {
    const serviceName = card.dataset.service;
    if (!serviceName) return; // Skips if a card is missing its data tag

    const btn = card.querySelector(".add-btn");
    
    // Check memory on load
    if (selectedServices.includes(serviceName)) {
        card.classList.add("selected");
        if (btn) btn.innerHTML = "✓ ADDED";
    }

    card.addEventListener("click", (e) => {
        e.preventDefault(); // Stops the browser from doing any weird default behaviors
        
        card.classList.toggle("selected");
        
        if (card.classList.contains("selected")) {
            if (btn) btn.innerHTML = "✓ ADDED";
            if (!selectedServices.includes(serviceName)) {
                selectedServices.push(serviceName);
            }
        } else {
            if (btn) btn.innerHTML = "+ ADD";
            selectedServices = selectedServices.filter(s => s !== serviceName);
        }

        // Save safely
        selectedCount = selectedServices.length;
        localStorage.setItem('safetay_cart', JSON.stringify(selectedServices));
        updateHeaderCart();
    });
});

// 5. Header Booking Button Click
headerBookingBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    if (selectedCount > 0) {
        console.log("Services to book:", selectedServices);
        // window.location.href = "/quote.html"; // Uncomment this when you build the quote page!
    } else {
        document.getElementById("services-grid-section")?.scrollIntoView({ behavior: "smooth" });
    }
});

// Clean URLs
window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => { history.replaceState(null, null, window.location.pathname); }, 10);
  }
});

// Run UI update immediately
updateHeaderCart();
