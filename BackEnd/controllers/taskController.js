const Task = require('../models/taskModels.js'); // Asegúrate de tener el modelo de Task

// Crear una nueva tarea
const createTask = async (req, res) => {
    try {
        const nuevaTarea = new Task(req.body);
        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const tareas = await Task.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener tareas por ID de usuario
const getTasksByUserId = async (req, res) => {
    try {
        const tareas = await Task.find({ userId: req.params.id });
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una tarea por ID
const updateTaskById = async (req, res) => {
    try {
        const tarea = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una tarea por ID
const deleteTaskById = async (req, res) => {
    try {
        const tarea = await Task.findByIdAndDelete(req.params.id);
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createTask, getTasks, getTasksByUserId, updateTaskById, deleteTaskById };
