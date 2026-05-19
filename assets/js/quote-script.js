'use strict';

// 1. Mobile Menu Logic (Global)
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
navToggler?.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

// 2. Fetch memory and UI elements
let quoteCart = [];
try {
    const stored = localStorage.getItem('safetay_cart');
    if (stored) {
        quoteCart = JSON.parse(stored);
        if (!Array.isArray(quoteCart)) quoteCart = [];
    }
} catch (e) {
    quoteCart = [];
}

const summaryList = document.getElementById("summary-list");
const emptyState = document.getElementById("summary-empty-state");
const cartBadge = document.getElementById("cart-count");
const submitBtn = document.querySelector(".submit-btn");
// NEW: Actually defining the Add More button so it doesn't crash!
const addMoreBtn = document.getElementById("add-more-services-btn"); 

// 3. Render the Summary List
function renderSummary() {
    // Update Badge
    if (cartBadge) cartBadge.innerText = quoteCart.length;

    // Clear current list
    summaryList.innerHTML = "";

    if (quoteCart.length === 0) {
        emptyState.style.display = "block";
        submitBtn.style.opacity = "0.5";
        submitBtn.style.pointerEvents = "none"; 
        submitBtn.innerHTML = "Basket Empty";
        if (addMoreBtn) addMoreBtn.style.display = "none"; // Hides the button
        return;
    }

    // --- ROGUE BRACKET REMOVED FROM HERE ---
    
    emptyState.style.display = "none";
    if (addMoreBtn) addMoreBtn.style.display = "flex"; // Shows the button
    submitBtn.style.opacity = "1";
    submitBtn.style.pointerEvents = "all";
    submitBtn.innerHTML = `<span class="span">Submit Request</span><span class="material-symbols-rounded">send</span>`;

    // Create a visual row for every item in memory
    quoteCart.forEach(service => {
        const li = document.createElement("li");
        li.className = "summary-item";
        
        li.innerHTML = `
            <span class="item-name">${service}</span>
            <button class="remove-item-btn" data-service="${service}" title="Remove">
                <span class="material-symbols-rounded">delete</span>
            </button>
        `;
        summaryList.appendChild(li);
    });

    // Attach click events to the new trash cans
    document.querySelectorAll(".remove-item-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const serviceToRemove = e.currentTarget.dataset.service;
            // Remove from array
            quoteCart = quoteCart.filter(s => s !== serviceToRemove);
            // Save back to memory
            localStorage.setItem('safetay_cart', JSON.stringify(quoteCart));
            // Re-draw the list
            renderSummary();
        });
    });
}

// 4. Handle the Form Submission
const quoteForm = document.getElementById("quote-form");
quoteForm?.addEventListener("submit", (e) => {
    e.preventDefault(); // Stops the page from refreshing immediately
    
    // Check if cart is empty just in case
    if (quoteCart.length === 0) return;

    // Simulate success
    submitBtn.innerHTML = "Sending...";
    
    setTimeout(() => {
        alert("Quote Request Sent Successfully! We will contact you shortly.");
        // Wipe the memory clean
        localStorage.removeItem('safetay_cart');
        // Send them back home
        window.location.href = "/";
    }, 1500);
});

// 5. Add More Services Click
addMoreBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "/services.html"; // Takes them back to shop!
});

// Run immediately
renderSummary();
