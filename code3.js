const EURO_TO_FCFA = 655;

const products = [
  { name: "Parfum concentré Musc", images: ["parfum1.jpg"], price: 29 },
  { name: "AirPods Pro", images: ["airpods.jpg"], price: 199 },
  { name: "T-shirt oversize", images: ["tshirt.jpg"], price: 35 },
  { name: "Sweat à capuche", images: ["sweat.jpg"], price: 50 },
  { name: "Cordons de chargeurs", images: ["cordon.jpg"], price: 15 },
  { name: "Déodorants", images: ["deodorant.jpg"], price: 10 },
  { name: "Bonnets", images: ["bonnet.jpg"], price: 12 },
  { name: "Montres", images: ["montre.jpg"], price: 80 },
  { name: "Casquettes", images: ["casquette.jpg"], price: 20 },
  { name: "Bracelets", images: ["bracelet.jpg"], price: 25 },
  { name: "Sacs à main", images: ["sac.jpg"], price: 60 },
  { name: "Console PS4", images: ["ps4.jpg"], price: 300 },
];

const cart = [];

const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cartItems");
const searchBar = document.getElementById("searchBar");

function toFCFA(euro) {
  return euro * EURO_TO_FCFA;
}

function displayProducts(filtered) {
  productsDiv.innerHTML = "";
  filtered.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    const price = toFCFA(product.price);
    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${price} FCFA</p>
      <button onclick="addToCart('${product.name}', ${price})">Ajouter au panier</button>
    `;
    productsDiv.appendChild(div);
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
  updateForMe();
}

function updateCart() {
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} FCFA`;
    cartItems.appendChild(li);
  });
}

function orderNow() {
  if (cart.length === 0) {
    alert("Votre panier est vide !");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const articles = cart.map(item => `- ${item.name}`).join("\n");

  const message = `
💬 Votre commande :

${articles}

🧾 Montant total : ${total} FCFA

💳 Dépôt :
Numéro : 693636804
Nom : wethe toukam allan darel

Merci pour votre confiance !
  `;

  alert(message);
}

function subscribe() {
  alert("Merci de vous abonner à Hopeshop !");
}

searchBar.addEventListener("input", () => {
  const keyword = searchBar.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  displayProducts(filtered);
});

function openWhatsApp() {
  window.open("https://chat.whatsapp.com/KLxTI0FtOHSAoaTlZa2t95", "_blank");
}

// Suggestions
function showSuggestions() {
  const suggestedDiv = document.getElementById("suggested");
  const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 3);
  suggestedDiv.innerHTML = "";

  randomProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${toFCFA(product.price)} FCFA</p>
      <button onclick="addToCart('${product.name}', ${toFCFA(product.price)})">Ajouter au panier</button>
    `;
    suggestedDiv.appendChild(div);
  });
}

// Pour moi
function updateForMe() {
  const personalizedDiv = document.getElementById("personalized");
  personalizedDiv.innerHTML = "";

  const uniqueCartItems = [...new Set(cart.map(item => item.name))];
  const personalized = products.filter(p => uniqueCartItems.includes(p.name));

  personalized.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>${toFCFA(product.price)} FCFA</p>
    `;
    personalizedDiv.appendChild(div);
  });
}

// Initialisation
displayProducts(products);
showSuggestions();
