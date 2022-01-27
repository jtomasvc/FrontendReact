import React from 'react';
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'

export const ListaPedidos = ({solicitado}) => {
    const { cliente, total, _id} = solicitado
    const eliminarPedido = (idPedido) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un cliente eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/pedidos/${idPedido}`)
                    .then(res => {
                        Swal.fire(
                            'Eliminado!',
                            res.data.mensaje,
                            'success'
                          )
                    })
                    
            }
          })
    }

  return (
    <li className="pedido">
        <div className="info-pedido">
            <p className="id">ID: {cliente._id}</p>
            <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

            <div className="articulos-pedido">
                <p className="productos">Artículos Pedido: </p>
                <ul>
                    {solicitado.pedido.map(articulos => (
                        <li key={solicitado._id+articulos._id}>
                            <p>Nombre Articulo: {articulos.producto?.nombre}</p>
                            <p>Precio: $ {articulos.producto?.precio}</p>
                            <p>Cantidad: {articulos.cantidad}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <p className="total">Total: {total} </p>
        </div>
        <div className="acciones">
            <button 
                type="button" 
                className="btn btn-rojo btn-eliminar"
                onClick={() => eliminarPedido(_id) }
            >
                <i className="fas fa-times"></i>
                Eliminar Pedido
            </button>
        </div>
    </li>
  );
};

export default ListaPedidos
