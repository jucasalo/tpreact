const Producto = require('../models/productosModels.js');
const mongoose = require('mongoose');

// Crear un nuevo producto
const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;

        // Validar que todos los campos necesarios estén presentes
        if (!nombre || !descripcion || !precio || !stock || !imagen || !categoria) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const nuevoProducto = new Producto({
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            categoria
        });

        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener productos filtrados por ID de categoría
const obtenerProductosPorCategoria = async (req, res) => {
    try {
        const categoriaId = req.params.categoriaId; // Recibe un ID de categoría
        const productos = await Producto.find({ categoria: categoriaId });

        if (productos.length === 0) {
            return res.status(404).json({ message: `No se encontraron productos en la categoría con ID ${categoriaId}` });
        }

        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un producto por ID
const eliminarProductoPorId = async (req, res) => {
    try {
        // Verificar si el ID es válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID de producto inválido' });
        }

        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const actualizarProductoPorId = async (req, res) => {
    try {
        // Verifica que el ID sea válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID de producto inválido' });
        }

        // Encuentra el producto por ID
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualiza solo los campos enviados
        if (req.body.nombre) producto.nombre = req.body.nombre;
        if (req.body.descripcion) producto.descripcion = req.body.descripcion;
        if (req.body.precio) producto.precio = req.body.precio;
        if (req.body.stock) producto.stock = req.body.stock;
        if (req.body.imagen) producto.imagen = req.body.imagen;
        if (req.body.categoria) producto.categoria = req.body.categoria;

        // Guarda los cambios
        const productoActualizado = await producto.save();

        // Devuelve el producto actualizado
        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { 
    crearProducto, 
    obtenerProductos, 
    obtenerProductoPorId, 
    eliminarProductoPorId, 
    actualizarProductoPorId,
    obtenerProductosPorCategoria  // Función actualizada para usar ID de categoría
};