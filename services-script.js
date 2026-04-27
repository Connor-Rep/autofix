'use strict';

// 1. Navigation
const backBtn = document.querySelector("#header-back-btn");
const logo = document.querySelector("#header-logo");

[backBtn, logo].forEach(el => {
    el?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "index.html";
    });
});

// 2. Search & Highlight
const searchInput = document.querySelector("#service-search");
const cards = document.querySelectorAll(".card-item");

searchInput?.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    let found = false;

    cards.forEach(card => {
        card.classList.remove("highlight");
        const name = card.dataset.service.toLowerCase();
        
        if (val && name.includes(val)) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add("highlight");
            found = true;
        }
    });

    // Default highlight if nothing exact is found but search isn't empty
    if (val && !found) {
        cards[0].classList.add("highlight");
    }
});

// 3. Card Flip & Pull-out Form
const quoteSection = document.querySelector("#quote-form-section");
const serviceField = document.querySelector("#selected-service-field");

cards.forEach(card => {
    card.addEventListener("click", () => {
        // Toggle Flip
        card.classList.toggle("flipped");
    });

    const quoteBtn = card.querySelector(".get-quote-btn");
    quoteBtn?.addEventListener("click", (e) => {
        e.stopPropagation(); // Stop card from flipping back immediately
        
        // Fill Service Name
        serviceField.value = card.dataset.service;

        // Reveal Form (Pull out from bottom)
        quoteSection.classList.remove("hidden");
        
        setTimeout(() => {
            quoteSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
});

// 4. Add More Services
const addMoreBtn = document.querySelector("#add-more-btn");
addMoreBtn?.addEventListener("click", () => {
    // Logic to show/hide extra list or append text
    const current = serviceField.value;
    const newService = prompt("Add another service:");
    if (newService) {
        serviceField.value = `${current}, ${newService}`;
    }
});
