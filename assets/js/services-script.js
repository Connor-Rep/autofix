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

// 3. Selection Toggle Logic
cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("selected");
        const btn = card.querySelector(".add-btn");
        
        // Count Tracker & Button Text
        if (card.classList.contains("selected")) {
            selectedCount++;
            btn.innerHTML = "✓ ADDED";
        } else {
            selectedCount--;
            btn.innerHTML = "+ ADD";
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
        
        // Add a quick 'pop' animation
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
