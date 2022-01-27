import React, { useEffect, useState} from 'react'
import Producto from '../productos/Producto'
import { Link } from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner'
import { useNavigate } from 'react-router-dom'

const Productos = () => {

    const [productos, setProductos] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const Token = localStorage.getItem('Token')
        if(!Token == '') {
            //Query a la API
            const consultarAPI = async () => {
                try {
                    const productosConsulta = await clienteAxios.get('/productos', {
                        headers:{
                            Authorization: `Bearer ${Token}`
                        }
                    })
                    setProductos(productosConsulta.data)
                } catch (error) {
                    //Error con la autorizacion
                    if(error.response.status = 500) {
                        Navigate('/iniciar-sesion')
                    }
                }
            }
            consultarAPI()
        } else {
            Navigate('/iniciar-sesion') 
        }
    }, [productos])

    //Spinner de carga
    if(!productos.length) return <Spinner/>

    return (
        <>
            <h2>Desde Productos</h2>

            <Link to={"/productos/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
               {productos.map(producto=>(
                   <Producto
                       key={producto._id}
                       producto={producto}
                   />
               ))}
            </ul>
        </>
    )
}

export default Productos
