const selectedLifestyle = JSON.parse(
  localStorage.getItem("selectedLifestyle") || "[]",
);
const selectedDiet = JSON.parse(localStorage.getItem("selectedDiet") || "[]");
const selectedAll = [...selectedLifestyle, ...selectedDiet];

// 추천 결과로 노출할 최대 개수 (이 값만 바꾸면 노출 수 조절 가능)
const MAX_RESULTS = 3;

function getCategoryScores() {
  return Object.entries(concernCategories)
    .map(([key, category]) => {
      const score = category.keywords.filter((keyword) =>
        selectedAll.includes(keyword),
      ).length;
      return { key, ...category, score };
    })
    .filter((category) => category.score > 0)
    .sort((a, b) => b.score - a.score);
}

const categoryScores = getCategoryScores();
const mainCategory = categoryScores[0];

document.getElementById("profileBox").innerHTML =
  selectedAll.length > 0
    ? `
    <p class="mini-label">자동 분류된 사용자 고민 카테고리</p>
    <h2>${mainCategory ? mainCategory.title : "기본 영양 균형 관리형"}</h2>
    <p>${mainCategory ? mainCategory.description : "선택값을 바탕으로 기본 영양 균형 관리 제품을 추천합니다."}</p>
    <div class="selected-tags">
      ${selectedAll.map((value) => `<span class="tag">${getOptionLabel(value)}</span>`).join("")}
    </div>
    <p class="notice">의료 진단이 아닌 생활 패턴과 식습관 기반 학습용 추천 결과입니다.</p>
  `
    : `<div class="empty">선택한 항목이 없습니다. 추천 문항을 다시 작성해 주세요.</div>`;

const result = supplements
  .map((item) => {
    const lifestyleScore = item.lifestyle.filter((value) =>
      selectedLifestyle.includes(value),
    ).length;
    const dietScore = item.diet.filter((value) =>
      selectedDiet.includes(value),
    ).length;
    const categoryScore = categoryScores.filter((category) =>
      item.matchCategories.includes(category.key),
    ).length;
    return { ...item, score: lifestyleScore + dietScore + categoryScore };
  })
  .filter((item) => item.score > 0)
  .sort((a, b) => b.score - a.score || a.price - b.price)
  .slice(0, MAX_RESULTS);

document.getElementById("recommendList").innerHTML =
  result.length > 0
    ? result
        .map((item) =>
          createProductCard(item, selectedAll).replace(
            "</h3>",
            `</h3><p class="score">추천점수 ${item.score}</p>`,
          ),
        )
        .join("")
    : `<div class="empty">추천 결과가 없습니다. 다른 조건을 선택해 보세요.</div>`;
