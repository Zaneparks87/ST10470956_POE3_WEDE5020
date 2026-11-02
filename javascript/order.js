document.addEventListener("DOMContentLoaded", function () {

    const orderForm = document.getElementById("secureCheckoutForm");
    const feedback = document.getElementById("checkoutFeedback");

    if (!orderForm || !feedback) {
        return;
    }

    const nameInput = document.getElementById("customerFullName");
const phoneInput = document.getElementById("customerPhone");
const productSelect = document.getElementById("itemSelection");
const addressBlock = document.getElementById("shippingAddressBlock");
const addressInput = document.getElementById("shippingAddress");

if (!nameInput || !phoneInput || !productSelect ||
    !addressBlock || !addressInput) {
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

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = "feedback-box " + type;
    }

    function markError(field) {
        field.classList.add("input-error");
        field.setAttribute("aria-invalid", "true");
    }

    function clearError(field) {
        field.classList.remove("input-error");
        field.removeAttribute("aria-invalid");
    }

    const fields = [
        nameInput,
        phoneInput,
        productSelect,
        addressInput
    ];

    fields.forEach(function (field) {
        if (!field) {
            return;
        }

        field.addEventListener("input", function () {
            clearError(field);
        });

        field.addEventListener("change", function () {
            clearError(field);
        });
    });

    function getDeliveryMethod() {
        const selected = orderForm.querySelector(
            'input[name="deliveryMethod"]:checked'
        );

        return selected ? selected.value : "";
    }
    function updateAddressVisibility() {
        const method = getDeliveryMethod();
        const needsAddress = method === "gauteng" ||
                             method === "nationwide";

        if (addressBlock) {
            addressBlock.hidden = !needsAddress;
        }

        if (addressInput) {
            addressInput.required = needsAddress;

            if (!needsAddress) {
                addressInput.value = "";
                clearError(addressInput);
            }
        }
    }
    orderForm.querySelectorAll(
        'input[name="deliveryMethod"]'
    ).forEach(function (radio) {
        radio.addEventListener("change", updateAddressVisibility);
    });

    updateAddressVisibility();

    orderForm.addEventListener("submit", function (event) {
        event.preventDefault();

        feedback.className = "feedback-box";
        feedback.textContent = "";

        fields.forEach(function (field) {
            if (field) {
                clearError(field);
            }
        });

        let valid = true;
        let firstInvalidField = null;

        function rejectField(field) {
            markError(field);
            valid = false;

            if (!firstInvalidField) {
                firstInvalidField = field;
            }
        }
        const customerName = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const product = productSelect.value;
        const deliveryMethod = getDeliveryMethod();

        if (customerName.length < 2) {
            rejectField(nameInput);
        }
        const phonePattern = /^(?:\+27|0)\d{9}$/;

        const cleanedPhone = phone.replace(/[\s()-]/g, "");

        if (!phonePattern.test(cleanedPhone)) {
            rejectField(phoneInput);
        }

        if (!product || productPrices[product] === undefined) {
            rejectField(productSelect);
        }

        if (!deliveryMethod ||
            deliveryPrices[deliveryMethod] === undefined) {

            showFeedback(
                "Please select a delivery method or click-and-collect option.",
                "error-msg"
            );

            return;
        }
        const needsAddress = deliveryMethod === "gauteng" ||
                             deliveryMethod === "nationwide";

        if (needsAddress && !addressInput.value.trim()) {
            rejectField(addressInput);
        }
        if (!valid) {
            showFeedback(
                "Please correct the highlighted fields before continuing.",
                "error-msg"
            );

            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;
        }
        const productPrice = productPrices[product];
        const deliveryPrice = deliveryPrices[deliveryMethod];
        const total = productPrice + deliveryPrice;

        const formattedTotal = new Intl.NumberFormat("en-ZA", {
            style: "currency",
            currency: "ZAR"
        }).format(total);

        let deliveryMessage = "";

        if (deliveryMethod === "collect") {
            deliveryMessage = "Collection selected. No delivery fee applies.";
        } else if (deliveryMethod === "gauteng") {
            deliveryMessage = "Gauteng delivery selected.";
        } else {
            deliveryMessage = "Nationwide delivery selected.";
        }
        showFeedback(
            "Your details are valid! " +
            deliveryMessage +
            " Demonstration total: " +
            formattedTotal +
            ". No order or payment has been processed.",
            "success-msg"
        );
    });

});
