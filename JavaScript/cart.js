function renderCart() {
  if (typeof isLoggedIn === "function" && !isLoggedIn()) {
    document.getElementById("cartList").innerHTML =
      `<div class="empty cart-login-empty">
        <p>로그인 후 장바구니를 이용할 수 있습니다.</p>
        <a href="login.html" class="btn cart-login-btn">로그인하러 가기</a>
      </div>`;
    document.getElementById("totalPrice").textContent = "";
    return;
  }

  const cart = getCart();
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  saveCart(cart);

  document.getElementById("cartList").innerHTML =
    cart.length > 0
      ? cart
          .map(
            (item) => `
        <div class="card cart-card">
          <img src="${item.image}" alt="${item.name}">
          <h3>${item.name} <span class="quantity-text">${item.quantity}개</span></h3>
          <p class="price">${formatPrice(item.price * item.quantity)}</p>
          <p class="notice">개당 ${formatPrice(item.price)}</p>
          <div class="quantity-controls">
            <button type="button" onclick="changeQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button type="button" onclick="changeQuantity(${item.id}, 1)">+</button>
          </div>
          <button class="btn secondary" type="button" onclick="removeCartItem(${item.id})">삭제</button>
        </div>
      `,
          )
          .join("")
      : `<div class="empty">장바구니가 비어 있습니다.</div>`;

  document.getElementById("totalPrice").textContent =
    "총 금액: " + formatPrice(total);
}

function changeQuantity(id, amount) {
  const cart = getCart();
  const item = cart.find((cartItem) => cartItem.id === id);

  if (!item) {
    return;
  }

  item.quantity += amount;

  if (item.quantity <= 0) {
    saveCart(cart.filter((cartItem) => cartItem.id !== id));
  } else {
    saveCart(cart);
  }

  renderCart();
}

function removeCartItem(id) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
  renderCart();
}

function clearCart() {
  localStorage.removeItem(getCartKey());
  renderCart();
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) return;

  const listEl = document.getElementById("checkoutItemList");
  listEl.innerHTML = cart
    .map((item) => `<li>${item.name}${item.quantity > 1 ? " × " + item.quantity : ""}</li>`)
    .join("");

  document.getElementById("checkoutModal").classList.add("modal-open");
}

function closeCheckoutModal() {
  document.getElementById("checkoutModal").classList.remove("modal-open");
}

function closeModal(event) {
  if (event.target === document.getElementById("checkoutModal")) {
    closeCheckoutModal();
  }
}

function confirmCheckout() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  saveOrder(cart, total);

  closeCheckoutModal();
  localStorage.removeItem(getCartKey());
  renderCart();
  document.getElementById("successModal").classList.add("modal-open");
}

function closeSuccessModal() {
  document.getElementById("successModal").classList.remove("modal-open");
}

document.addEventListener("DOMContentLoaded", renderCart);
