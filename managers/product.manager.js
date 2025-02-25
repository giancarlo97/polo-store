
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../db/products.json");

// Leer productos desde el archivo JSON
const getAllProducts = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data) || [];
  } catch (error) {
    console.error("❌ Error al leer productos:", error);
    return [];
  }
};

// Obtener producto por ID con manejo de error
const getProductById = (pid) => {
  try {
    const products = getAllProducts();
    return products.find((p) => p.id === parseInt(pid)) || null;
  } catch (error) {
    console.error("❌ Error al obtener producto por ID:", error);
    return null;
  }
};

// Agregar un producto con manejo de error
const addProduct = ({ title, description, price, stock = 0, code }) => {
  try {
    const products = getAllProducts();

    if (products.some((p) => p.code === code)) {
      throw new Error("El código del producto ya existe.");
    }

    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = { id: newId, title, description, price, stock, code };

    products.push(newProduct);
    saveProducts(products);
    return newProduct;
  } catch (error) {
    console.error("❌ Error al agregar producto:", error);
    throw error;
  }
};

// Guardar cambios en JSON con manejo de errores
const saveProducts = (products) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
  } catch (error) {
    console.error("❌ Error al guardar productos:", error);
  }
};

module.exports = { getAllProducts, getProductById, addProduct };
