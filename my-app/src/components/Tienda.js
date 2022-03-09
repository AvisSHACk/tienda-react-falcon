import React from "react";
import Productos from "./Productos";
const Tienda = ({productos, agregarProductosAlCarrito}) => {
    return ( 
        <div>
            <h1>Tienda</h1>
            <Productos productos={productos} agregarProductosAlCarrito={agregarProductosAlCarrito}/>
        </div>
     );
}
 
export default Tienda; 