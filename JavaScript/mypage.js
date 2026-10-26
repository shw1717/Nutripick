document.addEventListener("DOMContentLoaded", () => {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  const user = getCurrentUser();
  document.getElementById("mypageTitle").textContent = user.username + "님의 마이페이지";

  const orders = getOrders();
  const listEl = document.getElementById("orderList");

  if (orders.length === 0) {
    listEl.innerHTML = `<div class="empty">결제 내역이 없습니다.</div>`;
    return;
  }

  listEl.innerHTML = orders
    .map(
      (order) => `
      <div class="order-card">
        <div class="order-header">
          <span class="order-date">${order.date}</span>
          <span class="order-total">${formatPrice(order.total)}</span>
        </div>
        <ul class="order-item-list">
          ${order.items
            .map(
              (item) =>
                `<li>${item.name}${item.quantity > 1 ? " × " + item.quantity : ""} — ${formatPrice(item.price * item.quantity)}</li>`,
            )
            .join("")}
        </ul>
      </div>
    `,
    )
    .join("");

  const allReviews = JSON.parse(localStorage.getItem("nutriReviews")) || [];
  const myReviews = allReviews.filter((r) => r.userId === user.id);
  const reviewListEl = document.getElementById("myReviewList");

  if (myReviews.length === 0) {
    reviewListEl.innerHTML = `<div class="empty">작성한 후기가 없습니다.</div>`;
    return;
  }

  reviewListEl.innerHTML = myReviews
    .map(
      (review) => `
      <div class="order-card">
        <div class="order-header">
          <span style="font-weight:bold;">${review.product}</span>
          <span class="review-star">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
        </div>
        <p style="font-size:14px; color:#444; margin:0;">${review.content}</p>
        <p style="font-size:12px; color:#999; margin:10px 0 0;">${review.date}</p>
      </div>
    `,
    )
    .join("");
});
