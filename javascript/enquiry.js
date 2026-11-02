document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const accordionButtons = document.querySelectorAll(".accordion-trigger");

    accordionButtons.forEach(function (button) {
        const accordionItem = button.closest(".accordion-item");
        const panel = accordionItem
            ? accordionItem.querySelector(".accordion-panel")
            : null;
        const icon = button.querySelector(".accordion-icon");

        if (!panel) {
            return;
        }
        button.setAttribute("aria-expanded", "false");
        panel.hidden = true;
        panel.style.maxHeight = "0";

        if (icon) {
            icon.textContent = "+";
        }

        button.addEventListener("click", function () {
            const isOpen = button.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                button.setAttribute("aria-expanded", "false");
                panel.style.maxHeight = "0";
                accordionItem.classList.remove("active");

                if (icon) {
                    icon.textContent = "+";
                }

                panel.addEventListener("transitionend", function hidePanel(event) {
                    if (event.propertyName === "max-height" &&
                        button.getAttribute("aria-expanded") === "false") {
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

                if (icon) {
                    icon.textContent = "−";
                }
            }
        });
    });
  
    const enquiryForm = document.getElementById("enquiryForm");
    const feedback = document.getElementById("enquiryFeedback");

    if (!enquiryForm || !feedback) {
        return;
    }

    const nameInput = document.getElementById("enquiryName");
    const emailInput = document.getElementById("enquiryEmail");
    const topicInput = document.getElementById("enquiryTopic");
    const messageInput = document.getElementById("enquiryMessage");

    if (!nameInput || !emailInput || !topicInput || !messageInput) {
        console.error("Enquiry form is missing one or more required fields.");
        return;
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = "feedback-box " + type;
        feedback.setAttribute("role", "status");
    }

    function clearFieldError(input) {
        input.classList.remove("input-error");
        input.removeAttribute("aria-invalid");
    }

    function markFieldError(input, message) {
        input.classList.add("input-error");
        input.setAttribute("aria-invalid", "true");
        showFeedback(message, "error");
        input.focus();
    }

    const fields = [
        nameInput,
        emailInput,
        topicInput,
        messageInput
    ];

    fields.forEach(function (input) {
        input.addEventListener("input", function () {
            clearFieldError(input);
            feedback.textContent = "";
            feedback.className = "feedback-box";
        });

        input.addEventListener("change", function () {
            clearFieldError(input);
        });
    });

    enquiryForm.addEventListener("submit", function (event) {
        event.preventDefault();

        fields.forEach(clearFieldError);
        feedback.textContent = "";
        feedback.className = "feedback-box";

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const topic = topicInput.value;
        const message = messageInput.value.trim();

        
        if (name.length < 10) {
            markFieldError(
                nameInput,
                "Please enter your name using at least 10 characters."
            );
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            markFieldError(
                emailInput,
                "Please enter a valid email address."
            );
            return;
        }

        if (!topic) {
            markFieldError(
                topicInput,
                "Please select an enquiry topic."
            );
            return;
        }

        if (message.length < 10) {
            markFieldError(
                messageInput,
                "Please enter at least 10 characters in your question."
            );
            return;
        }

        showFeedback(
            "Thank you, " + name +
            "! Your enquiry has been validated successfully. " +
            "However, it has not been sent because the enquiry-processing service is not connected yet.",
            "success"
        );

    });
});
