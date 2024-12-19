import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import axios from 'axios';

function Card(props) {
    const eliminarProducto = async (productoId) => {
        try {
            const token = localStorage.getItem('token'); // Recuperar el token del almacenamiento local
            if (!token) {
                alert('Debes iniciar sesión para eliminar productos.');
                return;
            }

            await axios.delete(`http://localhost:3000/productos/${productoId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Lógica para actualizar el estado de la vista o la lista de productos
            props.actualizarListaProductos();
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('No tienes permiso para eliminar este producto.');
        }
    }

    return (
        <div className="card">
            <h4>{props.texto}</h4>
            <hr />
            <img src={props.foto} alt={props.nombre} />
            <p>$ {props.precio}</p>
            <Link to={`/details/${props.id}`}>Detalle</Link>
        </div>
    );
}

export default Card;
