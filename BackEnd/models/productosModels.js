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
        enum: ['collares', 'anillos', 'aros'], 
        message: '{VALUE} no es una categoría válida' 
    }
});
module.exports = mongoose.model('Producto', ProductoSchema);
