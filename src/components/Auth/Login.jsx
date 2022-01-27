import React, { useState } from 'react';
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const Navigate = useNavigate()
    const [credenciales, setCredenciales] = useState({})

    const leerDatos = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]:e.target.value
        })
    }

    const iniciarSesion = async(e) => {
        e.preventDefault();

        //autenticar al usuario
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion', credenciales)
            //Extraer el token y ponerlo en localStorage
            const { token } = respuesta.data
            localStorage.setItem('Token',token)

            //Alerta
            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesion',
                'success'
            )

            //redireccion
            Navigate('/')

        } catch (error) {
            //console.log(error)
            if(error.response) {
                Swal.fire({
                    icon: 'error',
                    title:'Hubo un error',
                    text: error.response.data.mensaje
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title:'Hubo un error',
                    text: 'Hubo un error'
                })
            }
        }
    }

  return (
      <>
        <div className="login">
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={iniciarSesion}
                >
                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email"
                            placeholder='Email para iniciar sesión'
                            required
                            onChange={leerDatos}
                        />
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password" 
                            name="password"
                            placeholder='Password para iniciar sesión'
                            required
                            onChange={leerDatos}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Iniciar Sesión" 
                        className="btn btn-verde btn-block"
                    />
                </form>
            </div>
        </div>
      </>
  );
};

export default Login;
