const EURO_TO_FCFA = 655;

const products = [
  { name: "Parfum concentré Musc", image: "https://via.placeholder.com/250x250?text=Parfum", price: 29 },
  { name: "AirPods Pro", image: "https://via.placeholder.com/250x250?text=AirPods", price: 199 },
  { name: "T-shirt oversize", image: "https://via.placeholder.com/250x250?text=V%C3%AAtement", price: 35 },
  { name: "Sweat à capuche", image: "https://via.placeholder.com/250x250?text=Sweat", price: 50 },
];

const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const searchBar = document.getElementById("searchBar");

let cart = [];

function toFCFA(euro) {
  return euro * EURO_TO_FCFA;
}

function displayProducts(filteredProducts) {
  productsDiv.innerHTML = "";
  filteredProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    const priceFCFA = toFCFA(product.price);
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${priceFCFA} FCFA</p>
      <button onclick='addToCart("${product.name}", ${priceFCFA})'>Ajouter au panier</button>
    `;
    productsDiv.appendChild(div);
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} FCFA`;
    cartItems.appendChild(li);
  });
}

searchBar.addEventListener("input", () => {
  const keyword = searchBar.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  displayProducts(filtered);
});

function subscribe() {
  alert("Merci de vous abonner à Hopeshop ! Fonctionnalité à venir.");
}

function openWhatsApp() {
  window.open("https://chat.whatsapp.com/KLxTI0FtOHSAoaTlZa2t95", "_blank");
}

displayProducts(products);
