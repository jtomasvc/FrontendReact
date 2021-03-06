import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

const Producto = ({producto}) => {

    const { nombre, precio, imagen, _id } = producto

    //Eliminando un producto
    const eliminarProducto = (idProducto) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un producto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'SI, Eliminar!',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                //eliminar
                const Token = localStorage.getItem('Token')
                clienteAxios.delete(`/productos/${idProducto}`, {
                    headers:{
                        Authorization: `Bearer ${Token}`
                    }
                })
                    .then(res => {
                        if(res.status === 200) {
                            Swal.fire(
                                'Eliminado!',
                                res.data.mensaje,
                                'success'
                              )
                        }
                    })
            }
          })
    }

    return (
        <>
            <li className="producto">
                    <div className="info-producto">
                        <p className="nombre">{nombre}</p>
                        <p className="precio">{precio} </p>
                        { imagen && (
                            <img src={`${import.meta.env.VITE_BASE_BACKEND_URL}/${imagen}`}/>
                        )}
                    </div>
                    <div className="acciones">
                        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
                            <i className="fas fa-pen-alt"></i>
                            Editar Producto
                        </Link>

                        <button 
                            type="button" 
                            className="btn btn-rojo btn-eliminar"
                            onClick={() => eliminarProducto(_id)}
                            >
                            <i className="fas fa-times"></i>
                            Eliminar Cliente
                        </button>
                    </div>
            </li>
        </>
    )
}

export default Producto
