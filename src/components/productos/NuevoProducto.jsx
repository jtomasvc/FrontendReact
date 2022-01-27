import React, { useState } from 'react'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'
import { useNavigate } from 'react-router-dom'


const NuevoProducto = () => {

    const Navigate = useNavigate()
    const [producto, setProducto] = useState({
        nombre:'',
        precio:''
    });

    const [archivo, setArchivo] = useState('')

     //Almacena en base de datos
     const agregarProducto = async e => {
        e.preventDefault()

        //Crear un formData
        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        //almacenar en base de datos
        try {
            const res = await clienteAxios.post('/productos', formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            //Lanzar alerta
            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.mensaje,
                    'success'
                )
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                type:'error', 
                title:'Hubo un error', 
                text:'Vuelva a intentarlo'
            })
        }
        //Redireccionar
        Navigate('/productos')
    }

    //Leer datos del formulario
    const leerInformacion = e => {
        setProducto({
            ...producto,
            [e.target.name]:e.target.value
        })
    }

    const leerArchivo = e => {
        setArchivo(e.target.files[0])
    }


    return (
        <div>
            <h2>Nuevo Producto</h2>

            <form
                onSubmit={agregarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"
                        onChange={leerInformacion}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="precio"
                        min="0.00" 
                        step="1" 
                        placeholder="Precio"
                        onChange={leerInformacion}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input 
                        type="file"  
                        name="imagen"  
                        onChange={leerArchivo}   
                    />
                </div>

                <div className="enviar">
                    <input 
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Producto"        
                    />
                </div>
            </form>
        </div>
    )
}

export default NuevoProducto
