'use strict';

// 1. Navigation
const backBtn = document.querySelector("#header-back-btn");
const logo = document.querySelector("#header-logo");

[backBtn, logo].forEach(el => {
    el?.addEventListener("click", (e) => {
        if (el.tagName === 'A') return; // Allow normal link behavior for <a>
        e.preventDefault();
        window.location.href = "index.html";
    });
});

// 2. Search & Highlight Logic
const searchInput = document.querySelector("#service-search");
const searchStatus = document.querySelector("#search-status");
const cards = document.querySelectorAll(".card-item");

searchInput?.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    let foundCount = 0;

    cards.forEach(card => {
        card.classList.remove("highlight");
        const name = card.dataset.service.toLowerCase();
        
        if (val && name.includes(val)) {
            card.classList.add("highlight");
            foundCount++;
        }
    });

    // Show "Not Found" message if text exists but matches don't
    if (val && foundCount === 0) {
        searchStatus.textContent = "Not Found";
    } else {
        searchStatus.textContent = "";
    }
});

// 3. Card Flip & Quote Form Reveal
const quoteSection = document.querySelector("#quote-form-section");
const serviceField = document.querySelector("#selected-service-field");

cards.forEach(card => {
    card.addEventListener("click", (e) => {
        // Prevent flip if clicking a button inside the card
        if (e.target.closest('.get-quote-btn')) return;
        card.classList.toggle("flipped");
    });

    const quoteBtn = card.querySelector(".get-quote-btn");
    quoteBtn?.addEventListener("click", (e) => {
        e.stopPropagation(); 
        
        // Populate service field
        serviceField.value = card.dataset.service;

        // Reveal Form
        quoteSection.classList.remove("hidden");
        
        // Smooth scroll to form
        setTimeout(() => {
            quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });
});

// 4. Add Multiple Services
const addMoreBtn = document.querySelector("#add-more-btn");
addMoreBtn?.addEventListener("click", () => {
    const current = serviceField.value;
    const newService = prompt("Enter additional service needed:");
    if (newService && newService.trim() !== "") {
        serviceField.value = current ? `${current}, ${newService}` : newService;
    }
});
