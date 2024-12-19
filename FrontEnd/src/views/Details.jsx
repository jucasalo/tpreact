import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userRole, setUserRole] = useState(null); // Estado para almacenar el rol del usuario
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Estado para almacenar los errores

  const { token } = useContext(AuthContext); // Obtener el token desde el contexto

  useEffect(() => {
    if (token) {
      // Decodificar el token para obtener el rol del usuario
      const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar la parte del payload del token
      setUserRole(payload.rol); // Establecer el rol del usuario
    }

    // Función para obtener los detalles del producto
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
          throw new Error("No se pudo obtener el producto");
        }
        const productData = await response.json();
        setProduct(productData); // Almacenar los datos del producto en el estado
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
        const responseData = await response.json(); // Obtener detalles de la respuesta
        console.error("Error al eliminar producto:", {
          status: response.status,
          statusText: response.statusText,
          details: responseData // Aquí puedes ver más detalles sobre el error
        });
        throw new Error(`Error al eliminar el producto: ${responseData.details}`);
      }
  
      setLoading(false);
      alert("Producto eliminado exitosamente");
      // Puedes redirigir al usuario o actualizar la vista de detalles según sea necesario
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al eliminar producto:", error.message);
    }
  };
  
  
  

  const editProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(product) 
      });
      if (!response.ok) {
        throw new Error("Error al editar el producto");
      }
      setLoading(false);
      alert("Producto editado exitosamente");
      
    } catch (error) {
      setLoading(false);
      setError(error);
      console.error("Error al editar producto:", error);
    }
  };

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
            style={{ width: "250px", height: "auto" }} // Ajuste del tamaño de la imagen
          />
        </div>
        <div className="details-description">
          <p>{product.descripcion}</p> {/* Descripción real del producto */}
          {/* Condición para mostrar los botones solo a usuarios logueados */}
          {userRole && (
            <div className="details-actions">
              <button className="edit-button" onClick={editProduct} disabled={loading}>Editar</button>
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
