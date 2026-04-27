'use strict';

// 1. References
const backBtn = document.querySelector("#header-back-btn");
const logo = document.querySelector("#header-logo");
const searchInput = document.querySelector("#service-search");
const searchStatus = document.querySelector("#search-status");
const cards = document.querySelectorAll(".card-item");
const quoteSection = document.querySelector("#quote-form-section");
const serviceField = document.querySelector("#selected-service-field");
const gridSection = document.querySelector("#services-grid-section");
const resetBtn = document.querySelector("#reset-form-btn");
const quoteForm = document.querySelector("#quote-form");

// 2. Navigation
[backBtn, logo].forEach(el => {
    el?.addEventListener("click", (e) => {
        if (el.tagName === 'A') return;
        e.preventDefault();
        window.location.href = "index.html";
    });
});

// 3. Search logic
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
    searchStatus.textContent = (val && foundCount === 0) ? "Not Found" : "";
});

// 4. Update Button Text Logic
function updateAllButtons(text) {
    cards.forEach(card => {
        const btnSpan = card.querySelector(".get-quote-btn .span");
        if (btnSpan) btnSpan.textContent = text;
    });
}

// 5. Card Selection & Multi-Service logic
cards.forEach(card => {
    card.addEventListener("click", (e) => {
        if (!e.target.closest('.get-quote-btn') && !card.classList.contains('selected')) {
            card.classList.toggle("flipped");
        }
    });

    const quoteBtn = card.querySelector(".get-quote-btn");
    quoteBtn?.addEventListener("click", (e) => {
        e.stopPropagation(); 
        
        const serviceName = card.dataset.service;
        const currentVal = serviceField.value.trim();

        // Grey out and disable this card
        card.classList.add("selected");
        card.classList.remove("flipped");

        // Append service
        if (currentVal === "" || currentVal === "No services selected") {
            serviceField.value = serviceName;
        } else {
            serviceField.value = `${currentVal}, ${serviceName}`;
        }

        // Change all other card buttons to "Add"
        updateAllButtons("Add");

        // Reveal and scroll
        quoteSection.classList.remove("hidden");
        setTimeout(() => {
            quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
    });
});

// 6. "Add More" Button
document.querySelector("#add-more-btn")?.addEventListener("click", () => {
    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// 7. Reset Logic
resetBtn?.addEventListener("click", () => {
    // 1. Reset form fields
    quoteForm.reset();
    serviceField.value = "";
    
    // 2. Hide form
    quoteSection.classList.add("hidden");

    // 3. Reset cards state
    cards.forEach(card => {
        card.classList.remove("selected", "flipped", "highlight");
        const btnSpan = card.querySelector(".get-quote-btn .span");
        if (btnSpan) btnSpan.textContent = "Get a Quote";
    });

    // 4. Scroll back up to grid
    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
