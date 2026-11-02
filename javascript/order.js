document.addEventListener("DOMContentLoaded", function () {
    "use strict";

const orderForm = document.getElementById("secureCheckoutForm");
const feedback = document.getElementById("checkoutFeedback");

if (!orderForm || !feedback) { return; }

const nameInput = document.getElementById("customerFullName");
const phoneInput = document.getElementById("customerPhone");
const productSelect = document.getElementById("itemSelection");
const addressBlock = document.getElementById("shippingAddressBlock");
const addressInput = document.getElementById("shippingAddress");

if (!nameInput || !phoneInput || !productSelect || !addressBlock || !addressInput) {
    console.error("Checkout form is missing required elements.");
    return;
}
    
const productPrices = {
    jeans: 600,
    tops: 150,
    sandals: 160
};
   
const deliveryPrices = {
    gauteng: 60,
    nationwide: 100,
    collect: 0
};

nameInput.addEventListener("input", function () {
    nameInput.classList.remove("input-error");
    nameInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

phoneInput.addEventListener("input", function () {
    phoneInput.classList.remove("input-error");
    phoneInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

productSelect.addEventListener("change", function () {
    productSelect.classList.remove("input-error");
    productSelect.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

addressInput.addEventListener("input", function () {
    addressInput.classList.remove("input-error");
    addressInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

function getDeliveryMethod() {
    const selected = orderForm.querySelector('input[name="deliveryMethod"]:checked');
    return selected ? selected.value : "";
}

function updateAddressVisibility() {
    const method = getDeliveryMethod();
    const needsAddress = (method === "gauteng" || method === "nationwide");

    if (addressBlock) {
        addressBlock.hidden = !needsAddress;
    }

if (addressInput) {
    addressInput.required = needsAddress;
    if (!needsAddress) {
    addressInput.value = "";
    addressInput.classList.remove("input-error");
    addressInput.removeAttribute("aria-invalid");
     }
    }
}
   
const deliveryRadios = orderForm.querySelectorAll('input[name="deliveryMethod"]');
deliveryRadios.forEach(function (radio) {
    radio.addEventListener("change", updateAddressVisibility);
});
    
updateAddressVisibility();
orderForm.addEventListener("submit", function (event) {
    event.preventDefault(); 
    nameInput.classList.remove("input-error");
    nameInput.removeAttribute("aria-invalid");
    phoneInput.classList.remove("input-error");
    phoneInput.removeAttribute("aria-invalid");
    productSelect.classList.remove("input-error");
    productSelect.removeAttribute("aria-invalid");
    addressInput.classList.remove("input-error");
    addressInput.removeAttribute("aria-invalid");
    feedback.className = "feedback-box";
    feedback.textContent = "";

       
const customerName = nameInput.value.trim();
const phone = phoneInput.value.trim();
const product = productSelect.value;
const deliveryMethod = getDeliveryMethod();

if (customerName.length < 2) {
    nameInput.classList.add("input-error");
    nameInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please correct the highlighted fields before continuing.";
    feedback.className = "feedback-box error-msg";
    nameInput.focus();
    return;
}

const phonePattern = /^(?:\+27|0)\d{9}$/;
const cleanedPhone = phone.replace(/[\s()-]/g, "");
if (!phonePattern.test(cleanedPhone)) {
    phoneInput.classList.add("input-error");
    phoneInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please correct the highlighted fields before continuing.";
    feedback.className = "feedback-box error-msg";
    phoneInput.focus();
    return;
}
if (!product || productPrices[product] === undefined) {
    productSelect.classList.add("input-error");
    productSelect.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please correct the highlighted fields before continuing.";
    feedback.className = "feedback-box error-msg";
    productSelect.focus();
        return;
    }

if (!deliveryMethod || deliveryPrices[deliveryMethod] === undefined) {
    feedback.textContent = "Please select a delivery method or click-and-collect option.";
    feedback.className = "feedback-box error-msg";
        return;
    }

const needsAddress = (deliveryMethod === "gauteng" || deliveryMethod === "nationwide");
if (needsAddress && !addressInput.value.trim()) {
    addressInput.classList.add("input-error");
    addressInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please correct the highlighted fields before continuing.";
    feedback.className = "feedback-box error-msg";
    addressInput.focus();
        return;
}

const productPrice = productPrices[product];
const deliveryPrice = deliveryPrices[deliveryMethod];
const total = productPrice + deliveryPrice;

const formattedTotal = "R" + Number(total).toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
     maximumFractionDigits: 2
});

let deliveryMessage = "";
if (deliveryMethod === "collect") {
        deliveryMessage = "Collection selected. No delivery fee applies.";
} else if (deliveryMethod === "gauteng") {
        deliveryMessage = "Gauteng delivery selected.";
    } else {
        deliveryMessage = "Nationwide delivery selected.";
    }

feedback.textContent = "Processing order profile asynchronously... please wait.";
feedback.className = "feedback-box loading-msg";

        
 Promise.resolve({ ok: true })
.then(function (response) {
    if (response.ok === true) {
        feedback.textContent = "Your details are valid! " + deliveryMessage + " Demonstration total: " + formattedTotal + ". Processed and transmitted asynchronously via AJAX logic simulation.";
        feedback.className = "feedback-box success-msg";
        orderForm.reset(); 
         updateAddressVisibility(); 
} else {
    throw new Error("Server communication failure.");
    }
})
.catch(function (error) {
    feedback.textContent = "Asynchronous checkout processing failed. Please try again later.";
    feedback.className = "feedback-box error-msg";
});
 });
});
