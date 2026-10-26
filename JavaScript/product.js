document.getElementById("productList").innerHTML = supplements
  .map((item) => createProductCard(item))
  .join("");
