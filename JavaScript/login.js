function handleLogin() {
const username = document.getElementById("loginUsername").value.trim();
const password = document.getElementById("loginPassword").value;
const errorEl = document.getElementById("loginError");

if (!username || !password) {
    errorEl.textContent = "아이디와 비밀번호를 입력해주세요.";
    errorEl.style.display = "block";
    return;
}

const result = login(username, password);
if (!result.success) {
    errorEl.textContent = result.message;
    errorEl.style.display = "block";
    return;
}

window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
if (isLoggedIn()) window.location.href = "index.html";

document.getElementById("loginPassword").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
});
});