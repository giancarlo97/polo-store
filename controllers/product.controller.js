const { getAllProducts } = require("../managers/product.manager");

const getProducts = (req, res) => {
  try {
    const allProducts = getAllProducts();
    if (allProducts) {
      res.status(200).json(allProducts);
    } else {
      res.status(400).send("No se encontraron los productos");
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

module.exports = { getProducts };