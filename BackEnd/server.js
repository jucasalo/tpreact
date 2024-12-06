const express = require('express');
const mongoose = require('mongoose');
const categoriesRouter = require('./routes/categoriesRouter'); // Importar las rutas de categorías
const app = express();

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/tuBaseDeDatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.log('Error de conexión:', err));

// Middleware para parsear JSON
app.use(express.json());

// Usar el router para las categorías
app.use('/api/categories', categoriesRouter);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
