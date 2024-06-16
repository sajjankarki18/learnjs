export let cart = JSON.parse(localStorage.getItem('cart'))

if(!cart){
  [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }]  
}

const saveToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// function to add a product to the cart
export const addToCart = (productId, selectedQuantity) => {
  let matchingProduct;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingProduct = cartItem;
    }
  });

  if (matchingProduct) {
    matchingProduct.quantity += selectedQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: selectedQuantity,
    });
  }
  saveToLocalStorage()
};

// function to delete a product from the cart
export const deleteFromCart = (productId) => {
  let newCart = []

  cart.forEach((cartItem) => {
    if(productId !== cartItem.productId){
      newCart.push(cartItem)
    }
  })
  cart = newCart

  console.log(cart)

  saveToLocalStorage()

} 

// function to update the cartquantity
export const updateCartQuantity = () => {
  let totalQuantity = 0
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity
  })

  document.querySelector('.js-cart-quantity').innerHTML = totalQuantity

  saveToLocalStorage()
}

// function to add total quantities present in the checkout
export const updateCheckoutQuantity = () => {
  let totalQuantity = 0
  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity
  })
  document.querySelector('.js-checkout-quantity').innerHTML = totalQuantity + `<span> items</span>`

  saveToLocalStorage()
}

// function to update the cart-item-container quantity checkout page
export const updateQuantity = (productId, inputEL, container) => {
  let quantity = 0;
    cart.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity += inputEL;
        quantity = cartItem.quantity;
      }
    });

    container.querySelector(".js-quantity").innerHTML = quantity;

    saveToLocalStorage()
}

