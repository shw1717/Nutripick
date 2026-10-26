function getReviews() {
  return JSON.parse(localStorage.getItem("nutriReviews")) || [];
}

function saveReviews(reviews) {
  localStorage.setItem("nutriReviews", JSON.stringify(reviews));
}

function renderReviews() {
  const reviews = getReviews();
  document.getElementById("reviewList").innerHTML =
    reviews.length > 0
      ? reviews
          .map(
            (review) => `
        <div class="card">
          <h3>${review.product}</h3>
          <p class="review-star">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
          <p>${review.content}</p>
          <div class="review-meta">
            <span>${review.username}</span>
            <span>${review.date}</span>
          </div>
        </div>
      `,
          )
          .join("")
      : `<div class="empty">등록된 후기가 없습니다.</div>`;
}

function goToWrite() {
  if (typeof isLoggedIn === "function" && !isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }
  window.location.href = "write-review.html";
}

renderReviews();
