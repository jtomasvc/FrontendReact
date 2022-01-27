import React, { useState } from 'react';
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const CrearCuenta = () => {
  const Navigate = useNavigate()
  const [datos, setDatos] = useState({})

  const leerDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]:e.target.value
    })
  }

  const crearCuenta = async(e) => {
    e.preventDefault();

    //Crear cuenta
    try {
        await clienteAxios.post('/crear-cuenta', datos )
        //redireccion
        Navigate('/iniciar-sesion')
    } catch (error) {
       console.log(error)
       Swal.fire({
          icon: 'error',
          title:'Hubo un error',
          text: error.response.data.mensaje
       })
    }

  }

  return (
      <>
        <h2>Crea tu cuenta</h2>
        <div className="cuenta">
          <div className="contenedor-formulario">
              <form
                onSubmit={crearCuenta}
              >
                  <div className="campo">
                      <label>Email</label>
                      <input 
                          type="email" 
                          name="email"
                          placeholder='Tu email'
                          required
                          onChange={leerDatos}
                      />
                  </div>

                  <div className="campo">
                      <label>Nombre Usuario</label>
                      <input 
                          type="text" 
                          name="nombre"
                          placeholder='Tu nombre de usuario'
                          required
                          onChange={leerDatos}
                      />
                  </div>

                  <div className="campo">
                      <label>Password</label>
                      <input 
                          type="password" 
                          name="password"
                          placeholder='Tu contraseña'
                          required
                          onChange={leerDatos}
                      />
                  </div>

                  <input 
                      type="submit" 
                      value="Crea tu cuenta" 
                      className="btn btn-verde btn-block"
                  />
              </form>
          </div>
        </div>
      </>
  );
};

export default CrearCuenta;
