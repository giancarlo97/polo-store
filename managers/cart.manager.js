const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../db/carts.json");

// Obtener todos los carritos
const getAllCarts = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("❌ Error al leer los carritos:", error);
    return [];
  }
};

// Obtener carrito por ID 
const getCartById = (cid) => {
  try {
    const carts = getAllCarts();
    return carts.find((cart) => cart.id === parseInt(cid)) || null;
  } catch (error) {
    console.error("❌ Error al obtener carrito por ID:", error);
    return null;
  }
};

// Crear un nuevo carrito
const createCart = () => {
  const carts = getAllCarts();
  const newCart = {
    id: carts.length ? Math.max(...carts.map(c => c.id)) + 1 : 1,
    products: [],
  };
  carts.push(newCart);
  saveCarts(carts);
  return newCart;
};

// Agregar producto a un carrito
const addProductToCart = (cid, pid) => {
  const carts = getAllCarts();
  const cartIndex = carts.findIndex((cart) => cart.id === parseInt(cid));

  if (cartIndex === -1) return null;

  const productIndex = carts[cartIndex].products.findIndex(
    (item) => item.product === parseInt(pid)
  );

  if (productIndex !== -1) {
    carts[cartIndex].products[productIndex].quantity += 1;
  } else {
    carts[cartIndex].products.push({ product: parseInt(pid), quantity: 1 });
  }

  saveCarts(carts);
  return carts[cartIndex];
};

// Guardar cambios en carts.json
const saveCarts = (carts) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2), "utf-8");
  } catch (error) {
    console.error("❌ Error al guardar carritos:", error);
  }
};

// **Verificar
module.exports = { getAllCarts, getCartById, createCart, addProductToCart };
