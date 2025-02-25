const express = require("express");
const router = express.Router();
const { createNewCart, addProduct, getCart } = require("../controllers/cart.controller");

// Crear un nuevo carrito vacío
router.post("/", createNewCart);

// Agregar un producto a un carrito existente
router.post("/:cid/product/:pid", addProduct);

//obtener un carrito por id
router.get("/:cid", getCart);

//router.get("/:pid", getProduct);

module.exports = router;
