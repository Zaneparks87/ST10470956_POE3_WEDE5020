document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));

    const cards = $$(".card");
    const sections = $$(".department");
    const search = $("#search");
    const sort = $("#sort");
    const count = $("#count");
    const title = $("#viewTitle");
    const empty = $("#empty");
    const overlay = $("#cartOverlay");
    const cartItems = $("#cartItems");
    const cartCount = $("#cartCount");
    const cartTotal = $("#cartTotal");
    const openCartButton = $("#openCart");
    const closeCartButton = $("#closeCart");
    const continueButton = $("#continueShopping");

    const required = [
        search,
        sort,
        count,
        title,
        empty,
        overlay,
        cartItems,
        cartCount,
        cartTotal,
        openCartButton,
        closeCartButton,
        continueButton
    ];

    if (required.some(element => !element) || !cards.length) {
        console.error(
            "Catalogue JavaScript could not start. Check that the required HTML IDs and .card elements exist."
        );
        return;
    }

    const originalOrder = new Map(
        cards.map((card, index) => [card, index])
    );

    let activeDepartment = "all";
    let cart = {};

    const CART_STORAGE_KEY = "zphPreviewCart";

    try {
        const saved = JSON.parse(
            localStorage.getItem(CART_STORAGE_KEY) || "{}"
        );

        if (
            saved &&
            typeof saved === "object" &&
            !Array.isArray(saved)
        ) {
            Object.entries(saved).forEach(([key, item]) => {
                if (
                    !item ||
                    typeof item.name !== "string" ||
                    !Number.isFinite(Number(item.price)) ||
                    !Number.isFinite(Number(item.qty)) ||
                    Number(item.qty) <= 0
                ) {
                    return;
                }
                const name = item.name;
                const colour =
                    typeof item.colour === "string"
                        ? item.colour
                        : "";

                const id = makeCartId(name, colour);
                cart[id] = {
                    id,
                    name,
                    price: Number(item.price),
                    qty: Math.floor(Number(item.qty)),
                    colour
                };
            });
        }
    } catch (error) {
        console.warn(
            "Saved cart could not be read. Starting with an empty cart.",
            error
        );
    }

    const money = value =>
        "R" + Number(value).toLocaleString("en-ZA");

    function makeCartId(name, colour = "") {
        return JSON.stringify([name, colour]);
    }

    function updateProducts() {
        const term = search.value.trim().toLowerCase();
        let visible = 0;

        cards.forEach(card => {
            const name = (
                card.dataset.name ||
                $("h3", card)?.textContent ||
                ""
            ).toLowerCase();

            const description = (
                $(".desc", card)?.textContent || ""
            ).toLowerCase();

            const show =
                (
                    activeDepartment === "all" ||
                    card.dataset.dept === activeDepartment
                ) &&
                (
                    name.includes(term) ||
                    description.includes(term)
                );

            card.hidden = !show;

            if (show) visible++;
        });

        sections.forEach(section => {
            section.hidden = !$$(".card", section).some(
                card => !card.hidden
            );
        });

        count.textContent =
            `${visible} ${visible === 1 ? "product" : "products"}`;

        empty.style.display = visible ? "none" : "block";

        title.textContent =
            activeDepartment === "all"
                ? "Browse All Products"
                : (
             $(
               `[data-section="${activeDepartment}"] .section-title h2`
                    )?.textContent || "Browse Products"
                );
    }

    function jumpToDepartment(department) {
        activeDepartment = department;

        $$(".dept").forEach(button => {
            const active = button.dataset.jump === department;

            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        updateProducts();

        if (department === "all") {
            $("#top")?.scrollIntoView({
                behavior: "smooth"
            });
        } else {
            $("#" + department)?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }

    function sortProducts() {
        $$(".grid").forEach(grid => {
            const items = $$(".card", grid);

            items.sort((a, b) => {
                const aPrice = Number(a.dataset.price) || 0;
                const bPrice = Number(b.dataset.price) || 0;

                if (sort.value === "low") {
                    return aPrice - bPrice;
                }

                if (sort.value === "high") {
                    return bPrice - aPrice;
                }

                return originalOrder.get(a) - originalOrder.get(b);
            });

            items.forEach(item => grid.appendChild(item));
        });
    }

    function saveCart() {
        try {
            localStorage.setItem(
                CART_STORAGE_KEY,
                JSON.stringify(cart)
            );
        } catch (error) {
            console.warn(
                "Cart could not be saved in this browser.",
                error
            );
        }
    }

    function renderCart() {
        const items = Object.values(cart);

        cartCount.textContent = items.reduce(
            (sum, item) => sum + item.qty,
            0
        );

        cartItems.replaceChildren();

        if (!items.length) {
            const message = document.createElement("p");

            message.textContent =
                "Your cart is empty. Add a product to get started.";

            message.style.color = "var(--muted)";
            cartItems.appendChild(message);
        } else {
            items.forEach(item => {
                const row = document.createElement("div");

                row.style.cssText =
                    "display:grid;grid-template-columns:1fr auto;" +
                    "gap:10px;padding:14px 0;" +
                    "border-bottom:1px solid var(--line)";

                const details = document.createElement("div");

                const name = document.createElement("strong");
                name.textContent = item.name;

                const price = document.createElement("p");
                price.textContent = money(item.price) + " each";
                price.style.color = "var(--muted)";
                price.style.margin = "6px 0";

                details.append(name, price);

                if (item.colour) {
                    const colour = document.createElement("p");

                    colour.textContent = "Colour: " + item.colour;
                    colour.style.cssText =
                        "font-size:13px;margin:4px 0;color:var(--muted)";

                    details.appendChild(colour);
                }

                const controls = document.createElement("div");

                controls.style.cssText =
                    "display:flex;align-items:center;gap:8px;margin-top:9px";

                const minus = document.createElement("button");
                minus.type = "button";
                minus.textContent = "−";
                minus.dataset.qty = item.id;
                minus.dataset.change = "-1";
                minus.setAttribute(
                    "aria-label",
                    "Decrease " + item.name + " quantity"
                );

                const quantity = document.createElement("span");
                quantity.textContent = item.qty;
                quantity.setAttribute("aria-label", "Quantity");

                const plus = document.createElement("button");
                plus.type = "button";
                plus.textContent = "+";
                plus.dataset.qty = item.id;
                plus.dataset.change = "1";
                plus.setAttribute(
                    "aria-label",
                    "Increase " + item.name + " quantity"
                );

                const remove = document.createElement("button");
                remove.type = "button";
                remove.textContent = "Remove";
                remove.dataset.remove = item.id;
                remove.style.cssText =
                    "margin-left:8px;border:0;background:none;" +
                    "color:#8a3d2b;text-decoration:underline";

                controls.append(minus, quantity, plus, remove);
                details.appendChild(controls);

                const subtotal = document.createElement("strong");
                subtotal.textContent = money(item.price * item.qty);

                row.append(details, subtotal);
                cartItems.appendChild(row);
            });
        }

        cartTotal.textContent = money(
            items.reduce(
                (sum, item) => sum + item.price * item.qty,
                0
            )
        );

        saveCart();
    }

    function openCart() {
        overlay.hidden = false;
        overlay.style.display = "flex";

        renderCart();
        closeCartButton.focus();
    }

    function closeCart() {
        overlay.hidden = true;
        overlay.style.display = "none";

        openCartButton.focus();
    }

    const lightbox = document.createElement("div");

    lightbox.id = "productLightbox";
    lightbox.hidden = true;
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Product image preview");

    lightbox.style.cssText =
        "position:fixed;inset:0;z-index:150;" +
        "background:rgba(20,15,10,.88);display:none;" +
        "align-items:center;justify-content:center;padding:24px";

    const lightboxBox = document.createElement("div");

    lightboxBox.style.cssText =
        "position:relative;max-width:95vw;max-height:90vh;text-align:center";

    const preview = document.createElement("img");

    preview.style.cssText =
        "display:block;max-width:100%;max-height:78vh;" +
        "object-fit:contain;background:white;border-radius:8px";

    const caption = document.createElement("p");
    caption.style.color = "white";

    const closeLightboxButton = document.createElement("button");

    closeLightboxButton.type = "button";
    closeLightboxButton.textContent = "×";
    closeLightboxButton.setAttribute(
        "aria-label",
        "Close image preview"
    );

    closeLightboxButton.style.cssText =
        "position:absolute;right:-12px;top:-16px;" +
        "width:42px;height:42px;border:0;border-radius:50%;" +
        "font-size:28px;background:white;color:var(--brown);cursor:pointer";

    lightboxBox.append(
        closeLightboxButton,
        preview,
        caption
    );

    lightbox.appendChild(lightboxBox);
    document.body.appendChild(lightbox);

    let lastImage = null;

    function closeLightbox() {
        lightbox.hidden = true;
        lightbox.style.display = "none";
        preview.removeAttribute("src");

        lastImage?.focus();
    }

    $$(".art img").forEach(img => {
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute(
            "aria-label",
            "Enlarge image: " + (img.alt || "Product image")
        );

        img.style.cursor = "zoom-in";

        const show = () => {
            if (!img.complete || !img.naturalWidth) return;

            lastImage = img;
            preview.src = img.src;
            preview.alt = img.alt;
            caption.textContent = img.alt;

            lightbox.hidden = false;
            lightbox.style.display = "flex";

            closeLightboxButton.focus();
        };

        img.addEventListener("click", show);

        img.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                show();
            }
        });
    });

    $$("[data-jump]").forEach(button => {
        button.addEventListener("click", () => {
            jumpToDepartment(button.dataset.jump);
        });
    });

    search.addEventListener("input", updateProducts);

    sort.addEventListener("change", () => {
        sortProducts();
        updateProducts();
    });

    $$(".add").forEach(button => {
        button.addEventListener("click", () => {
            const card = button.closest(".card");

            if (!card) return;

            const name =
                card.dataset.name ||
                $("h3", card)?.textContent.trim();

            const price = Number(card.dataset.price);

            if (
                !name ||
                !Number.isFinite(price) ||
                price < 0
            ) {
                console.error(
                    "Product is missing a name or valid price.",
                    card
                );
                return;
            }

            const colourSelect = $(".color-select", card);

            const colour = colourSelect
                ? colourSelect.value
                : "";

            const id = makeCartId(name, colour);

            if (!cart[id]) {
                cart[id] = {
                    id,
                    name,
                    price,
                    qty: 0,
                    colour
                };
            }

            cart[id].qty++;

            renderCart();

            const oldText = button.textContent;

            button.textContent = "Added!";
            button.disabled = true;

            setTimeout(() => {
                button.textContent = oldText;
                button.disabled = false;
            }, 900);
        });
    });

    cartItems.addEventListener("click", event => {
        const button = event.target.closest("button");

        if (!button) return;

        if (button.dataset.qty) {
            const item = cart[button.dataset.qty];

            if (item) {
                item.qty += Number(button.dataset.change);

                if (item.qty <= 0) {
                    delete cart[button.dataset.qty];
                }
            }
        } else if (button.dataset.remove) {
            delete cart[button.dataset.remove];
        }

        renderCart();
    });

    openCartButton.addEventListener("click", openCart);
    closeCartButton.addEventListener("click", closeCart);
    continueButton.addEventListener("click", closeCart);

    overlay.addEventListener("click", event => {
        if (event.target === overlay) {
            closeCart();
        }
    });

    closeLightboxButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            if (!lightbox.hidden) {
                closeLightbox();
            } else if (!overlay.hidden) {
                closeCart();
            }
        }
    });

    renderCart();
    sortProducts();
    updateProducts();
});
