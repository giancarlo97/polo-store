
const express = require("express");
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProductController, deleteProductController } = require("../controllers/product.controller");

// Rutas CRUD de productos
router.get("/", getProducts);
router.get("/:pid", getProduct);
router.post("/", createProduct);
router.put("/:pid", updateProductController);
router.delete("/:pid", deleteProductController); // 👈 Aquí debe estar bien importado

module.exports = router;
