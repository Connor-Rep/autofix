'use strict';

const searchInput = document.querySelector("#service-search");
const cards = document.querySelectorAll(".card-item");
const quoteSection = document.querySelector("#quote-form-section");
const serviceField = document.querySelector("#selected-service-field");
const gridSection = document.querySelector("#services-grid-section");
const resetBtn = document.querySelector("#reset-form-btn");
const quoteForm = document.querySelector("#quote-form");

// 1. Navigation
document.querySelectorAll("#header-back-btn, #header-logo").forEach(el => {
    el?.addEventListener("click", () => window.location.href = "index.html");
});

// 2. Search
searchInput?.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    cards.forEach(card => {
        card.classList.remove("highlight");
        if (val && card.dataset.service.toLowerCase().includes(val)) {
            card.classList.add("highlight");
        }
    });
});

// 3. Selection Logic
function updateButtons(text) {
    cards.forEach(c => {
        const span = c.querySelector(".get-quote-btn .span");
        if (span) span.textContent = text;
    });
}

cards.forEach(card => {
    card.addEventListener("click", (e) => {
        if (!e.target.closest('.get-quote-btn') && !card.classList.contains('selected')) {
            card.classList.toggle("flipped");
        }
    });

    card.querySelector(".get-quote-btn")?.addEventListener("click", (e) => {
        e.stopPropagation(); 
        const name = card.dataset.service;
        const current = serviceField.value.trim();

        card.classList.add("selected");
        card.classList.remove("flipped");

        if (current === "" || current === "No services selected") {
            serviceField.value = name;
        } else if (!current.includes(name)) {
            serviceField.value = `${current}, ${name}`;
        }

        updateButtons("Add");
        quoteSection.classList.remove("hidden");
        setTimeout(() => quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 200);
    });
});

// 4. Buttons
document.querySelector("#add-more-btn")?.addEventListener("click", () => {
    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

resetBtn?.addEventListener("click", () => {
    quoteForm.reset();
    serviceField.value = "";
    quoteSection.classList.add("hidden");
    cards.forEach(c => {
        c.classList.remove("selected", "flipped", "highlight");
        const span = c.querySelector(".get-quote-btn .span");
        if (span) span.textContent = "Get a Quote";
    });
    gridSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});
