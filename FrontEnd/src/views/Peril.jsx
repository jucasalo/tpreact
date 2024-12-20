import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import axios from 'axios';

const Perfil = () => {
    const { user, token, setUser } = useContext(AuthContext); // Usamos 'user', 'token' y 'setUser'
    const [userData, setUserData] = useState({
        nombre: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        if (user) {
            setUserData({
                nombre: user.nombre,
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        if (!user || !user._id) {
            alert('No estás autenticado. Por favor, inicia sesión.');
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.put(
                `http://localhost:3000/api/users/putactualizar/${user._id}`,
                { nombre: userData.nombre },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Envía el token aquí
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            // Actualizar el contexto con los datos nuevos del usuario
            setUser({ ...user, nombre: response.data.nombre });
            alert('Datos actualizados con éxito');
        } catch (error) {
            setError('Error al actualizar los datos');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Mi Perfil</h2>
            {error && <div className="error">{error}</div>} {/* Mostrar mensaje de error si existe */}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={userData.nombre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Actualizando...' : 'Actualizar'}
                </button>
            </form>
        </div>
    );
};

export default Perfil;
