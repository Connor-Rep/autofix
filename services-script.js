'use strict';

// 1. Navigation Logic
const backBtn = document.querySelector("#header-back-btn");
const logo = document.querySelector("#header-logo");

[backBtn, logo].forEach(el => {
    el?.addEventListener("click", (e) => {
        if (el.tagName === 'A') return;
        e.preventDefault();
        window.location.href = "index.html";
    });
});

// 2. Search Logic
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

// 3. Selection & Multi-Service Logic
const quoteSection = document.querySelector("#quote-form-section");
const serviceField = document.querySelector("#selected-service-field");
const gridSection = document.querySelector("#services-grid-section");

cards.forEach(card => {
    card.addEventListener("click", (e) => {
        // Only toggle flip if NOT clicking the "Get a Quote" button
        if (!e.target.closest('.get-quote-btn')) {
            card.classList.toggle("flipped");
        }
    });

    const quoteBtn = card.querySelector(".get-quote-btn");
    quoteBtn?.addEventListener("click", (e) => {
        e.stopPropagation(); 
        
        const serviceName = card.dataset.service;
        const currentVal = serviceField.value.trim();

        // If field has text, append with comma, otherwise just set it
        if (currentVal === "") {
            serviceField.value = serviceName;
        } else {
            // Only add if it's not already in the list
            if (!currentVal.includes(serviceName)) {
                serviceField.value = `${currentVal}, ${serviceName}`;
            }
        }

        // Reveal the section and scroll down
        quoteSection.classList.remove("hidden");
        setTimeout(() => {
            quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
    });
});

// 4. "Add More" Button Logic
const addMoreBtn = document.querySelector("#add-more-btn");
addMoreBtn?.addEventListener("click", () => {
    // Scroll the user back to the grid bubble
    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Optional: add a temporary highlight/pulse to the search area to show it's ready
    searchInput.focus();
});
