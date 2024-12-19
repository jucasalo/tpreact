const User = require('../models/usersModels.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRETKEY = process.env.SECRETKEY 

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        const newUser = new User({ nombre, email, password, rol });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito', usuario: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', details: error.message });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, rol: user.rol },
            SECRETKEY,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: 'Login exitoso',
            token,
            usuario: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', details: error.message });
    }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', details: error.message });
    }
};

// Obtener un usuario por ID
const getUsersById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario por ID', details: error.message });
    }
};

// Eliminar un usuario por ID
const deleteUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', details: error.message });
    }
};

// Actualizar un usuario por ID
const updateUserById = async (req, res) => {
    try {
        const { id } = req.params; // El ID del usuario que se desea actualizar
        const updatedUserData = req.body; // Los datos que se desean actualizar

        // Validar que al menos uno de los campos esté presente
        if (!updatedUserData.nombre && !updatedUserData.email) {
            return res.status(400).json({ message: 'Debe proporcionar al menos un campo para actualizar' });
        }

        // Verificar si el usuario existe en la base de datos
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar el usuario
        const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, { new: true });

        if (!updatedUser) {
            return res.status(400).json({ message: 'Error al actualizar el usuario' });
        }

        res.status(200).json(updatedUser); // Devolver el usuario actualizado
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', details: error.message });
    }
};

module.exports = {
    createUser,
    login,
    getUsers,
    getUsersById,
    deleteUserById,
    updateUserById,
};
