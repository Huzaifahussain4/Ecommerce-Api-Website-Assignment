
let namediv = document.getElementById("productCards");
let searchInput = document.getElementById("searchInput");
let btnElem = document.getElementById("searchBtn");
let radioButtons = document.querySelectorAll('input[type="radio"]');
let jsonData = [];

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    jsonData = json;
    displayProducts(jsonData);
  });

function displayProducts(data) {
  let productsHTML = "";

  data.forEach((item) => {
    productsHTML += `<div class="card">
      <div class="imgDiv">
        <img src=${item.image} alt=""/>
      </div>
      <div class="titleDiv">${item.title}</div>
      <div class="descriptionDiv">${item.description}</div>
      <div class="mainDivPriceAndRating">
          <div class="priceNratingDiv">$ ${item.price}</div>
          <div class="priceNratingDiv"><i class="fa-solid fa-star"></i>${item.rating.rate}</div>
      </div>
      <div class="productBtnDiv">
          <button class="productBtn grayBtn">Add to cart</button>
          <button class="productBtn greenBtn">Buy</button>
      </div>
    </div>`;
  });

  namediv.innerHTML = productsHTML;
}

function filterProducts(category) {
  if (category === "all") {
    displayProducts(jsonData);
  } else {
    const filteredData = jsonData.filter((item) => item.category === category);
    displayProducts(filteredData);
  }
}

function search() {
  const query = searchInput.value.toLowerCase();
  const category = document.querySelector('input[name="category"]:checked').value;

  if (category === "all") {
    const results = jsonData.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
    displayProducts(results);
  } else {
    const results = jsonData.filter((item) =>
      item.category === category &&
      (item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query))
    );
    displayProducts(results);
  }
}

btnElem.addEventListener("click", search);

radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    filterProducts(this.value);
    search();
  });
});
