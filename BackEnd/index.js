const express = require('express');
const cors = require('cors');
const routerAPI = require('./routes');
const db = require('./config/dataBase.js');
const mongoose = require('mongoose');
require('dotenv').config();

// Accedemos a la variable de Entorno
const port = process.env.PORT;

const app = express();
// Permitir acceso externos
app.use(cors());

mongoose.connect(process.env.URI_BD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const mongoDBConnection = mongoose.connection;
mongoDBConnection.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
mongoDBConnection.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
});

// Ruta Raíz
app.use(express.json());
// Definimos la carpeta para servir archivos estaticos
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('Soy el middleware');
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('<h1> API REST </h1>');
});

// Llamamos a las rutas
routerAPI(app);

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`);
});
