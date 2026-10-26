function getUsers() {
  return JSON.parse(localStorage.getItem("nutriUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("nutriUsers", JSON.stringify(users));
}

function getCurrentUser() {
  const id = localStorage.getItem("nutriCurrentUser");
  if (!id) return null;
  return getUsers().find((u) => u.id === id) || null;
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function register(username, password) {
  const users = getUsers();
  if (users.find((u) => u.username === username)) {
    return { success: false, message: "이미 사용 중인 아이디입니다." };
  }
  const newUser = {
    id: "user_" + username,
    username,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return { success: true, user: newUser };
}

function login(username, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) {
    return { success: false, message: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }
  localStorage.setItem("nutriCurrentUser", user.id);
  return { success: true, user };
}

function logout() {
  localStorage.removeItem("nutriCurrentUser");
  window.location.href = "index.html";
}

// 결제 내역: 현재 유저의 주문 목록 키
function getOrdersKey() {
  const user = getCurrentUser();
  return user ? "nutriOrders_" + user.id : null;
}

// 결제 내역: 현재 유저의 전체 주문 목록 반환
function getOrders() {
  const key = getOrdersKey();
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key)) || [];
}

// 결제 내역: 장바구니 아이템과 합계를 받아 주문 1건 저장
function saveOrder(items, total) {
  const key = getOrdersKey();
  if (!key) return;
  const orders = getOrders();
  orders.unshift({
    id: "order_" + new Date().toISOString(),
    date: new Date().toLocaleString("ko-KR"),
    items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
    total,
  });
  localStorage.setItem(key, JSON.stringify(orders));
}
