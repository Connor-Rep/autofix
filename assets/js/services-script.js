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

    // Pulse effect (Fixed to trigger exactly ONCE per addition or page load)
    if (headerBookingBtn) {
        if (selectedCount > 0) {
            headerBookingBtn.classList.remove("ready-to-click");
            void headerBookingBtn.offsetWidth; // This forces the browser to restart the animation
            headerBookingBtn.classList.add("ready-to-click");
        } else {
            headerBookingBtn.classList.remove("ready-to-click");
        }
    }
}

// 4. Card Button Click Logic (Restricted to Buttons Only)
cards.forEach(card => {
    const serviceName = card.dataset.service;
    const addBtn = card.querySelector(".add-btn:not(.config-btn)");
    
    // NEW FIX: Check memory for base name OR configured versions (e.g., "Brakes" OR "Brakes: Front Axle")
    const isSelected = selectedServices.some(s => s === serviceName || s.startsWith(serviceName + ":"));
    
    if (isSelected) {
        card.classList.add("selected");
        const anyBtn = card.querySelector(".add-btn"); 
        if (anyBtn) {
            anyBtn.innerHTML = anyBtn.classList.contains("config-btn") ? "✓ CONFIGURED" : "✓ ADDED";
        }
    }

    // ONLY listen for clicks on the standard Add button
    if (addBtn) {
        addBtn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            e.preventDefault();

            card.classList.toggle("selected");
            
            if (card.classList.contains("selected")) {
                addBtn.innerHTML = "✓ ADDED";
                if (!selectedServices.includes(serviceName)) {
                    selectedServices.push(serviceName); 
                }
            } else {
                addBtn.innerHTML = "+ ADD";
                selectedServices = selectedServices.filter(s => s !== serviceName); 
            }

            selectedCount = selectedServices.length;
            localStorage.setItem('safetay_cart', JSON.stringify(selectedServices));
            updateHeaderCart();
        });
    }
});

// 5. Header Booking Button Click (Always go to Quote Page)
headerBookingBtn?.addEventListener("click", (e) => {
    e.preventDefault();
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
        e.stopPropagation(); 
    });
});

// 7. SMART MODAL LOGIC
const modal = document.getElementById("config-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const modalSubmitBtn = document.getElementById("modal-submit-btn");

// Find any button with the 'config-btn' class
document.querySelectorAll(".config-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        e.preventDefault();
        
        const card = btn.closest(".card-item");
        const serviceName = card.dataset.service;

        // NEW FIX: If it is already selected, REMOVE it!
        if (card.classList.contains("selected")) {
            card.classList.remove("selected");
            btn.innerHTML = "ADD & CONFIGURE"; // Resets the button text
            
            // Remove any string that starts with "Brakes" from memory
            selectedServices = selectedServices.filter(s => s !== serviceName && !s.startsWith(serviceName + ":"));
            
            selectedCount = selectedServices.length;
            localStorage.setItem('safetay_cart', JSON.stringify(selectedServices));
            updateHeaderCart();
        } else {
            // Not selected yet? Open the modal!
            modal.classList.add("active"); 
        }
    });
});

// Close Modal Logic
closeModalBtn?.addEventListener("click", () => modal.classList.remove("active"));
modal?.addEventListener("click", (e) => {
    if(e.target === modal) modal.classList.remove("active"); 
});

// Submit from Modal
modalSubmitBtn?.addEventListener("click", () => {
    const selectedOption = document.querySelector('input[name="brake_option"]:checked').value;
    
    if (!selectedServices.includes(selectedOption)) {
        selectedServices.push(selectedOption);
        localStorage.setItem('safetay_cart', JSON.stringify(selectedServices));
        selectedCount = selectedServices.length;
        updateHeaderCart();
    }

    const brakesCard = document.querySelector('[data-service="Brakes"]');
    if (brakesCard) {
        brakesCard.classList.add("selected");
        const baseBtn = brakesCard.querySelector(".add-btn");
        if (baseBtn) baseBtn.innerHTML = "✓ CONFIGURED";
    }

    modal.classList.remove("active");
});

// Run immediately on load to update the badge and trigger the 1-time pulse
updateHeaderCart();
