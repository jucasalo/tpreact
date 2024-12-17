const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    imagen: { type: String, required: true },
    categoria: { 
        type: String, 
        required: true, 
        enum: ['collares', 'anillos', 'aros'], // Categorías predefinidas
        message: '{VALUE} no es una categoría válida' // Mensaje de error 
    }
});
module.exports = mongoose.model('Producto', ProductoSchema);
