import React from 'react'

const Buscador = ({submit}) => {

  return (
    <form onSubmit={submit}>
    <label>
      <input type="text" placeholder="buscar peliculas" name='buscar'/>
    </label>
    <button>Buscar</button>
   </form>
  )
}

export default Buscador