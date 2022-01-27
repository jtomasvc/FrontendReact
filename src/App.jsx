import React, { useContext } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'

import Clientes from './components/clientes/Clientes'
import NuevoCliente from './components/clientes/NuevoCliente'
import EditarCliente from './components/clientes/EditarCliente'

import Productos from './components/productos/Productos'
import EditarProducto from './components/productos/EditarProducto'
import NuevoProducto from './components/productos/NuevoProducto'

import Pedidos from './components/pedidos/Pedidos'
import NuevoPedido from './components/pedidos/NuevoPedido'

import Login from './components/Auth/Login'
import CrearCuenta from './components/Auth/CrearCuenta'


function App() {

  console.log(import.meta.env.VITE_BASE_BACKEND_URL)

  return (
   <Router>
    <>
        <Header/>

        <div className="grid contenedor contenido-principal">
          <Navegacion/>

          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes/>}/>

              <Route path="/clientes/nuevo" element={<NuevoCliente/>}/>
              <Route path="/clientes/editar/:id" element={<EditarCliente/>}/>

              <Route path="/productos" element={<Productos/>}/>
              <Route path="/productos/nuevo" element={<NuevoProducto/>}/>
              <Route path="/productos/editar/:id" element={<EditarProducto/>}/>

              <Route path="/pedidos" element={<Pedidos/>}/>
              <Route path="/pedidos/nuevo/:id" element={<NuevoPedido/>}/>

              <Route path="/iniciar-sesion" element={<Login/>}/>
              <Route path="/crear-cuenta" element={<CrearCuenta/>}/>
            </Routes>
          </main>
        </div>
    </>
   </Router>
  )
}

export default App
