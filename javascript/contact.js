
document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const form = document.getElementById("catalogueInquiryForm");
    const feedback = document.getElementById("formFeedbackBox");

    if (!form || !feedback) {
        return;
    }

    const nameInput = document.getElementById("customerName");
    const emailInput = document.getElementById("customerEmail");
    const departmentInput = document.getElementById("targetCatalogue");
    const messageInput = document.getElementById("messageBody");

    const fields = [
        nameInput,
        emailInput,
        departmentInput,
        messageInput
    ];

    if (fields.some(function (field) {
        return !field;
    })) {
        console.error("Contact form error: One or more form fields are missing.");
        return;
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = "feedback-box " + type;
    }


    function clearError(input) {
        input.classList.remove("input-error");
        input.removeAttribute("aria-invalid");
    }

    
    function markError(input) {
        input.classList.add("input-error");
        input.setAttribute("aria-invalid", "true");
    }

    
    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            clearError(field);
        });

        field.addEventListener("change", function () {
            clearError(field);
        });
    });

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        fields.forEach(clearError);

        feedback.className = "feedback-box";
        feedback.textContent = "";

        let valid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const department = departmentInput.value;
        const message = messageInput.value.trim();

        
        if (name.length < 2) {
            markError(nameInput);
            valid = false;
        }

        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            markError(emailInput);
            valid = false;
        }

       
        if (department === "") {
            markError(departmentInput);
            valid = false;
        }

        if (message.length < 10) {
            markError(messageInput);
            valid = false;
        }

        if (!valid) {
            showFeedback(
                "Please check your details. Enter your name, a valid email address, select a department, and write a message of at least 10 characters.",
                "error-msg"
            );

            const firstInvalid = fields.find(function (field) {
                return field.classList.contains("input-error");
            });

            if (firstInvalid) {
                firstInvalid.focus();
            }

            return;
        }

        showFeedback(
            "Your details are valid! However, your message has not been sent because the message-processing service is not connected yet.",
            "loading-msg"
        );
    });
});
