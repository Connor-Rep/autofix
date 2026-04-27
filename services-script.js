'use strict';

/**
 * SEARCH & HIGHLIGHT LOGIC
 */
const searchInput = document.querySelector("#service-search");
const serviceCards = document.querySelectorAll(".service-item");
const scrollContainer = document.querySelector(".scroll-wrapper");

searchInput?.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    
    serviceCards.forEach(card => {
        card.classList.remove("highlight");
        const title = card.dataset.service.toLowerCase();

        if (term && title.includes(term)) {
            // Scroll the horizontal container to the card
            const offsetLeft = card.offsetLeft - scrollContainer.offsetLeft;
            scrollContainer.scrollTo({ left: offsetLeft, behavior: 'smooth' });
            card.classList.add("highlight");
        }
    });
});

/**
 * CARD FLIP & PULL-OUT FORM
 */
const formWindow = document.querySelector(".form-window");
const formContent = document.querySelector("#quote-form-content");
const serviceInput = document.querySelector("#selected-service");

serviceCards.forEach(card => {
    // Flip card on click
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");
    });

    // Handle "Get a Quote" click
    const btn = card.querySelector(".quote-trigger");
    btn?.addEventListener("click", (e) => {
        e.stopPropagation(); // Don't flip the card back immediately
        
        serviceInput.value = card.dataset.service;
        
        // "Pull out" animation logic
        formWindow.classList.add("active");
        formWindow.style.height = formContent.scrollHeight + 40 + "px";
        
        setTimeout(() => {
            formWindow.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    });
});

/**
 * ADD MORE SERVICES TOGGLE
 */
const addMoreBtn = document.querySelector("#add-more-services");
const extraList = document.querySelector("#extra-services-list");

addMoreBtn?.addEventListener("click", () => {
    extraList.classList.toggle("show");
    // Re-calculate height for the "pull-out" container
    formWindow.style.height = formContent.scrollHeight + 40 + "px";
});
