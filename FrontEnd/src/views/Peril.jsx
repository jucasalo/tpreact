import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import axios from 'axios';

const Perfil = () => {
    const { user, token } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        nombre: '',
        email: '',
    });

    useEffect(() => {
        // Cargar los datos del usuario cuando se monta el componente
        if (user && token) {
            setUserData({
                nombre: user.nombre,
                email: user.email,
            });
        }
    }, [user, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `/api/users/${user._id}`,
                userData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Datos actualizados con éxito');
        } catch (error) {
            alert('Error al actualizar los datos');
        }
    };

    return (
        <div>
            <h2>Mi Perfil</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={userData.nombre}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default Perfil;
