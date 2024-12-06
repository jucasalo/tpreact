const Category = require('../models/categoryModel'); // Importar el modelo de categoría

// Función para obtener todas las categorías
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Obtener todas las categorías de la base de datos
    res.json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
};

// Agregar otras funciones según sea necesario, por ejemplo, para crear, actualizar o eliminar categorías

module.exports = {
  getCategories
};
