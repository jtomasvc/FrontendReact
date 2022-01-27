import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom'

const EditarCliente = () => {

    const { id } = useParams();
    const Navigate = useNavigate()
    const [cliente, setCliente] = useState({
        nombre:'',
        apellido: '',
        empresa:'',
        email: '',
        telefono:''
    })

    //Query a la API
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`)
        setCliente(clienteConsulta.data)
    }
    
    useEffect(() => {
        consultarAPI()
    }, [])

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

    //Envia peticion para actualizar Cliente
    const actualizarCliente = e => {
        e.preventDefault();

        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
            .then(res => {
                //Validar si hay errores de mongo
                if(res.data.code === 11000) {
                    Swal.fire({
                        icon:'error',
                        title:'Hubo un error',
                        text:'Algo fallo actualizando'
                    })
                } else {
                    Swal.fire(
                        'Correcto',
                        'Se actualizo correctamente',
                        'success'
                      )
                }
            })
            Navigate('/')
    }

  return (
    <>
      <h2>Editar Cliente</h2>

        <form
            onSubmit={actualizarCliente}
        >
            <legend>Llena todos los campos</legend>

            <div className="campo">
                <label>Nombre:</label>
                <input 
                    type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    value={cliente.nombre}
                    onChange={actulizarState}
                />
            </div>

            <div className="campo">
                <label>Apellido:</label>
                <input 
                    type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido"
                    value={cliente.apellido}
                    onChange={actulizarState}   
                />
            </div>
        
            <div className="campo">
                <label>Empresa:</label>
                <input 
                    type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    value={cliente.empresa}
                    onChange={actulizarState}
                />
            </div>

            <div className="campo">
                <label>Email:</label>
                <input 
                    type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    value={cliente.email}
                    onChange={actulizarState}
                />
            </div>

            <div className="campo">
                <label>Teléfono:</label>
                <input 
                    type="number" 
                    placeholder="Teléfono Cliente" 
                    name="telefono"
                    value={cliente.telefono}
                    onChange={actulizarState}
                />
            </div>

            <div className="enviar">
                <input 
                    type="submit" 
                    className="btn btn-azul" 
                    value="Guardar Cambios"
                    disabled={validarCliente()}
                />
            </div>
        </form>
    </>
  );
};

//higher order component toma un componente y retorna un nuevo componente
export default EditarCliente;
