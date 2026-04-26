/*-----------------------------------*\
  #services-script.js
  JavaScript for services.html, adapting features from script.js
\*-----------------------------------*/

'use strict';

// 1. Back Navigation (Back to home index)
const backLink = document.querySelector("#header-back-btn");
const logoLink = document.querySelector("#header-logo");

if (backLink) {
  backLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "index.html"; // Adjust if your home page name is different
  });
}

if (logoLink) {
  logoLink.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "index.html";
  });
}



// 2. Card Flipping Logic (Same system as index.html packages section)
// Compact cards are used, so flip logic is applied to .work-card, which wraps .card-inner
const compactCards = document.querySelectorAll(".compact-card");

compactCards.forEach(card => {
  card.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevents multiple trigger clicks
    
    // Toggle flip on the main card container
    this.classList.toggle("flipped");
  });
});

// Flip-back buttons within the card
const backTriggers = document.querySelectorAll(".flip-back-link");

backTriggers.forEach(btn => {
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevents flipping the card again
    this.closest(".work-card").classList.remove("flipped");
  });
});



// 3. Search Bar Logic
const searchInput = document.querySelector("#service-search");
const allCards = Array.from(compactCards);
const formSection = document.querySelector("#quote-form-section");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    
    // Remove previous highlights
    allCards.forEach(card => card.querySelector(".card-front").classList.remove("highlight"));

    if (searchTerm === "") {
      // Empty search term, do nothing, no highlight required per rule except when not found.
      return;
    }

    // Try finding exact card match (or partially, accommodating errors)
    let matchedCard = allCards.find(card => card.dataset.service.toLowerCase().includes(searchTerm));

    if (!matchedCard) {
      // Exact match not found, highlight default (first) per rule
      matchedCard = allCards[0];
    }

    if (matchedCard) {
      // Scroll to card smoothly
      matchedCard.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      // Clear search and ensure any form is hidden when a card is selected.
      if (!formSection.classList.contains("hidden")) {
          // A search implies selecting a new service, not filling a previously selected.
          // Hide form section if open.
          hideForm();
      }
      
      // Flash highlight
      matchedCard.querySelector(".card-front").classList.add("highlight");
    }
  });
}



// 4. Reveal Form and Set Service Logic
const getQuoteBtns = document.querySelectorAll(".get-quote-btn");
const serviceInput = document.querySelector("#selected_service");

// Helper to Hide Form Section smooth transition
function hideForm() {
    formSection.style.height = 0 + "px";
    formSection.classList.add("hidden");
    // Also reset form.
    document.getElementById("actual-quote-form").reset();
    resetAddedServices();
}

getQuoteBtns.forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent card from flipping back if we click on back.
    
    // Get service name from card
    const card = this.closest(".compact-card");
    const serviceName = card.dataset.service;
    
    // Hide form before revealing it for a selected service to handle potential scroll jumping/errors.
    hideForm();
    
    // Set service in form input
    if (serviceInput) {
      serviceInput.value = serviceName;
    }

    // Reveal Form Section smooth transition
    formSection.classList.remove("hidden");
    const formContent = formSection.querySelector(".form-content");
    formSection.style.height = (formContent.scrollHeight + 120) + "px"; // Adding padding buffer for padding in formSection

    // Smoothly scroll down to form
    formSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});


// 5. Add More Services Logic
const addMoreLink = document.querySelector("#add-more-services-link");
const serviceList = document.querySelector("#full-service-list");

// Helper to populate service list in form. Reuse data from card titles.
function populateFormServiceList() {
    const availableServices = allCards.map(card => card.dataset.service);
    if (!serviceList) return;
    
    serviceList.innerHTML = ''; // Clear previous

    availableServices.forEach(service => {
        const li = document.createElement('li');
        li.className = 'service-list-item';
        li.innerHTML = `
            <span class="material-symbols-rounded">circle</span>
            <span class="service-list-item-name">${service}</span>
        `;
        
        li.addEventListener('click', function() {
            // Check if service is already selected (by checking against the main serviceInput)
            if (serviceInput.value.includes(service)) {
                // If it's already selected, clicking it can't unselect it here (based on request logic). It will add it multiple times.
                // Request states: "reveals a list of services". It doesn't state selection mechanic. 
                // A common pattern is adding selected to input.
                // Re-populate with new additions.
                serviceInput.value += ` & ${service}`;
            } else {
                 serviceInput.value += ` & ${service}`;
            }
            
            // Mark selected in list
            this.classList.add('selected');
        });
        
        serviceList.appendChild(li);
    });
}

// Reset added services list selection when form section is hidden.
function resetAddedServices() {
    if (!serviceList) return;
    const allFormListItems = Array.from(serviceList.querySelectorAll('.service-list-item'));
    allFormListItems.forEach(item => item.classList.remove('selected'));
}

// Initialize list population
if (serviceList) populateFormServiceList();

if (addMoreLink) {
  addMoreLink.addEventListener("click", function (e) {
    e.preventDefault();
    if (!serviceList) return;
    serviceList.classList.toggle("hidden");
  });
}
