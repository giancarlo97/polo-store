const { createCart, getCartById, addProductToCart } = require("../managers/cart.manager");

// Obtener un carrito por ID
const getCart = (req, res) => {
  try {
    const { cid } = req.params;
    const cart = getCartById(cid);
    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    res.json(cart);
  } catch (error) {
    console.error("❌ Error en getCart:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un nuevo carrito
const createNewCart = (req, res) => {
  try {
    const newCart = createCart();
    res.status(201).json(newCart);
  } catch (error) {
    console.error("❌ Error en createNewCart:", error);
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

// Agregar un producto a un carrito existente
const addProduct = (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = addProductToCart(cid, pid);

    if (!updatedCart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("❌ Error en addProduct:", error);
    res.status(500).json({ error: "Error al agregar el producto al carrito" });
  }
};

// **Exportar funciones correctamente**
module.exports = { createNewCart, getCart, addProduct }; // 👈 Asegúrate de que `getCart` esté exportado
