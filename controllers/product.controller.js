
const { getAllProducts, getProductById, addProduct, deleteProduct, updateProduct } = require("../managers/product.manager");

// Obtener todos los productos
const getProducts = (req, res) => {
  try {
    const allProducts = getAllProducts();
    if (!allProducts.length) {
      return res.status(404).json({ error: "No se encontraron productos" });
    }
    res.status(200).json(allProducts);
  } catch (error) {
    console.error("❌ Error en getProducts:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener un producto por ID
const getProduct = (req, res) => {
  try {
    const { pid } = req.params;
    const product = getProductById(pid);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    console.error("❌ Error en getProduct:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Crear un nuevo producto
const createProduct = (req, res) => {
  try {
    const { title, description, price, stock, code } = req.body;
    const newProduct = addProduct({ title, description, price, stock, code });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("❌ Error en createProduct:", error);
    res.status(400).json({ error: error.message });
  }
};

// **Actualizar un producto por ID**
const updateProductController = (req, res) => {
  try {
    const { pid } = req.params;
    const updatedProduct = updateProduct(pid, req.body);
    if (!updatedProduct) return res.status(404).json({ error: "Producto no encontrado" });

    res.json(updatedProduct);
  } catch (error) {
    console.error("❌ Error en updateProductController:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

// **Eliminar un producto por ID**
const deleteProductController = (req, res) => {
  try {
    const { pid } = req.params;
    if (!deleteProduct(pid)) return res.status(404).json({ error: "Producto no encontrado" });

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error en deleteProductController:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

// **Exportar todas las funciones correctamente**
module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProductController, 
  deleteProductController,
};
