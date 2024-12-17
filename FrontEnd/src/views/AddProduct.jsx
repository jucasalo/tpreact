import { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
    categoria: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const endPoint = "http://localhost:3000/api/products";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formData),
    };
  
    try {
      console.log("Enviando datos al backend:", formData); // Registro para depurar
      const response = await fetch(endPoint, config);
      if (!response.ok) {
        const errorData = await response.json(); // Leer respuesta del error
        console.error("Error al agregar producto:", errorData);
        alert(`Hubo un error: ${errorData.message || response.statusText}`);
      } else {
        const data = await response.json();
        alert("Producto agregado exitosamente");
        console.log("Respuesta del servidor:", data);
        setFormData({
          nombre: "",
          descripcion: "",
          precio: "",
          stock: "",
          imagen: "",
          categoria: "",
        });
      }
    } catch (error) {
      console.error("Error en el cliente:", error);
      alert("Error en el servidor al agregar el producto.");
    }
  };
  

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
        />
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
        <label htmlFor="imagen">Imagen URL</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
        />
        {/* Select de Categorías */}
        <div>
          <label htmlFor="categoria">Categoría</label>
          <select name="categoria" id="categoria" value={formData.categoria} onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            {['collares', 'anillos', 'aros'].map((categoria, index) => (
              <option key={index} value={categoria}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="m-2">
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
