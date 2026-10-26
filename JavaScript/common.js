// 공통: products/recommend/cart 페이지에서 가격을 "12,000원" 형태로 표시
function formatPrice(price) {
  return price.toLocaleString() + "원";
}

// 공통 장바구니: 로그인 유저별 고유 키 반환 (비로그인 시 guest 키)
function getCartKey() {
  const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  return user ? "nutriCart_" + user.id : "nutriCart_guest";
}

// 공통 장바구니: cart.js와 상품 카드의 장바구니 버튼에서 저장된 장바구니 읽기
function getCart() {
  const savedCart = JSON.parse(localStorage.getItem(getCartKey())) || [];
  const mergedCart = [];

  savedCart.forEach((item) => {
    const existingItem = mergedCart.find((cartItem) => cartItem.id === item.id);
    const quantity = item.quantity || 1;

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      mergedCart.push({ ...item, quantity });
    }
  });

  return mergedCart;
}

// 공통 장바구니: 장바구니 배열을 localStorage에 저장
function saveCart(cart) {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

// products.html, recommend.html: 상품 카드의 "장바구니 담기" 버튼에서 호출
function addToCart(id) {
  if (typeof isLoggedIn === "function" && !isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  const product = supplements.find((item) => item.id === id);

  if (!product) {
    return;
  }

  const cart = getCart();
  const cartItem = cart.find((item) => item.id === id);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  showToast(product.name + " 장바구니에 담겼습니다.");
}

// products.html, recommend.html: 데이터에 저장된 value를 사용자에게 보여줄 label로 변환
function getOptionLabel(value) {
  const allOptions = [...lifestyleOptions, ...dietOptions];
  const found = allOptions.find((option) => option.value === value);
  return found ? found.label : value;
}

// 카드에 노출할 최대 태그 수 (이 값만 바꾸면 조절 가능)
const MAX_TAGS = 5;

// products.html, recommend.html: 상품 정보를 카드 HTML 문자열로 만들어 재사용
// selectedValues: 사용자가 설문에서 체크한 값 목록. 겹치는 태그는 강조(match) 처리
function createProductCard(item, selectedValues = []) {
  const selected = new Set(selectedValues);

  // 카테고리는 사용자가 직접 체크한 항목이 아니므로 강조하지 않음
  // 생활 패턴/식습관 태그만 선택값과 겹치면 matched 표시
  const tags = [
    ...item.matchCategories.map((key) => ({
      text: concernCategories[key]?.title || key,
      matched: false,
    })),
    ...item.lifestyle.map((value) => ({
      text: getOptionLabel(value),
      matched: selected.has(value),
    })),
    ...item.diet.map((value) => ({
      text: getOptionLabel(value),
      matched: selected.has(value),
    })),
  ];

  // 겹친(강조) 태그를 앞으로 정렬한 뒤 최대 MAX_TAGS개만 노출
  // (sort는 안정 정렬이라 같은 그룹 안에서는 기존 순서가 유지)
  const visibleTags = [...tags]
    .sort((a, b) => Number(b.matched) - Number(a.matched))
    .slice(0, MAX_TAGS);

  const tagsHtml = visibleTags
    .map(
      (tag) =>
        `<span class="tag${tag.matched ? " match" : ""}">${tag.text}</span>`,
    )
    .join("");

  return `
    <div class="card">
      <img src="${item.image}" alt="${item.name}">
      <p class="mini-label">${item.category}</p>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p class="price">${formatPrice(item.price)}</p>
      <div>${tagsHtml}</div>
      <button class="btn" onclick="addToCart(${item.id})">장바구니 담기</button>
    </div>
  `;
}

// 공통 header/footer: html 폴더 안의 각 페이지에서 공통 조각 파일 로드
$(function () {
  $("#header").load("../header-footer/header.html", function () {
    const user = typeof getCurrentUser === "function" ? getCurrentUser() : null;
    const authNav = document.getElementById("authNav");
    if (!authNav) return;

    if (user) {
      authNav.innerHTML =
        `<span style="color:#4f46e5; font-weight:bold;">${user.username}</span>` +
        `<a href="mypage.html">마이페이지</a>` +
        `<a href="#" onclick="logout(); return false;">로그아웃</a>`;
    } else {
      authNav.innerHTML =
        `<a href="login.html">로그인</a>` +
        `<a href="signup.html">회원가입</a>`;
    }
  });
  $("#footer").load("../header-footer/footer.html");
});

// 공통 토스트: 장바구니 담기 등 사용자 액션 피드백
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast-show"));

  setTimeout(() => {
    toast.classList.remove("toast-show");
    toast.addEventListener("transitionend", () => {
      toast.remove();
      if (container.children.length === 0) container.remove();
    }, { once: true });
  }, 2500);
}
