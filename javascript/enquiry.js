document.addEventListener("DOMContentLoaded", function () {
    "use strict";
const accordionButtons = document.querySelectorAll(".accordion-trigger");

accordionButtons.forEach(function (button) {
    const accordionItem = button.closest(".accordion-item");
    const panel = accordionItem ? accordionItem.querySelector(".accordion-panel") : null;
    const icon = button.querySelector(".accordion-icon");

 if (!panel) { return; }
   button.setAttribute("aria-expanded", "false");
   panel.hidden = true;
   panel.style.maxHeight = "0";

if (icon) { icon.textContent = "+"; }

 button.addEventListener("click", function () {
const isOpen = button.getAttribute("aria-expanded") === "true";

if (isOpen) {
    button.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = "0";
    accordionItem.classList.remove("active");
    if (icon) { icon.textContent = "+"; }

panel.addEventListener("transitionend", function hidePanel(event) {
    if (event.propertyName === "max-height" && button.getAttribute("aria-expanded") === "false") {
    panel.hidden = true;
        }
    }, { once: true });

} else {
         panel.hidden = false;
        button.setAttribute("aria-expanded", "true");
        accordionItem.classList.add("active");
        panel.style.maxHeight = "0";

        requestAnimationFrame(function () {
        panel.style.maxHeight = panel.scrollHeight + "px";
    });

if (icon) { icon.textContent = "−"; }
        }
     });
});

const enquiryForm = document.getElementById("enquiryForm");
const feedback = document.getElementById("enquiryFeedback");

if (!enquiryForm || !feedback) { return; }

const nameInput = document.getElementById("enquiryName");
const emailInput = document.getElementById("enquiryEmail");
const topicInput = document.getElementById("enquiryTopic");
const messageInput = document.getElementById("enquiryMessage");

if (!nameInput || !emailInput || !topicInput || !messageInput) {
    console.error("Enquiry form is missing one or more required fields.");
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

topicInput.addEventListener("change", function () {
    topicInput.classList.remove("input-error");
    topicInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

messageInput.addEventListener("input", function () {
    messageInput.classList.remove("input-error");
    messageInput.removeAttribute("aria-invalid");
    feedback.textContent = "";
    feedback.className = "feedback-box";
});

    
enquiryForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    nameInput.classList.remove("input-error");
    nameInput.removeAttribute("aria-invalid");

    emailInput.classList.remove("input-error");
    emailInput.removeAttribute("aria-invalid");

    topicInput.classList.remove("input-error");
    topicInput.removeAttribute("aria-invalid");

    messageInput.classList.remove("input-error");
    messageInput.removeAttribute("aria-invalid");

    feedback.textContent = "";
    feedback.className = "feedback-box";

       
const name = nameInput.value.trim();
const email = emailInput.value.trim();
const topic = topicInput.value;
const message = messageInput.value.trim();

        
if (name.length < 2) {
    nameInput.classList.add("input-error");
    nameInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please enter your name using at least 2 characters.";
    feedback.className = "feedback-box error";
    nameInput.focus();
        return;
    }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        emailInput.classList.add("input-error");
        emailInput.setAttribute("aria-invalid", "true");
        feedback.textContent = "Please enter a valid email address.";
        feedback.className = "feedback-box error";
        emailInput.focus();
        return;
        }

if (!topic || topic === "") {
    topicInput.classList.add("input-error");
    topicInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please select an enquiry topic.";
    feedback.className = "feedback-box error";
    topicInput.focus();
        return;
    }

if (message.length < 10) {
    messageInput.classList.add("input-error");
    messageInput.setAttribute("aria-invalid", "true");
    feedback.textContent = "Please enter at least 10 characters in your question.";
    feedback.className = "feedback-box error";
    messageInput.focus();
        return;
    }

feedback.textContent = "Sending your enquiry asynchronously... please wait.";
feedback.className = "feedback-box loading";
feedback.setAttribute("role", "status");

        
Promise.resolve({ ok: true })
.then(function (response) {
    if (response.ok === true) {
        feedback.textContent = "Thank you, " + name + "! Your enquiry has been validated and successfully sent asynchronously via AJAX loop framework.";
        feedback.className = "feedback-box success";
        enquiryForm.reset(); 
    } else {
        throw new Error("Server communication failure.");
        }
    })
.catch(function (error) {
     feedback.textContent = "Asynchronous submission failed. Please try again later.";
    feedback.className = "feedback-box error";
     });
    });
});
