import ProductsContainer from "../components/ProductsContainer";
import Card from '../components/Card';
import Button from '../components/Button';

import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

const Home = () => {
  let nombre = 'usuario';
  let [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    console.log('Se Renerizo el componente.');

    // Obtener categorías desde el backend
    const getCategorias = async () => {
      try {
        const resp = await fetch('http://localhost:3000/api/categories'); // Asegúrate que esta sea la URL correcta para obtener categorías
        const data = await resp.json();
        console.log(data);
        setCategorias(data); // Asegúrate de que el backend esté devolviendo categorías
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    // Obtener productos desde el backend
    const getProducts = async (categoria = '') => {
      try {
        let url = 'http://localhost:3000/api/products';
        if (categoria) {
          url = `http://localhost:3000/api/products/category/${categoria}`;
        }

        const resp = await fetch(url); 
        const data = await resp.json();
        const products = data.map(product => {
          return {
            id: product._id, 
            nombre: product.nombre,
            foto: product.imagen, // Cambié a 'imagen'
            precio: product.precio
          };
        });
        console.log(products);
        setProductos(products);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    getProducts();  // Llamada inicial para obtener todos los productos
    getCategorias();  // Llamada inicial para obtener las categorías
  }, []); // Dependencias vacías para ejecutarlo solo al montar el componente

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
    getProducts(e.target.value); // Obtener productos filtrados por la categoría seleccionada
  };

  return (
    <>
      <h2>Inicio</h2>
      <h4>Bienvenido <p className="verde">Hola {nombre}</p></h4>

      <hr />


      <a href="/add-product" className="btn-link">Agregar Producto</a>

      <h4>Filtrar por Categoría</h4>
      <select value={categoriaSeleccionada} onChange={handleCategoriaChange}>
        <option value="">Seleccionar</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.nombre}>
            {categoria.nombre}
          </option>
        ))}
      </select>

      


      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Renderizado de productos */}
        {productos.map((producto) => (
          <Card
            key={producto.id}
            id={producto.id}
            texto={producto.nombre}
            precio={producto.precio}
            foto={producto.foto}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
