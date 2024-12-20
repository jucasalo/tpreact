import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener el producto");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error("Error al obtener producto:", error);
        alert("Hubo un problema al obtener los detalles del producto");
      }
    };

    fetchProduct();
  }, [id, token]);

  const deleteProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      setLoading(false);
      alert("Producto eliminado exitosamente");
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al eliminar producto:", error.message);
    }
  };

  if (!product) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="details-container">
      <h2 className="details-title">Detalle de la pieza: {product.nombre}</h2>
      <div className="details-content">
        <div className="details-image">
          <img
            src={product.imagen}
            alt={`Pieza de joyería ${product.nombre}`}
            style={{ width: "250px", height: "auto" }}
          />
        </div>
        <div className="details-description">
          <p>{product.descripcion}</p>
          {user && (
            <div className="details-actions">
              <button className="delete-button" onClick={deleteProduct} disabled={loading}>Eliminar</button>
            </div>
          )}
          {error && <p className="error-message">Hubo un error: {error.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Details;
