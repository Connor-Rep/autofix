'use strict';

const searchInput = document.querySelector("#service-search");
const cards = document.querySelectorAll(".card-item");

// New Header Button Targets
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

            if (isFullSelected && !isDetailSelected) {
                detailCard.classList.add("gold-glow");
                detailBtn.innerHTML = "+ ADD (50% OFF)";
            } else {
                detailCard.classList.remove("gold-glow");
                if (isDetailSelected) {
                    detailBtn.innerHTML = "✓ ADDED";
                } else {
                    detailBtn.innerHTML = "+ ADD";
                }
            }
        }

        updateHeaderCart();
    });
});

// 4. Update Header Cart Logic
function updateHeaderCart() {
    const cartCountBadge = document.getElementById("cart-count");
    
    // Update the number inside the badge
    if (cartCountBadge) {
        cartCountBadge.innerText = selectedCount;
        
        // Add a quick little 'pop' animation to draw the eye
        cartCountBadge.classList.add("pop");
        setTimeout(() => {
            cartCountBadge.classList.remove("pop");
        }, 200);
    }

    if (selectedCount > 0) {
        // Active State
        headerBookingBtn.classList.add("ready-to-click");
        headerBtnText.innerText = "CONTINUE";
    } else {
        // Empty State
        headerBookingBtn.classList.remove("ready-to-click");
        headerBtnText.innerText = "SERVICES";
    }
}

// 5. Header Booking Button Click
headerBookingBtn?.addEventListener("click", () => {
    if (selectedCount > 0) {
        const selectedServices = Array.from(document.querySelectorAll('.card-item.selected'))
                                      .map(card => card.dataset.service);
        console.log("Services to book:", selectedServices);
        // e.g. window.location.href = "/quote.html";
    } else {
        // If they click it when it says "SERVICES" and it's empty, smoothly scroll them to the grid
        document.getElementById("services-grid-section").scrollIntoView({ behavior: "smooth" });
    }
});

// Clean URLs
window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => { history.replaceState(null, null, window.location.pathname); }, 10);
  }
});
