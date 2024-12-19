const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const validarToken = require('../middleware/auth'); 

/// Ruta para crear un producto
router.post('/', productosController.crearProducto);
// Ruta para obtener todos los productos (no requiere autenticación)
router.get('/', productosController.obtenerProductos);

// Ruta para obtener productos filtrados por categoría (no requiere autenticación)
router.get('/category/:categoria', productosController.obtenerProductosPorCategoria);

// Ruta para obtener todas las categorías (no requiere autenticación)
router.get('/categorias', productosController.obtenerCategorias);

// Ruta para obtener un producto por ID (no requiere autenticación)
router.get('/:id', productosController.obtenerProductoPorId);

// Ruta para eliminar un producto por ID (requiere autenticación)
router.delete('/:id', validarToken, productosController.eliminarProductoPorId);

// Ruta para actualizar un producto por ID (requiere autenticación)
router.put('/:id', validarToken, productosController.actualizarProductoPorId);

module.exports = router;
