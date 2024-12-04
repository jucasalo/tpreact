const express = require('express');
const router = express.Router();

// Importo las funciones del controlador
const { createTask, getTasks, getTasksByUserId, updateTaskById, deleteTaskById } = require('../controllers/taskController');

// Ruta para obtener todas las tareas
router.get('/', getTasks);

// Ruta para crear una nueva tarea
router.post('/', createTask);

// Ruta para obtener las tareas de un usuario por ID
router.get('/:id', getTasksByUserId);

// Ruta para eliminar una tarea por ID
router.delete('/:id', deleteTaskById);

// Ruta para actualizar una tarea por ID
router.put('/:id', updateTaskById);

module.exports = router;
