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
    // CHANGED: Point to "/" to keep the URL completely clean
    el?.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "/";
    });
});

// 1.5 Smooth Scrolling & Clean URLs for Internal Links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');

    if (targetId !== '#' && targetId.startsWith('#')) {
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Prevent the browser from adding # to the URL
        e.preventDefault();

        // Smooth scroll to the section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Close the mobile navbar if it's open
        const navbar = document.querySelector('[data-navbar]');
        const navToggler = document.querySelector('[data-nav-toggler]');
        if (navbar && navbar.classList.contains('active')) {
          navbar.classList.remove('active');
          navToggler.classList.remove('active');
        }
      }
    }
  });
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
