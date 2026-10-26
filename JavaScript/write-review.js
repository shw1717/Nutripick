document.addEventListener("DOMContentLoaded", () => {
  if (!isLoggedIn()) {
    window.location.href = "login.html";
  }
});

function submitReview() {
  const product = document.getElementById("productName").value.trim();
  const content = document.getElementById("content").value.trim();
  const rating = Number(document.getElementById("rating").value);
  const errorEl = document.getElementById("reviewError");

  errorEl.style.display = "none";

  if (!product || !content) {
    errorEl.textContent = "영양제 이름과 후기 내용을 입력해주세요.";
    errorEl.style.display = "block";
    return;
  }

  const user = getCurrentUser();
  const reviews = JSON.parse(localStorage.getItem("nutriReviews")) || [];

  reviews.unshift({
    username: user.username,
    userId: user.id,
    product,
    content,
    rating,
    date: new Date().toLocaleDateString("ko-KR"),
  });

  localStorage.setItem("nutriReviews", JSON.stringify(reviews));
  window.location.href = "board.html";
}
