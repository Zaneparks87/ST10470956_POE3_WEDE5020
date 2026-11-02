document.addEventListener("DOMContentLoaded", function () {
    "use strict";

const search = document.getElementById("search");
const sort = document.getElementById("sort");
const count = document.getElementById("count");
const title = document.getElementById("viewTitle");
const empty = document.getElementById("empty");
const overlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const openCartButton = document.getElementById("openCart");
const closeCartButton = document.getElementById("closeCart");
const continueButton = document.getElementById("continueShopping");
const cards = document.querySelectorAll(".card");
const sections = document.querySelectorAll(".department");
   
if (!search || !sort || !count || !title || !empty || !overlay || !cartItems || !cartCount || !cartTotal || !openCartButton || !closeCartButton || !continueButton || !cards.length) {
    console.error("Catalogue JavaScript could not start. Check that required HTML layout elements exist.");
    return;
}
    
const originalCards = [];
  cards.forEach(function (card) {
    originalCards.push(card);
});

let activeDepartment = "all";
    let cart = {};
    const CART_STORAGE_KEY = "zphPreviewCart";

try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "{}");
    if (saved && typeof saved === "object" && !Array.isArray(saved)) {
        Object.keys(saved).forEach(function (key) {
            const item = saved[key];
            if (item && typeof item.name === "string" && !isNaN(item.price) && !isNaN(item.qty) && item.qty > 0) {
                cart[key] = {
                    id: key,
                    name: item.name,
                    price: Number(item.price),
                    qty: Math.floor(Number(item.qty)),
                    colour: typeof item.colour === "string" ? item.colour : ""
                };
            }
        });
    }
} catch (error) {
    console.warn("Saved cart could not be read. Starting with an empty cart.", error);
}

function saveCart() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.warn("Cart could not be saved in this browser.", error);
        }
    }

function money(value) {
    return "R" + Number(value).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function makeCartId(name, colour) {
    return JSON.stringify([name, colour || ""]);
    
}

    
function updateProducts() {
    const term = search.value.trim().toLowerCase();
    let visible = 0;
    cards.forEach(function (card) {
        let productName = card.dataset.name || "";
        if (!productName) {
            const h3 = card.querySelector("h3");
            if (h3) { productName = h3.textContent; }
        }
productName = productName.toLowerCase();
    let productDesc = "";
    const descEl = card.querySelector(".desc");
    if (descEl) { productDesc = descEl.textContent.toLowerCase(); }

    const matchesDept = (activeDepartment === "all" || card.dataset.dept === activeDepartment);
    const matchesSearch = (productName.includes(term) || productDesc.includes(term));
    if (matchesDept && matchesSearch) {
        card.hidden = false;
        card.style.display = "";
        visible++;
        } else {
            card.hidden = true;
            card.style.display = "none";
        }
    });

        
sections.forEach(function (section) {
    const sectionCards = section.querySelectorAll(".card");
    let hasVisible = false;
    sectionCards.forEach(function (c) {
        if (!c.hidden) { hasVisible = true; }
            });
        section.hidden = !hasVisible;
        section.style.display = hasVisible ? "" : "none";
        });
count.textContent = visible + " " + (visible === 1 ? "product" : "products");
empty.style.display = visible ? "none" : "block";
if (activeDepartment === "all") {
    title.textContent = "Browse All Products";
} else {
    const heading = document.querySelector('[data-section="' + activeDepartment + '"] .section-title h2');
    title.textContent = heading ? heading.textContent : "Browse Products";
}
}

function sortProducts() {
    const grids = document.querySelectorAll(".grid");
    grids.forEach(function (grid) {
            const gridCards = grid.querySelectorAll(".card");
            const cardsArray = [];
            gridCards.forEach(function (c) { cardsArray.push(c); });
            cardsArray.sort(function (a, b) {
                const aPrice = Number(a.dataset.price) || 0;
                const bPrice = Number(b.dataset.price) || 0;
                if (sort.value === "low") { return aPrice - bPrice; }
                if (sort.value === "high") { return bPrice - aPrice; }
                return originalCards.indexOf(a) - originalCards.indexOf(b);
            });
            cardsArray.forEach(function (item) {
                grid.appendChild(item);
            });
        });
    }

function jumpToDepartment(department) {
    activeDepartment = department;
    const jumpButtons = document.querySelectorAll("[data-jump]");
    jumpButtons.forEach(function (button) {
            const active = (button.dataset.jump === department);
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

updateProducts();
if (department === "all") {
    const topEl = document.getElementById("top");
    if (topEl) { topEl.scrollIntoView({ behavior: "smooth" }); }
    } else {
        const targetSec = document.getElementById(department);
        if (targetSec) { targetSec.scrollIntoView({ behavior: "smooth", block: "start" }); }
    }
}

   
function renderCart() {
    const keys = Object.keys(cart);
    cartItems.innerHTML = "";
    let calculatedTotalItems = 0;
    let calculatedTotalCost = 0;

if (keys.length === 0) {
    const message = document.createElement("p");
    message.textContent = "Your cart is empty. Add a product to get started.";
    message.style.color = "var(--muted)";
    cartItems.appendChild(message);
} else {
    keys.forEach(function (key) {
        const item = cart[key];
        calculatedTotalItems = calculatedTotalItems + item.qty;
        calculatedTotalCost = calculatedTotalCost + (item.price * item.qty);
        const row = document.createElement("div");
        row.style.cssText = "display:grid;grid-template-columns:1fr auto;gap:10px;padding:14px 0;border-bottom:1px solid var(--line);";
        const details = document.createElement("div");
        const nameNode = document.createElement("strong");
        nameNode.textContent = item.name;

const priceNode = document.createElement("p");
    priceNode.textContent = money(item.price) + " each";
    priceNode.style.cssText = "color:var(--muted);margin:6px 0;";
    details.appendChild(nameNode);
    details.appendChild(priceNode);

if (item.colour) {
    const colourNode = document.createElement("p");
    colourNode.textContent = "Colour: " + item.colour;
    colourNode.style.cssText = "font-size:13px;margin:4px 0;color:var(--muted);";
    details.appendChild(colourNode);
}

const controls = document.createElement("div");
        controls.style.cssText = "display:flex;align-items:center;gap:8px;margin-top:9px;";

const minus = document.createElement("button");
    minus.type = "button";
    minus.textContent = "−";
    minus.dataset.qty = item.id;
    minus.dataset.change = "-1";
    minus.setAttribute("aria-label", "Decrease " + item.name + " quantity");

const quantityNode = document.createElement("span");
    quantityNode.textContent = item.qty;
    quantityNode.setAttribute("aria-label", "Quantity");

const plus = document.createElement("button");
    plus.type = "button";
    plus.textContent = "+";
    plus.dataset.qty = item.id;
    plus.dataset.change = "1";
    plus.setAttribute("aria-label", "Increase " + item.name + " quantity");
const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.dataset.remove = item.id;
    remove.style.cssText = "margin-left:8px;border:0;background:none;color:#8a3d2b;text-decoration:underline;cursor:pointer;";
    controls.appendChild(minus);
    controls.appendChild(quantityNode);
    controls.appendChild(plus);
    controls.appendChild(remove);
    details.appendChild(controls);
    const subtotal = document.createElement("strong");
    subtotal.textContent = money(item.price * item.qty);
    row.appendChild(details);
    row.appendChild(subtotal);
    cartItems.appendChild(row);
});
}
cartCount.textContent = calculatedTotalItems;
cartTotal.textContent = money(calculatedTotalCost);
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
  lightbox.style.cssText = "position:fixed;inset:0;z-index:150;background:rgba(20,15,10,.88);display:none;align-items:center;justify-content:center;padding:24px;";
  const lightboxBox = document.createElement("div");
  lightboxBox.style.cssText = "position:relative;max-width:95vw;max-height:90vh;text-align:center;";
  const preview = document.createElement("img");
  preview.style.cssText = "display:block;max-width:100%;max-height:78vh;object-fit:contain;background:white;border-radius:8px;";
  const caption = document.createElement("p");
  caption.style.color = "white";
  const closeLightboxButton = document.createElement("button");
  closeLightboxButton.type = "button";
  closeLightboxButton.textContent = "×";
  closeLightboxButton.setAttribute("aria-label", "Close image preview");
  closeLightboxButton.style.cssText = "position:absolute;right:-12px;top:-16px;width:42px;height:42px;border:0;border-radius:50%;font-size:28px;background:white;color:var(--brown);cursor:pointer;";
  lightboxBox.appendChild(closeLightboxButton);
  lightboxBox.appendChild(preview);
  lightboxBox.appendChild(caption);
  lightbox.appendChild(lightboxBox);
  document.body.appendChild(lightbox);
  let lastImage = null;
  function closeLightbox() {
    lightbox.hidden = true;
    lightbox.style.display = "none";
    preview.removeAttribute("src");
    if (lastImage) { lastImage.focus(); }
}

const artImages = document.querySelectorAll(".art img");
artImages.forEach(function (img) {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", "Enlarge image: " + (img.alt || "Product image"));
    img.style.cursor = "zoom-in";
    function showLightbox() {
        if (!img.complete || !img.naturalWidth) { return; }
        lastImage = img;
        preview.src = img.src;
        preview.alt = img.alt;
        caption.textContent = img.alt;
        lightbox.hidden = false;
        lightbox.style.display = "flex";
        closeLightboxButton.focus();
    }

img.addEventListener("click", showLightbox);
img.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showLightbox();
    }
});
});

const deptButtons = document.querySelectorAll("[data-jump]");
deptButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        jumpToDepartment(button.dataset.jump);
    });
});
search.addEventListener("input", updateProducts);
sort.addEventListener("change", function () {
    sortProducts();
    updateProducts();
});

const addButtons = document.querySelectorAll(".add");
addButtons.forEach(function (button) {
button.addEventListener("click", function () {
    const card = button.closest(".card");
    if (!card) { return; }
    let name = card.dataset.name || "";
    if (!name) {
        const h3 = card.querySelector("h3");
        if (h3) { name = h3.textContent.trim(); }
    }

const price = Number(card.dataset.price);
if (!name || isNaN(price) || price < 0) {
    console.error("Product is missing a name or valid price.", card);
    return;
 }

const colourSelect = card.querySelector(".color-select");
const colour = colourSelect ? colourSelect.value : "";
const id = makeCartId(name, colour);
if (!cart[id]) {
cart[id] = { id: id, name: name, price: price, qty: 0, colour: colour };
}

cart[id].qty++;
 renderCart();
 const oldText = button.textContent;
 button.textContent = "Added!";
 button.disabled = true;
 setTimeout(function () {
    button.textContent = oldText;
    button.disabled = false;
}, 900);
 });
});

cartItems.addEventListener("click", function (event) {
     const button = event.target.closest("button");
     if (!button) { return; }
     if (button.dataset.qty) {
     const item = cart[button.dataset.qty];
     if (item) {
     item.qty = item.qty + Number(button.dataset.change);
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
    overlay.addEventListener("click", function (event) {
    if (event.target === overlay) { closeCart(); }
   });

closeLightboxButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) { closeLightbox(); }
   });

document.addEventListener("keydown", function (event) {
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