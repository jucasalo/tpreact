const express = require('express');
const router = express.Router();
const { obtenerProductosPorCategoria } = require('../controllers/productosController');

// Ruta para obtener productos por categoría
router.get('/categoria/:categoria', obtenerProductosPorCategoria);

module.exports = router;
