'use strict';

const searchInput = document.querySelector("#service-search");
const cards = document.querySelectorAll(".card-item");
const bookingPrompt = document.getElementById("booking-prompt");
const viewBookingBtn = document.getElementById("view-booking-btn");

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

// 3. Selection Toggle & Upsell Logic
const fullServiceCard = document.querySelector('[data-service="Full Service"]');
const detailCard = document.getElementById("complete-detail-card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("selected");
        const btn = card.querySelector(".add-btn");
        
        // Count Tracker
        if (card.classList.contains("selected")) {
            selectedCount++;
        } else {
            selectedCount--;
        }

        // Apply Text for Normal Cards
        if (card !== detailCard) {
            if (card.classList.contains("selected")) {
                btn.innerHTML = "✓ ADDED";
            } else {
                btn.innerHTML = "+ ADD";
            }
        }

        // --- THE GOLD GLOW UPSELL LOGIC FOR DETAIL CARD ---
        if (fullServiceCard && detailCard) {
            const detailBtn = detailCard.querySelector(".add-btn");
            const isFullSelected = fullServiceCard.classList.contains("selected");
            const isDetailSelected = detailCard.classList.contains("selected");

            // If Full Service is clicked and Detail is NOT clicked
            if (isFullSelected && !isDetailSelected) {
                detailCard.classList.add("gold-glow");
                detailBtn.innerHTML = "+ ADD (50% OFF)";
            } else {
                // Remove glow if they haven't selected Full Service, or if they successfully added Detail
                detailCard.classList.remove("gold-glow");
                
                if (isDetailSelected) {
                    detailBtn.innerHTML = "✓ ADDED";
                } else {
                    detailBtn.innerHTML = "+ ADD";
                }
            }
        }

        updateBookingBar();
    });
});

function updateBookingBar() {
    if (selectedCount > 0) {
        bookingPrompt.style.display = "none";
        viewBookingBtn.innerHTML = `VIEW BOOKING (${selectedCount} SERVICE${selectedCount > 1 ? 'S' : ''} SELECTED) <span class="material-symbols-rounded">arrow_forward</span>`;
    } else {
        bookingPrompt.style.display = "block";
        viewBookingBtn.innerHTML = `VIEW BOOKING (0 SERVICES SELECTED) <span class="material-symbols-rounded">arrow_forward</span>`;
    }
}

// 4. Booking Button Click
viewBookingBtn?.addEventListener("click", () => {
    if (selectedCount > 0) {
        const selectedServices = Array.from(document.querySelectorAll('.card-item.selected'))
                                      .map(card => card.dataset.service);
        console.log("Services to book:", selectedServices);
    } else {
        alert("Please select at least one service to begin your booking.");
    }
});

// Clean URLs
window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => { history.replaceState(null, null, window.location.pathname); }, 10);
  }
});
