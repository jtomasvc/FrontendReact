import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = () => {

    const Navigate = useNavigate()
    const Token = localStorage.getItem('Token')

    const cerrarSesion = () => {
        //Remover el Token de localStorage
        localStorage.setItem('Token', ' ')
        //Redireccion 
        Navigate('/iniciar-sesion')
    }

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <Link
                        to={"/"} 
                    >
                        <h1>CRM - Administrador de Clientes</h1>
                    </Link>
                       {Token != ' ' ? 
                            <button
                                type="button"
                                className="btn btn-rojo"
                                onClick={() => cerrarSesion()}
                            >
                                <i className="fa fa-times-circle"></i>
                                Cerrar Sesión
                            </button>
                       :
                       <>
                            <Link 
                                to={"/crear-cuenta"} 
                                className="clientes btn btn-verde"
                             >Registrate</Link>

                            <Link 
                                to={"/iniciar-sesion"} 
                                className="clientes btn btn-verde"
                             >Iniciar Sesión</Link>
                       </>    
                       }
                </div>
            </div>
        </header>
    )
}

export default Header
