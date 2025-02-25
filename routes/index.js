
const express = require("express");
const router = express.Router();
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");

router.get("/", (req, res) => {
  res.send(`<h1>¡Bienvenido a la API de indumentaria!</h1><p>Accede a <a href="/api/products">/api/products</a> o <a href="/api/carts">/api/carts</a></p>`);
});

router.use("/api/products", productRoutes);
router.use("/api/carts", cartRoutes);

router.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

module.exports = router;
