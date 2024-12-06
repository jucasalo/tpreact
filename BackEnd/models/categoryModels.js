const mongoose = require('mongoose');

// Definir el esquema para la categoría
const categorySchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  }
});

// Crear el modelo de la categoría
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
