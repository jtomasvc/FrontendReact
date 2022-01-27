import React from 'react';

const CantidadProducto = (props) => {

    const {producto, aumentarProductos, restarProductos, index, eliminarProducto} = props
    const { nombre, precio, cantidad } = producto
    
  return (
    <li>
        <div className="texto-producto">
            <p className="nombre">{nombre}</p>
            <p className="precio">$ {precio}</p>
        </div>
        <div className="acciones">
            <div className="contenedor-cantidad">
                <i
                    className="fas fa-minus"
                    onClick={() => restarProductos(index)}
                ></i>
                <p>{cantidad}</p>
                <i 
                    className="fas fa-plus"
                    onClick={() => aumentarProductos(index)}
                ></i>
            </div>
            <button 
                type="button" 
                className="btn btn-rojo"
                onClick={() => eliminarProducto(producto.producto)}
            >
                <i className="fas fa-minus-circle"></i>
                    Eliminar Producto
            </button>
        </div>
    </li>
  );
};

export default CantidadProducto;
