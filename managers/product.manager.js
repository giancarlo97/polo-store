const products = require("../db/products.json");

const getAllProducts = () => {
    return products.length ? products : null
};

module.exports = { getAllProducts };