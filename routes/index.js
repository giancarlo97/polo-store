const express = require("express");
const router = express.Router();
const products = require("./product.route");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(
    `<div style='text-align: center; margin-top: 20%; font-size: 2em; font-family: Arial;'>
    <h1>¡Bienvenido a la API de indumentaria!</h1>
    <p>Para ver el catalogo, clickea aqui <a href="http://localhost:8080/api/products">/products</a></p>
    </div>`
  );
});

router.use("/api/products", products);

module.exports = router;