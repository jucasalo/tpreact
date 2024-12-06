const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController'); // Importar el controlador

// Ruta GET para obtener todas las categorías
router.get('/', categoriesController.getCategories);

// Otras rutas como POST, PUT, DELETE, etc. podrían ser añadidas aquí

module.exports = router;
