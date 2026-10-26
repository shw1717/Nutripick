const bestSellerNames = ["종합비타민", "오메가-3", "마그네슘"];

const bestSellers = bestSellerNames
  .map((name) => supplements.find((item) => item.name === name))
  .filter(Boolean);

document.getElementById("bestSellerList").innerHTML = bestSellers
  .map((item) => createProductCard(item))
  .join("");
