document.addEventListener("DOMContentLoaded", () => {
  // 1. Static Product Database
  const products = [
    { id: 1, name: "Product 1", price: 1.99 },
    { id: 2, name: "Product 2", price: 18.99 },
    { id: 3, name: "Product 3", price: 6.99 },
  ];

  // 2. Initialize App State from LocalStorage
  let cart = JSON.parse(localStorage.getItem("shopping-cart")) || [];

  // DOM Elements
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const cartTotalMessage = document.getElementById("cart-total");
  const emptyCartMessage = document.getElementById("empty-cart");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  // 3. Render Storefront Products
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-row");
    productDiv.innerHTML = `
      <span>${product.name} - $${product.price.toFixed(2)}</span>
      <button class="btn-primary" data-id="${product.id}">Add to cart</button>
    `;
    productList.appendChild(productDiv);
  });

  // 4. Event Delegation: Shop Catalog Additions
  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      if (product) addToCart(product);
    }
  });

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  // 5. Event Delegation: Cart Removals
  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const itemIndex = parseInt(e.target.getAttribute("data-index"));
      removeFromCart(itemIndex);
    }
  });

  function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  // 6. Synchronize App UI State with App Array State
  function renderCart() {
    cartItems.innerHTML = "";
    let totalPrice = 0;

    if (cart.length > 0) {
      emptyCartMessage.classList.add("hidden");
      cartTotalMessage.classList.remove("hidden");

      cart.forEach((item, index) => {
        totalPrice += item.price;
        const cartItem = document.createElement("div");
        cartItem.classList.add("product-row");
        cartItem.innerHTML = `
          <span>${item.name} - $${item.price.toFixed(2)}</span>
          <button class="btn-danger" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
      });

      totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
    } else {
      emptyCartMessage.classList.remove("hidden");
      cartTotalMessage.classList.add("hidden");
      totalPriceDisplay.textContent = `$0.00`;
    }
  }

  // 7. Persistent LocalStorage Syncer
  function saveCart() {
    localStorage.setItem("shopping-cart", JSON.stringify(cart));
  }

  // 8. Checkout Processor
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) return;

    cart.length = 0; // Clears the array safely
    saveCart();
    alert("Checked out successfully!");
    renderCart();
  });

  // 9. Startup Draw Execution
  renderCart();
});
