const express = require('express');
const router = express.Router();

// Ejemplo de categorías simuladas (puedes reemplazar esto por datos de tu base de datos)
const categories = [
  { id: 1, nombre: "Anillos" },
  { id: 2, nombre: "Collares" },
  { id: 3, nombre: "Pulseras" },
];

// Ruta para obtener todas las categorías
router.get('/', (req, res) => {
  res.json(categories);
});

module.exports = router;
