import { cart, deleteFromCart, updateCheckoutQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import {calculateProductPrice} from "../scripts/utils/money.js"

let productsSummaryHTML = "";

cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });

  productsSummaryHTML += ` <div class="cart-item-container js-cart-item-container">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
        ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${calculateProductPrice(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity">${
              cartItem.quantity
            }</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${
            matchingProduct.id
          }">
            Update
          </span>
          <input class="link-primary quantity-input js-quantity-input"><span class="save-quantity-link" data-product-id="${
            matchingProduct.id
          }">save</span>
          <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${
            matchingProduct.id
          }">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});

document.querySelector(".js-order-summary").innerHTML = productsSummaryHTML;

// DOM function for deleting a quantity
document.querySelectorAll(".js-delete-quantity").forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    let productId = deleteLink.dataset.productId;

    deleteFromCart(productId);

    let deleteQuantity = document.querySelector(".js-cart-item-container");
    deleteQuantity.remove();
  });
});

// DOM function for updating a quantity
document.querySelectorAll(".js-update-quantity").forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    let productId = updateLink.dataset.productId;

    let displayInput = updateLink.closest(".js-cart-item-container").querySelector(".quantity-input");
    let displaySave = updateLink.closest(".js-cart-item-container").querySelector(".save-quantity-link");

    if (displayInput.classList.contains("showQuantityInput")) {
      displayInput.classList.remove("showQuantityInput");
      displaySave.classList.remove("showQuantityInput");
    } else {
      displayInput.classList.add("showQuantityInput");
      displaySave.classList.add("showQuantityInput");
    }
  });
});

// DOM function for saving the updated quantity
document.querySelectorAll(".save-quantity-link").forEach((saveProduct) => {
  saveProduct.addEventListener("click", () => {
    let container = saveProduct.closest('.js-cart-item-container')
    let displaySave = saveProduct.closest(".js-cart-item-container").querySelector(".save-quantity-link");
    let displayInput = saveProduct.closest(".js-cart-item-container").querySelector(".quantity-input");

    let productId = saveProduct.dataset.productId;
    let inputEL = parseInt(
      saveProduct
        .closest(".js-cart-item-container")
        .querySelector(".js-quantity-input").value
    );

    updateQuantity(productId, inputEL, container)

    displaySave.classList.remove("showQuantityInput");
    displayInput.classList.remove("showQuantityInput");
    
  });
});

updateCheckoutQuantity();
