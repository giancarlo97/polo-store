const express = require("express");
const app = express();
var logger = require("morgan");

// DB
const products = require("../db/products.json");
const carts = require("../db/carts.json");

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


const routes = require("../routes/index");
app.use("/", routes);


app.use((req, res) => {
  res.status(404).send(
    `<div style='text-align: center; font-family: Arial;'>
          <h1>404 Not Found</h1>
          <p>Pagina no encontrada</p>
        </div>`
  );
});

module.exports = app;