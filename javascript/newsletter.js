document.addEventListener("DOMContentLoaded", function () {
    const newsletterForm = document.getElementById("storeNewsletterform");
    const emailInput = document.getElementById("SubscriberEmail");
    const feedback = document.getElementById("newsletterFeedback");

    if (!newsletterForm || !emailInput || !feedback) {
        return;
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = "feedback-box " + type;
    }

    function clearError() {
        emailInput.classList.remove("input-error");
        emailInput.removeAttribute("aria-invalid");
    }


    emailInput.addEventListener("input", function () {
        clearError();
        feedback.className = "feedback-box";
        feedback.textContent = "";
    });

    
    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearError();
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            emailInput.classList.add("input-error");
            emailInput.setAttribute("aria-invalid", "true");

            showFeedback("Please enter a valid email address.","error-msg");

            emailInput.focus();
            return;
        }

        showFeedback(
    "Your email address is valid, but the newsletter service is not connected yet. You have not been subscribed.",
    "loading-msg"
);
        clearError();
    });
});
