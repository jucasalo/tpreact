// src/components/ProductosList.js
import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';

function ProductosList() {
    const [productos, setProductos] = useState([]);
    const [usuarioLogueado, setUsuarioLogueado] = useState(false);

    useEffect(() => {
        // Comprobar si el usuario está logueado y obtener los productos
        const checkUserLogin = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    // Comprobar si el token es válido
                    const response = await axios.get('http://localhost:3000/verificarToken', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    setUsuarioLogueado(true);
                }
            } catch (error) {
                console.error('Error al verificar el token:', error);
            }
        };

        checkUserLogin();

        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/productos');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const actualizarListaProductos = () => {
        // Lógica para actualizar la lista de productos después de eliminar uno
        fetchProductos();
    };

    return (
        <div>
            {productos.map(producto => (
                <Card
                    key={producto.id}
                    id={producto.id}
                    texto={producto.nombre}
                    foto={producto.imagen}
                    precio={producto.precio}
                    usuarioLogueado={usuarioLogueado}
                    actualizarListaProductos={actualizarListaProductos}
                />
            ))}
        </div>
    );
}

export default ProductosList;
