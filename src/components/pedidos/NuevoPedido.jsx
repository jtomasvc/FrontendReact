import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import CantidadProducto from './CantidadProducto';
import { useNavigate } from 'react-router-dom'

const NuevoPedido = () => {
    //Extraer ID de cliente
    const { id } = useParams();
    const Navigate = useNavigate()

    const [cliente, setCliente] = useState({})
    const [buscar, setBuscar] = useState('')
    const [busquedaProducto, setBusquedaProducto] = useState([])
    const [total, setTotal] = useState(0)

    //Obtener cliente
    const consultaAPI = async () => {
        //consultar cliente actual
        const resultado = await clienteAxios.get(`/clientes/${id}`)
        setCliente(resultado.data)
    }

    useEffect(() => {
        consultaAPI()
        actualizarTotal()
    },[busquedaProducto])

    const  {nombre, apellido, telefono } = cliente

    //Almacenar la busqueda
    const leerDatosBusqueda = (e) => {
        setBuscar(e.target.value)
    }

    //Buscar producto
    const buscarProducto = async (e) => {
        e.preventDefault()

        //Obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${buscar}`)

        //Si no hay resultado 
        if(resultadoBusqueda.data[0]) {
            let productoResultado = resultadoBusqueda.data[0]
            //Agregar la llave producto
            productoResultado.producto = resultadoBusqueda.data[0]._id
            productoResultado.cantidad = 0
            //Ponerlo en el state
            setBusquedaProducto([...busquedaProducto, productoResultado])
        } else {
            Swal.fire({
                icon:'error',
                title:'No hay resultados',
                text:'No hay resultados'
            })
        }
    }

    //Actualizar la cantidad de Productos
    const restarProductos = (index) => {
        //copiar el arreglo original
        const todosProductos = [...busquedaProducto]
        //validar si es 0
        if(todosProductos[index].cantidad === 0) return 
        //decremento
        todosProductos[index].cantidad--
        //enviarlo al state
        setBusquedaProducto(todosProductos)
    }

    const aumentarProductos = (index) => {
        const todosProductos = [...busquedaProducto]
        todosProductos[index].cantidad++
        setBusquedaProducto(todosProductos)
    }

    //Actualizar el total a pagar
    const actualizarTotal = () => {
        //si es igual a 0 es 0
        if(busquedaProducto.length === 0) {
            setTotal(0)
            return
        }

        //Calcular el total
        let nuevoTotal = 0
        //Recorrer productos, cantidades y precios
        busquedaProducto.map(producto => nuevoTotal += (producto.cantidad * producto.precio ))

        //Almacenar total
        setTotal(nuevoTotal)
    }

    //elimina un producto del state
    const eliminarProducto = id => {
        const todosProductos = busquedaProducto.filter(producto => producto.producto !== id)
        setBusquedaProducto(todosProductos)
    }

    //Agregar el pedido
    const agregarPedido = async (e) => {
        e.preventDefault()
        //Construir el objeto
        const pedido = {
            "cliente": id,
            "pedido" : busquedaProducto,
            "total": total
        }

        //Almacenar en BD
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido)

        //leer resultado
        if(resultado.status === 200) {
            Swal.fire({
                icon: "success",
                title:"Correcto",
                text:resultado.data.mensaje
            })
        } else {
            Swal.fire({
                icon:"error",
                title: "Hubo un error",
                text: "Vuelta a intentarlo"
            })
        }

        //Redireccion
        Navigate('/pedidos')
    }

  return (
      <>
        <h2>Nuevo Pedido</h2>

        <div className="ficha-cliente">
            <h3>Datos de Cliente</h3>
            <p>Nombre: {nombre} {apellido}</p>
            <p>Telefono: {telefono}</p>
        </div>

        <form
            onSubmit={buscarProducto}
        >
            <legend>Busca un Producto y agrega una cantidad</legend>

            <div className="campo">
                <label>Productos:</label>
                <input 
                    type="text" 
                    placeholder="Nombre Productos" 
                    name="productos"
                    onChange={leerDatosBusqueda}
                />
            </div>

            <input
                type="submit"
                className="btn btn-azul btn-block"
                value="Buscar Producto"
            />
            <ul className="resumen">
                {busquedaProducto.map((producto, index) => (
                    <CantidadProducto
                        key={producto.producto}
                        producto={producto}
                        restarProductos={restarProductos}
                        aumentarProductos={aumentarProductos}
                        index={index}
                        eliminarProducto={eliminarProducto}
                    />
                ))}
            </ul>
            <p className="total">Total a Pagar:<span>$ {total} </span></p>
        </form>

        { total > 0 && (
            <form
                onSubmit={agregarPedido}
            >
                <input
                    type="submit"
                    className="btn btn-verde btn-block"
                    value="Realizar pedido"
                />
            </form>
        )}
      </>
  );
};

export default NuevoPedido;
