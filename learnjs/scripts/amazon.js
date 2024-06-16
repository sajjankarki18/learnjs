import { products } from "../data/products.js";
import { addToCart, updateCartQuantity } from "../data/cart.js";
import {calculateProductPrice} from "../scripts/utils/money.js"

let productsHTML = "";

products.forEach((product) => {
  productsHTML += ` 
        <div class="product-container">
            <div class="product-image-container">
            <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
            ${product.name}
            </div>

            <div class="product-rating-container">
            <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
            </div>

            <div class="product-price">
            $${calculateProductPrice(product.priceCents)}
            </div>

            <div class="product-quantity-container">
            <select class="js-selected-quantity">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
              product.id
            }">
            Add to Cart
            </button>
        </div>`;
});

document.querySelector(".js-product-grid").innerHTML = productsHTML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    let productId = button.dataset.productId;
    let selectedQuantity = parseInt(
      button
        .closest(".product-container")
        .querySelector(".js-selected-quantity").value
    );

    addToCart(productId, selectedQuantity);
    updateCartQuantity();

    // code to show added message when we add a product to the cart
    let showAddedMessage = button
      .closest(".product-container")
      .querySelector(".added-to-cart");
    showAddedMessage.classList.add("show-added-message");

    setTimeout(() => {
      showAddedMessage.classList.remove("show-added-messages");
    }, 2000);
  });
});

let searchInputEL = document.querySelector(".js-search-input");
let searchButtonEL = document.querySelector(".js-search-button");
let productGridEL = document.querySelector(".js-product-grid");

const getSearchedProducts = (searchedProduct) => {
    products.forEach((product, index) => {
        let productContainer = productGridEL.children[index]

        if(product.name.toLowerCase().includes(searchedProduct.toLowerCase())){
            productContainer.style.display = 'block'
        }else{
            productContainer.style.display = 'none'
        }
    })
}

searchButtonEL.addEventListener('click', () => {
    getSearchedProducts(searchInputEL.value)
})

