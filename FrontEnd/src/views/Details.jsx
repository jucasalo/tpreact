import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Función para obtener los detalles del producto
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el producto');
        }
        const productData = await response.json();
        setProduct(productData); // Almacenar los datos del producto en el estado
      } catch (error) {
        console.error('Error al obtener producto:', error);
        alert('Hubo un problema al obtener los detalles del producto');
      }
    };

    fetchProduct();
  }, [id]); // Ejecutar solo cuando el id cambie

  if (!product) {
    return <p>Cargando...</p>; // Mientras se carga el producto
  }

  return (
    <div className="details-container">
      <h2 className="details-title">Detalle de la pieza: {product.nombre}</h2>
      <div className="details-content">
        <div className="details-image">
          {/* Imagen del producto */}
          <img
            src={product.imagen} // Imagen real del producto
            alt={`Pieza de joyería ${product.nombre}`}
            style={{ width: '250px', height: 'auto' }} // Ajuste del tamaño de la imagen
          />
        </div>
        <div className="details-description">
          <p>{product.descripcion}</p> {/* Descripción real del producto */}
          {/* <button className="details-button">Añadir al carrito</button> */}
        </div>
      </div>
    </div>
  );
};

export default Details;
