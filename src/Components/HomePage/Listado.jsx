import React from 'react'
import { Navigate} from 'react-router-dom';


const Listado = () => {
    let validarToken=localStorage.getItem("token");  
  return (
    <>
        { !validarToken? <Navigate to={"/"}/>: 
        <>
        <h1>listado</h1>
        <p>soy el listado</p>
        </>
        }
    </>
  )
}

export default Listado