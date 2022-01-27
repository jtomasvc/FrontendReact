import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { useParams } from 'react-router-dom'

const EditarProducto = () => {

    //Obtener el ID
    const { id } = useParams();
    //Navegacion
    const Navigate = useNavigate()

    //state del producto
    const [producto, setProducto] = useState({
        nombre:'',
        precio:'',
        imagen:''
    })

    const [archivo, setArchivo] = useState('')

    //Consultar el API para traer el producto a editar
    const consultarAPI = async () => {
        const productoConsulta = await clienteAxios.get(`/productos/${id}`)
        setProducto(productoConsulta.data.producto)
    }

    useEffect(() => {
        consultarAPI()
    }, [])

    //Leer datos del formulario
    const leerInformacion = e => {
        setProducto({
            ...producto,
            [e.target.name]:e.target.value
        })
    }

    const leerArchivo =  e => {
        setArchivo(e.target.files[0])
    }

    //Extraer los valores del state
    const { nombre, precio, imagen } = producto

    //Modificando el registro
    const editarProducto = async (e) => {
        e.preventDefault();

        //Crear un formData
        const formData = new FormData()
        formData.append('nombre', producto.nombre)
        formData.append('precio', producto.precio)
        formData.append('imagen', archivo)

        //almacenar en base de datos
        try {
            const res = await clienteAxios.put(`/productos/${id}`, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
            //Lanzar alerta
            if(res.status === 200) {
                Swal.fire(
                    'Actualizado Correctamente',
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

    return (
        <>
            <h2>Edita tu producto</h2>

            <form
               onSubmit={editarProducto} 
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="nombre"
                        onChange={leerInformacion}
                        defaultValue={nombre}
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
                        defaultValue={precio}
                        onChange={leerInformacion}
                    />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    {imagen && (
                        <img src={`${import.meta.env.VITE_BASE_BACKEND_URL}/${imagen}`} alt='imagen' width="300"/>
                    )}
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
                        value="Actualiza Producto"        
                    />
                </div>
            </form>
        </>
    )
}

export default EditarProducto
