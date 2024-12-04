const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Ruta para crear un producto
router.post('/', productosController.crearProducto);

// Ruta para obtener todos los productos
router.get('/', productosController.obtenerProductos);

// Ruta para obtener un producto por ID
router.get('/:id', productosController.obtenerProductoPorId);

// Ruta para eliminar un producto por ID
router.delete('/:id', productosController.eliminarProductoPorId);

// Ruta para actualizar un producto por ID
router.put('/:id', productosController.actualizarProductoPorId);

module.exports = router;
