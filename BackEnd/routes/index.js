/* ---------------------------- Importa las rutas --------------------------- */
const userRouter = require('./userRouter');
const taskRouter = require('./taskRouter');
const productRouter = require('./productosRoute'); // Importamos el router de productos

function routerAPI(app) {
    // Definimos los endPoints
    app.use('/api/users', userRouter);
    app.use('/api/tasks', taskRouter);
    app.use('/api/products', productRouter); // Agregamos el endpoint para productos
}

module.exports = routerAPI;
