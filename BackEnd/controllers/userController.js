const User = require('../models/usersModels.js');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "your_secret_key"; // Reemplaza con una clave secreta segura

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Validar campos requeridos
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el email ya está registrado
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El email ya está registrado' });
        }

        // Crear y guardar el nuevo usuario
        const newUser = new User({ nombre, email, password, rol });
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito', usuario: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar campos requeridos
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, rol: user.rol },
            SECRET_KEY,
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
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
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
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario por ID
const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
