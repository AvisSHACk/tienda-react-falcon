import React, {useState} from 'react';
import styled from 'styled-components';
import Inicio from './components/Inicio';
import Blog from './components/Blog';
import Tienda from './components/Tienda'
import Error404 from './components/Error404'
import Carrito from './components/Carrito'
import { NavLink, Route, Routes } from 'react-router-dom';

const App = () => {
    const productos = [
        {id:1, nombre: 'Producto 1'},
        {id:2, nombre: 'Producto 2'},
        {id:3, nombre: 'Producto 3'},
        {id:4, nombre: 'Producto 4'}
    ]

    const [carrito, cambiarCarrito] = useState([]);
    const agregarProductosAlCarrito = (idProductoAAgregar, nombreProducto) => {
        if(carrito.length === 0){
            cambiarCarrito([{id: idProductoAAgregar, nombre: nombreProducto, cantidad: 1}])
        } else {
            const nuevoCarrito = [...carrito];

            const yaEstaEnCarrito = nuevoCarrito.filter((productoDeCarrito) => {
                return productoDeCarrito.id === idProductoAAgregar
            }).length > 0;
            
            if(yaEstaEnCarrito){
                nuevoCarrito.forEach((productoDeCarrito, index) => {
                    if(productoDeCarrito.id === idProductoAAgregar){
                        const cantidad = nuevoCarrito[index].cantidad;
                        nuevoCarrito[index] = {
                            id: idProductoAAgregar, 
                            nombre: nombreProducto,
                            cantidad: cantidad + 1}
                    }


                })
            } else {
                nuevoCarrito.push({
                    id:idProductoAAgregar,
                    nombre:nombreProducto,
                    cantidad: 1
                })
            }

            cambiarCarrito(nuevoCarrito);
        }
    }

  return ( 
    <Contenedor>
        <Menu>
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/tienda">Tienda</NavLink>
        </Menu>
        <main>
            <Routes>
                <Route path="/" exact="true" element={<Inicio/>}/>
                <Route path="/blog" element={<Blog/>}/>
                <Route path="/tienda" element={
                    <Tienda productos={productos} agregarProductosAlCarrito={agregarProductosAlCarrito}/>} 
                />
                <Route path="*" element={<Error404/>}/>
            </Routes>
        </main>
        <aside>
            <Carrito carrito={carrito}/>
        </aside>
    </Contenedor>
   );
}
 
export default App;

const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;