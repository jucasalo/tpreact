const express = require('express');
const router = express.Router();
const validarToken = require('./auth'); // Tu middleware de autenticación
const { borrarProducto } = require('../controllers/productosController'); // Controlador para borrar productos

// Ruta protegida para eliminar un producto
router.delete('/productos/:id', validarToken, borrarProducto);

module.exports = router;
