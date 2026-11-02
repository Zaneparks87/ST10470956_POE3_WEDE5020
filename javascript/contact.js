document.addEventListener("DOMContentLoaded", function () {
    "use strict";

const form = document.getElementById("catalogueInquiryForm");
const feedback = document.getElementById("formFeedbackBox");

if (!form || !feedback) { return; }

const nameInput = document.getElementById("customerName");
const emailInput = document.getElementById("customerEmail");
const departmentInput = document.getElementById("targetCatalogue");
const messageInput = document.getElementById("messageBody");

if (!nameInput || !emailInput || !departmentInput || !messageInput) {
    console.error("Contact form error: One or more form fields are missing.");
    return;
    }

nameInput.addEventListener("input", function () {
    nameInput.classList.remove("input-error");
    nameInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

emailInput.addEventListener("input", function () {
    emailInput.classList.remove("input-error");
    emailInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

departmentInput.addEventListener("change", function () {
    departmentInput.classList.remove("input-error");
    departmentInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
    });

messageInput.addEventListener("input", function () {
    messageInput.classList.remove("input-error");
    messageInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
    });

    
form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    nameInput.classList.remove("input-error");
    nameInput.removeAttribute("aria-invalid");

    emailInput.classList.remove("input-error");
    emailInput.removeAttribute("aria-invalid");

    departmentInput.classList.remove("input-error");
    departmentInput.removeAttribute("aria-invalid");

    messageInput.classList.remove("input-error");
    messageInput.removeAttribute("aria-invalid");

    feedback.textContent = "";
    feedback.className = "feedback-box";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const department = departmentInput.value;
    const message = messageInput.value.trim();

if (name.length < 2) {
    nameInput.classList.add("input-error");
    nameInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please enter your name using at least 2 characters.";
    feedback.className = "feedback-box error-msg";
    nameInput.focus();
        return;
    }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailInput.classList.add("input-error");
        emailInput.setAttribute("aria-invalid", "true");
        feedback.textContent = "Please enter a valid email address.";
        feedback.className = "feedback-box error-msg";
        emailInput.focus();
        return;
    }

if (department === "" || !department) {
    departmentInput.classList.add("input-error");
    departmentInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please select a department option.";
    feedback.className = "feedback-box error-msg";
    departmentInput.focus();
        return;
    }

if (message.length < 10) {
    messageInput.classList.add("input-error");
    messageInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please write a message of at least 10 characters.";
    feedback.className = "feedback-box error-msg";
    messageInput.focus();
        return;
    }

feedback.textContent = "Sending your message asynchronously... please wait.";
    feedback.className = "feedback-box loading-msg";

        
Promise.resolve({ ok: true })
    .then(function (response) {
        if (response.ok === true) {
            feedback.textContent = "Your details are valid! Your message has been successfully processed and transmitted asynchronously via AJAX logic simulation.";
            feedback.className = "feedback-box success-msg";
            form.reset(); 
        } else {
            throw new Error("Server communication failure.");
        }
    })
.catch(function (error) {
        feedback.textContent = "Asynchronous submission failed. Please try again later.";
        feedback.className = "feedback-box error-msg";
    });
});
});
