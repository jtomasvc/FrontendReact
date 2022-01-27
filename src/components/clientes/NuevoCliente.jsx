import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'

const NuevoCliente = () => {

    const Navigate = useNavigate()
    const [cliente, setCliente] = useState({
        nombre:'',
        apellido: '',
        empresa:'',
        email: '',
        telefono:''
    })

    //Leer los datos del form
    const actulizarState = e => {
        setCliente({
            ...cliente,
            [e.target.name] : e.target.value
        })
    }

    //Validar formulario
    const validarCliente = () => {
        const { nombre, apellido, email, empresa, telefono } = cliente

        let valido = !nombre.length || !apellido.length || !email.length || !empresa.length || !telefono.length;

        return valido
    }

    //Agregando CLiente
    const agregarCliente = e => {
        e.preventDefault()

        //Enviar peticion
        clienteAxios.post('/clientes', cliente)
            .then(res => {
                //Validar si hay errores de mongo
                if(res.data.code === 11000) {
                    Swal.fire({
                        icon:'error',
                        title:'Hubo un error',
                        text:'Ese cliente ya esta registrado'
                    })
                } else {
                    Swal.fire(
                        'Good job!',
                        res.data.mensaje,
                        'success'
                      )
                }
                //Redireccionar
                Navigate('/')
            })
    }

  return (
    <>
      <h2>Nuevo Cliente</h2>

        <form
            onSubmit={agregarCliente}
        >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={actulizarState}
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input 
                    type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido"
                    onChange={actulizarState}   
                />
            </div>
        
            <div className="campo">
                <label>Empresa:</label>
                <input 
                    type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    onChange={actulizarState}
                />
            </div>

            <div className="campo">
                <label>Email:</label>
                <input 
                    type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={actulizarState}
                />
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input 
                    type="number" 
                    placeholder="Teléfono Cliente" 
                    name="telefono"
                    onChange={actulizarState}
                />
            </div>

            <div className="enviar">
                <input 
                    type="submit" 
                    className="btn btn-azul" 
                    value="Agregar Cliente"
                    disabled={validarCliente()}
                />
            </div>
        </form>
    </>
  );
};

//higher order component toma un componente y retorna un nuevo componente
export default NuevoCliente;
