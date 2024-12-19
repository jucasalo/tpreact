import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext); // Contexto para la autenticación
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Enviando Formulario');
            console.log(formData);

            const endPoint = 'http://127.0.0.1:3000/api/users/login';
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(formData)
            };

            const response = await fetch(endPoint, config);
            if (!response.ok) {
                console.error('Error en la respuesta del servidor', response);
                alert('Usuario o contraseña inválidos');
                return;
            }

            const data = await response.json();
            console.log('Respuesta del servidor:', data);

            // Guardar el token en localStorage
            if (data.token) {
                console.log(localStorage.getItem("token"));
                alert("Inicio de sesión exitoso");
                login(data.usuario, data.token); // Actualizar estado de autenticación en el contexto
                navigate('/'); // Redirigir al inicio
            } else {
                alert('Usuario o contraseña inválidos');
            }

            setFormData({ email: '', password: '' }); // Limpiar formulario
        } catch (error) {
            console.error('Error en el cliente:', error);
            alert('Error del Servidor');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="card p-4">
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    onChange={handleChange} 
                    value={formData.email} 
                    required 
                />

                <label htmlFor="password">Contraseña</label>
                <input 
                    type="password" 
                    name="password" 
                    onChange={handleChange} 
                    value={formData.password} 
                    required 
                />

                <button type="submit" className="m-2">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
