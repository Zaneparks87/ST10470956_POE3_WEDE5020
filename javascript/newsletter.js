document.addEventListener("DOMContentLoaded", function () {
    "use strict";

const newsletterForm = document.getElementById("storeNewsletterform");
const emailInput = document.getElementById("SubscriberEmail");
const feedback = document.getElementById("newsletterFeedback");

if (!newsletterForm || !emailInput || !feedback) {
    return;
}

emailInput.addEventListener("input", function () {
    emailInput.classList.remove("input-error");
    emailInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();     
    emailInput.classList.remove("input-error");
    emailInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";

const email = emailInput.value.trim();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
    emailInput.classList.add("input-error");
    emailInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please enter a valid email address.";
    feedback.className = "feedback-box error-msg";
    emailInput.focus();
        return;
}
      
feedback.textContent = "Subscribing to newsletter asynchronously... please wait.";
feedback.className = "feedback-box loading-msg";

Promise.resolve({ ok: true })
.then(function (response) {
    if (response.ok === true) {
       feedback.textContent = "Thank you! You have been successfully subscribed to our newsletter asynchronously via AJAX simulation logic.";
       feedback.className = "feedback-box success-msg";
       newsletterForm.reset();
    } else {
        throw new Error("Server communication failure.");
    }
})
.catch(function (error) {
        feedback.textContent = "Asynchronous subscription failed. Please try again later.";
        feedback.className = "feedback-box error-msg";
     });
    });
});
