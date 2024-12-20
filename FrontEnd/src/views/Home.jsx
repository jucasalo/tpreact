import React, { useState, useEffect, useContext } from 'react';
import Card from '../components/Card';
import { AuthContext } from '../utils/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [productos, setProductos] = useState([]); 
    const [categorias, setCategorias] = useState([]); 
    const [errorMensaje, setErrorMensaje] = useState(''); 
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); 
    const [cargandoProductos, setCargandoProductos] = useState(false); 

    useEffect(() => {
        // Función para obtener productos desde el backend
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products');
                const data = await response.json();
                const products = data.map((product) => ({
                    id: product._id,
                    nombre: product.nombre,
                    foto: product.imagen,
                    precio: product.precio,
                    categoria: product.categoria,
                }));
                setProductos(products);
            } catch (error) {
                console.error('Error al obtener productos:', error);
                setErrorMensaje('Error al cargar los productos.');
            }
        };

        // Función para obtener las categorías
        const fetchCategorias = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/products/categorias');
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error('Error al obtener las categorías:', error);
                setErrorMensaje('Error al cargar las categorías.');
            }
        };

        fetchProductos();
        fetchCategorias();
    }, []);

    // Manejar el cambio de categoría
    const handleCategoriaChange = async (e) => {
        const categoria = e.target.value;
        setCategoriaSeleccionada(categoria);
        setCargandoProductos(true);
        setErrorMensaje('');

        if (categoria) {
            try {
                const response = await fetch(`http://localhost:3000/api/products/category/${categoria}`);
                const data = await response.json();

                if (data.length > 0) {
                    const productosFiltrados = data.map((product) => ({
                        id: product._id,
                        nombre: product.nombre,
                        foto: product.imagen,
                        precio: product.precio,
                        categoria: product.categoria,
                    }));
                    setProductos(productosFiltrados);
                } else {
                    setProductos([]);
                    setErrorMensaje('No se encontraron productos para esta categoría.');
                }
            } catch (error) {
                console.error('Error al filtrar productos:', error);
                setErrorMensaje('Error al obtener productos por categoría.');
            } finally {
                setCargandoProductos(false);
            }
        } else {
            setCargandoProductos(false);
        }
    };

    return (
        <div>
            <h2>Inicio</h2>
            <h4>
                Bienvenido, <span className="verde">{user?.nombre || 'Usuario'}</span>
            </h4>

            <hr />

            <a href="/add-product" className="btn-link">
                Agregar Producto
            </a>

            {/* Filtro por Categorías */}
            <div>
                <label htmlFor="categoria">Filtrar por Categoría:</label>
                <select
                    name="categoria"
                    id="categoria"
                    value={categoriaSeleccionada}
                    onChange={handleCategoriaChange}
                >
                    <option value="" disabled>
                        Seleccionar
                    </option>
                    {['collares', 'anillos', 'aros'].map((categoria, index) => (
                        <option key={index} value={categoria}>
                            {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* Lista de Productos */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {errorMensaje ? (
                    <p className="error-message">{errorMensaje}</p>
                ) : cargandoProductos ? (
                    <p className="loading-indicator">Cargando...</p>
                ) : (
                    productos.map((producto) => (
                        <Card
                            key={producto.id}
                            id={producto.id}
                            texto={producto.nombre}
                            precio={producto.precio}
                            foto={producto.foto}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
