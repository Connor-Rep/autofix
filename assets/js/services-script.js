'use strict';

const searchInput = document.querySelector("#service-search");
const cards = document.querySelectorAll(".card-item");
const bookingPrompt = document.getElementById("booking-prompt");
const viewBookingBtn = document.getElementById("view-booking-btn");

let selectedCount = 0;

// 1. Navigation
document.querySelectorAll("#header-back-btn, #header-logo").forEach(el => {
    el?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/";
    });
});

// 2. Search Logic (Fixed)
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
        const isDetailService = card.dataset.service === "Complete Detail";

        if (card.classList.contains("selected")) {
            selectedCount++;
            btn.innerHTML = "✓ ADDED";
        } else {
            selectedCount--;
            btn.innerHTML = isDetailService ? "+ ADD (HALF-PRICE DETAIL)" : "+ ADD";
        }

        // --- THE GOLD GLOW UPSELL LOGIC ---
        // If Full Service is selected AND Complete detail is NOT yet selected, make it glow!
        if (fullServiceCard && detailCard) {
            if (fullServiceCard.classList.contains("selected") && !detailCard.classList.contains("selected")) {
                detailCard.classList.add("gold-glow");
            } else {
                detailCard.classList.remove("gold-glow");
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
