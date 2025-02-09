const express = require("express");
const app = express();
var logger = require("morgan");

// DB
const products = require("./db/products.json");
const carts = require("./db/carts.json");

// MIDDELWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


const routes = require("./routes/index");
app.use("/", routes);


app.get("/products/:id", (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find((product) => product.id === parseInt(id));
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.get("/carts/:id", (req, res) => {
  try {
    const { id } = req.params;
    const cart = carts.find((cart) => cart.id === parseInt(id));
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.delete("/products/delete-product", (req, res) => {
  try {
    const { id } = req.query;
    const productIndex = products.findIndex((product) => product.id === parseInt(id));
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.status(200).send("Producto eliminado");
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.post("/products", (req, res) => {
  try {
    const { title, description, price } = req.body;
    const newProduct = {
      id: products.length + 1,
      title,
      description,
      price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al agregar producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.put("/products/update-product", (req, res) => {
  try {
    const { id } = req.query;
    const { title, description, price } = req.body;
    if (!title || !description || !price) {
      return res.status(400).send("Faltan datos");
    }
    const productIndex = products.findIndex((product) => product.id === parseInt(id));
    if (productIndex !== -1) {
      products[productIndex] = {
        id: parseInt(id),
        title,
        description,
        price,
      };
      res.status(200).json(products[productIndex]);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.use((req, res) => {
  res.status(404).send(
    `<div style='text-align: center; font-family: Arial;'>
          <h1>404 Not Found</h1>
          <p>Pagina no encontrada</p>
        </div>`
  );
});

module.exports = app;