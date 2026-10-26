function renderChecks(targetId, options, name) {
  document.getElementById(targetId).innerHTML = options
    .map(
      (option) => `
      <label class="check-card">
        <input type="checkbox" name="${name}" value="${option.value}">
        <span>${option.label}</span>
      </label>
    `,
    )
    .join("");
}

renderChecks("lifestyleChecks", lifestyleOptions, "lifestyle");
renderChecks("dietChecks", dietOptions, "diet");

document.getElementById("submitBtn").addEventListener("click", function () {
  const selectedLifestyle = [
    ...document.querySelectorAll("input[name='lifestyle']:checked"),
  ].map((item) => item.value);
  const selectedDiet = [
    ...document.querySelectorAll("input[name='diet']:checked"),
  ].map((item) => item.value);

  if (selectedLifestyle.length === 0 && selectedDiet.length === 0) {
    alert("생활 패턴 또는 식습관을 1개 이상 선택해 주세요.");
    return;
  }

  localStorage.setItem("selectedLifestyle", JSON.stringify(selectedLifestyle));
  localStorage.setItem("selectedDiet", JSON.stringify(selectedDiet));
  location.href = "recommend.html";
});
