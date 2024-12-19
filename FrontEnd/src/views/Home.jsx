import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { AuthContext } from '../utils/AuthContext';

const Home = () => {
    const { user } = React.useContext(AuthContext); // Obtén el estado de autenticación del contexto
    const [productos, setProductos] = useState([]); // Estado para almacenar los productos
    const [categorias, setCategorias] = useState([]); // Estado para almacenar las categorías
    const [errorMensaje, setErrorMensaje] = useState(''); // Estado para manejar errores
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); // Estado para manejar la categoría seleccionada
    const [cargandoDestinos, setCargandoDestinos] = useState(false); // Estado para indicar si se están cargando los productos
    const nombre = 'usuario'; // Nombre de usuario (puedes ajustar esto dinámicamente si lo necesitas)

    useEffect(() => {
        console.log('Se renderizó el componente.');

        // Función para obtener productos desde el backend
        const getProducts = async () => {
            try {
                const url = 'http://localhost:3000/api/products'; // URL para obtener productos
                const resp = await fetch(url); // Realiza la solicitud al backend
                const data = await resp.json(); // Parsear la respuesta como JSON

                // Mapeo de productos para ajustarlos al formato esperado
                const products = data.map((product) => ({
                    id: product._id,
                    nombre: product.nombre,
                    foto: product.imagen, // Cambié 'foto' a 'imagen'
                    precio: product.precio,
                    categoria: product.categoria,
                }));

                setProductos(products); // Actualiza el estado con los productos obtenidos
            } catch (error) {
                console.error('Error al obtener productos:', error); // Manejo de errores
            }
        };

        // Función para obtener las categorías
        const getCategorias = async () => {
            try {
                const url = 'http://localhost:3000/api/products/categorias'; // URL para obtener las categorías
                const resp = await fetch(url); // Realiza la solicitud al backend
                const data = await resp.json(); // Parsear la respuesta como JSON

                setCategorias(data); // Actualiza el estado con las categorías obtenidas
            } catch (error) {
                console.error('Error al obtener las categorías:', error); // Manejo de errores
            }
        };

        getProducts(); // Llama a la función para obtener productos
        getCategorias(); // Llama a la función para obtener categorías
    }, []); // Dependencia vacía para ejecutarlo solo al montar el componente

    // Función para manejar el cambio en el filtro por categoría
    const handleCategoriaChange = async (e) => {
        const categoriaSeleccionada = e.target.value;
        
        // Resetear la lista de productos antes de hacer una nueva solicitud
        setProductos([]); 
        setCategoriaSeleccionada(categoriaSeleccionada);
        setCargandoDestinos(true); // Mostrar el cargando mientras se obtienen los productos
        
        if (categoriaSeleccionada) {
            const url = `http://localhost:3000/api/products/category/${categoriaSeleccionada}`;
            
            try {
                const resp = await fetch(url);
                const data = await resp.json();
    
                if (Array.isArray(data) && data.length > 0) {
                    const productosFiltrados = data.map((product) => ({
                        id: product._id,
                        nombre: product.nombre,
                        foto: product.imagen,
                        precio: product.precio,
                        categoria: product.categoria,
                    }));
    
                    setProductos(productosFiltrados); // Actualizar los productos con los filtrados
                } else {
                    setProductos([]); // Si no se encontraron productos, asegurarse de que esté vacío
                    setErrorMensaje('No se encontraron productos para esta categoría.');
                }
            } catch (error) {
                setErrorMensaje('Error al obtener productos por categoría.');
                console.error('Error al obtener productos por categoría:', error);
            } finally {
                setCargandoDestinos(false); // Detener el cargando al finalizar la solicitud
            }
        } else {
            // Si no se selecciona categoría, cargar todos los productos o mostrar los predeterminados
            getProducts();
            setCargandoDestinos(false);
        }
    };
    
    

    return (
        <div>
            <h2>Inicio</h2>
            <h4>
                Bienvenido, <span className="verde">Hola {nombre}</span>
            </h4>

            <hr />

            <a href="/add-product" className="btn-link">
                Agregar Producto
            </a>

          {/* Select de Categorías */}
    <div>
    <label htmlFor="categoria">Filtrar por Categoría:</label>
    <select name="categoria" id="categoria" value={categoriaSeleccionada} onChange={handleCategoriaChange}>
    <option value="" disabled>Seleccionar</option> {/* Opción predeterminada que no aparece en el listado */}
    {['collares', 'anillos', 'aros'].map((categoria, index) => (
        <option key={index} value={categoria}>
            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
        </option>
    ))}
</select>

    </div>


    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
    {/* Renderizado de productos */}
    {errorMensaje ? (
        <p className="error-message">{errorMensaje}</p>
    ) : cargandoDestinos ? (
        <p className="loading-indicator">Cargando...</p>
    ) : (
        <>
            {/* Filtra los productos según la categoría seleccionada o muestra todos */}
            {(categoriaSeleccionada === '' ? productos : productos.filter(p => p.categoria === categoriaSeleccionada)).length > 0 ? (
                productos.filter(p => categoriaSeleccionada === '' || p.categoria === categoriaSeleccionada).map((producto) => (
                    <Card
                        key={producto.id}
                        id={producto.id}
                        texto={producto.nombre}
                        precio={producto.precio}
                        foto={producto.foto}
                        usuarioLogueado={ user } // Paso el estado de autenticación a las tarjetas de producto
                    />
                ))
            ) : (
                <p>No se encontraron productos para esta categoría.</p>
            )}
        </>
    )}
</div>

        </div>
    );
};

export default Home;
