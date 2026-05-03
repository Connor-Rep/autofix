'use strict';

const searchInput = document.querySelector("#service-search");
const cards = document.querySelectorAll(".card-item");
const bookingPrompt = document.getElementById("booking-prompt");
const viewBookingBtn = document.getElementById("view-booking-btn");

let selectedCount = 0;

// 1. Navigation (Retained from original)
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

// 3. Selection Toggle Logic & Bottom Bar Updates
cards.forEach(card => {
    card.addEventListener("click", () => {
        // Toggle the selected state
        card.classList.toggle("selected");
        
        const btn = card.querySelector(".add-btn");
        const isDetailService = card.dataset.service === "Complete Detail";

        // Logic for when the card is selected
        if (card.classList.contains("selected")) {
            selectedCount++;
            btn.innerHTML = "✓ ADDED";
        } 
        // Logic for when the card is deselected
        else {
            selectedCount--;
            btn.innerHTML = isDetailService ? "+ ADD (HALF-PRICE DETAIL)" : "+ ADD";
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
        // Prepare to pass the selected services to the quote page
        const selectedServices = Array.from(document.querySelectorAll('.card-item.selected'))
                                      .map(card => card.dataset.service);
        
        console.log("Services to book:", selectedServices);
        // Example: window.location.href = `/quote.html?services=${encodeURIComponent(selectedServices.join(','))}`;
    } else {
        alert("Please select at least one service to begin your booking.");
    }
});

// Clean URLs for Internal Links
window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => {
      history.replaceState(null, null, window.location.pathname);
    }, 10);
  }
});
