import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import Cliente from '../clientes/Cliente'
import clienteAxios from '../../config/axios'
import Spinner from '../layout/Spinner'
import { useNavigate } from 'react-router-dom'



const Clientes = () => {
    const [clientes, setClientes] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const Token = localStorage.getItem('Token')
        if(!Token == '') {
            //Query a la API
            const consultarAPI = async () => {
                try {
                    const clientesConsulta = await clienteAxios.get('/clientes', {
                        headers:{
                            Authorization: `Bearer ${Token}`
                        }
                    })
                    setClientes(clientesConsulta.data)
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
    }, [clientes])

    if(!clientes.length) return <Spinner/>

    return (
        <>
            <h2>clientes</h2>
            <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <ul className="listado-clientes">
                {clientes.map(cliente =>(
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                    />
                ))}
            </ul>
        </>
    )
}

export default Clientes
