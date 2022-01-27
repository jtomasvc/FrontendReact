import React, { useEffect, useState} from 'react'
import clienteAxios from '../../config/axios'
import ListaPedidos from './ListaPedidos'
import Spinner from '../layout/Spinner'
import { useNavigate } from 'react-router-dom'

const Pedidos = () => {

    const [pedidos, setPedidos] = useState([])
    const Navigate = useNavigate()

    useEffect(() => {
        const Token = localStorage.getItem('Token')
        if(!Token == ''){
            const consultarAPI = async () => {
                try {
                    const resultado = await clienteAxios.get('/pedidos', {
                        headers:{
                            Authorization: `Bearer ${Token}`
                        }
                    })
                    setPedidos(resultado.data)
                } catch (error) {
                    //Error con la autorizacion
                    if(error.response.status = 500) {
                        Navigate('/iniciar-sesion')
                    }                   
                }
            } 
            consultarAPI()
        } else {

        }
    }, [pedidos])

    if(!pedidos.length) return <Spinner/>
    return (
        <>
            <h2>Tus pedidos</h2>

            <ul className="listado-pedidos">
                {pedidos.map(solicitado => (
                    <ListaPedidos
                        key={solicitado._id}
                        solicitado={solicitado}
                    />
                ))}
            </ul>
        </>
    )
}

export default Pedidos
