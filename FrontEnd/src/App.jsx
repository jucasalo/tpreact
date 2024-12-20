import './App.css';

// Importo las vistas
import Home from './views/Home';
import Contact from './views/Contact';
import Details from './views/Details';
import Login from './views/Login';
import Registro from './views/Registro';
import NotFound from './views/NotFound';
import Perfil from './views/Peril';  // Corregido el nombre de la importación
import ProductosList from "./components/ProductList";  // Corregido el nombre de la importación
import AddProduct from './views/AddProduct';  // Importamos la vista de agregar producto
import { Routes, Route, NavLink } from 'react-router-dom';
import { PrivateRoute } from './utils/PrivateRoute';

import { AuthProvider } from './utils/AuthContext';

function App() {
  return (
    <div>
      <h1> Final Aplicaciones Híbridas</h1>
      <hr />
      <nav>
        <ul>
          <li>
            <NavLink to='/'> Inicio</NavLink>
          </li>
          <li>
            <NavLink to='/perfil'> Perfil</NavLink>
          </li>
          <li>
            <NavLink to='/registro'> Registro</NavLink>
          </li>
          <li>
            <NavLink to='/login'> Login </NavLink>
          </li>
          <li>
            <NavLink to='/add-product'> Agregar Producto</NavLink>  {/* Nueva opción en el menú */}
          </li>
        </ul>
      </nav>

      { /* El área donde se van a mostrar los componentes (Vistas)  */}

      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/perfil' element={
            <PrivateRoute>
              <Perfil /> 
            </PrivateRoute>
          } /> */}
           <Route path='/perfil' element={<Perfil />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/details/:id' element={<Details />} />
          <Route path='/registro' element={<Registro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/add-product' element={<AddProduct />} />  {/* Ruta para el formulario */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App;
