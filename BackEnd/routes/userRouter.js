const express = require('express');
const router = express.Router();

// Importo las funciones del controlador
const {
    createUser,
    getUsers,
    getUsersById,
    deleteUserById,
    updateUserById,
    login
} = require('../controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para crear un nuevo usuario
router.post('/', createUser);

// Ruta para el login
router.post('/login', login); // Endpoint para iniciar sesión

// Ruta para obtener un usuario por ID
router.get('/:id', getUsersById);

// Ruta para eliminar un usuario por ID
router.delete('/:id', deleteUserById);

// Ruta para actualizar un usuario por ID
router.put('/actualizar/:id', updateUserById);

module.exports = router;
