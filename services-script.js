'use strict';

// 1. Navigation
const backBtn = document.querySelector("#header-back-btn");
const logo = document.querySelector("#header-logo");

[backBtn, logo].forEach(el => {
    el?.addEventListener("click", (e) => {
        if (el.tagName === 'A') return;
        e.preventDefault();
        window.location.href = "index.html";
    });
});

// 2. Search logic
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

    if (val && foundCount === 0) {
        searchStatus.textContent = "Not Found";
    } else {
        searchStatus.textContent = "";
    }
});

// 3. Reveal Form with Scroll
const quoteSection = document.querySelector("#quote-form-section");
const serviceField = document.querySelector("#selected-service-field");

cards.forEach(card => {
    card.addEventListener("click", (e) => {
        if (e.target.closest('.get-quote-btn')) return;
        card.classList.toggle("flipped");
    });

    const quoteBtn = card.querySelector(".get-quote-btn");
    quoteBtn?.addEventListener("click", (e) => {
        e.stopPropagation(); 
        
        serviceField.value = card.dataset.service;
        quoteSection.classList.remove("hidden");
        
        // Wait just a beat for the CSS slide animation to start before scrolling
        setTimeout(() => {
            quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
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
