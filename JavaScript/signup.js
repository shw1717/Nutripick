function handleSignup() {
  const username = document.getElementById("signupUsername").value.trim();
  const password = document.getElementById("signupPassword").value;
  const passwordConfirm = document.getElementById("signupPasswordConfirm").value;
  const errorEl = document.getElementById("signupError");

  errorEl.style.display = "none";

  if (!username || !password || !passwordConfirm) {
    errorEl.textContent = "모든 항목을 입력해주세요.";
    errorEl.style.display = "block";
    return;
  }
  if (username.length < 7 || username.length > 20) {
    errorEl.textContent = "아이디는 7~20자로 입력해주세요.";
    errorEl.style.display = "block";
    return;
  }
  if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9_]+$/.test(username)) {
    errorEl.textContent =
      "아이디는 영문과 숫자를 포함하고, 영문/숫자/언더바(_)만 사용할 수 있습니다.";
    errorEl.style.display = "block";
    return;
  }
  if (password.length < 6) {
    errorEl.textContent = "비밀번호는 6자 이상 입력해주세요.";
    errorEl.style.display = "block";
    return;
  }
  if (password !== passwordConfirm) {
    errorEl.textContent = "비밀번호가 일치하지 않습니다.";
    errorEl.style.display = "block";
    return;
  }

  const result = register(username, password);
  if (!result.success) {
    errorEl.textContent = result.message;
    errorEl.style.display = "block";
    return;
  }

  login(username, password);
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  if (isLoggedIn()) window.location.href = "index.html";
});
