const { body, validationResult } = require("express-validator");

// Middleware para validar productos
const validateProduct = [
  body("title").notEmpty().withMessage("El título es obligatorio."),
  body("description").notEmpty().withMessage("La descripción es obligatoria."),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número positivo."),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero positivo."),
  body("code").notEmpty().withMessage("El código del producto es obligatorio."),

  // Middleware para manejar errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateProduct };
