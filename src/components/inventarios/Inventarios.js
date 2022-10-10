import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import {obtenerInventarios} from '../../services/InventarioSevice'
import Modal from '../ui/Modal'

export default function Inventarios() {
  

  const [tipoInventarios, setTipoInventarios] = useState([])
   const [loading] = useState(false)
  // const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
 
  const listTipoInventarios = async () => {
    const { data } = await obtenerInventarios(true)
    setTipoInventarios(data)
  }


  useEffect(() =>{
    listTipoInventarios();
  }, [])

  // const cambiarSwitche = () =>{
  //   setQuery(!query)
  // }

  return (
    <div>
    {/* <div className="form-check form-switch">
      <input 
      className="form-check-input" 
      type="checkbox" 
      role="switch" 
      id="flexSwitchCheckChecked" 
      checked = {query}
      onChange={cambiarSwitche}
      />
      <label className="form-check-label" for="flexSwitchCheckChecked">(Inactivo / Activo)</label>
    </div> */}
    {
      loading &&(<div className='d-flex  justify-content-center'>
      <div className="spinner-border text-info" role="status">
      <span className="visually-hidden">Loading...</span>
   </div>
   </div>)
    }
    { error &&( 
    <div className="alert alert-danger" role="alert">
    Error al cargar datos
    </div>)
  }
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Serial</th>
          <th scope="col">Modelo</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Foto</th>
          <th scope="col">Color</th>
          <th scope='col'>Fecha Compra</th>
          <th scope='col'>Precio</th>
          <th scope='col'>Usuario</th>
          <th scope='col'>Marca</th>
          <th scope='col'>Estado</th>
          <th scope='col'>Tipo Equipo</th>
          <th scope='col'></th>
        </tr>
      </thead>
      <tbody>
        {
          tipoInventarios.map((tipoInventario, index) =>{

          return(
            <tr>
            <th scope="row">{index + 1}</th>
            <td>{tipoInventario.serial}</td>
            <td>{tipoInventario.modelo}</td>
            <td>{tipoInventario.descripcion}</td>
            <td>{tipoInventario.foto}</td>
            <td>{tipoInventario.color}</td>
            <td>{dayjs(tipoInventario.fechaCompra).format('YYYY-MM-DD')}</td>
            <td>{tipoInventario.precio}</td>
            { tipoInventario.usuario != null ? <td>{ tipoInventario.usuario.nombre}</td> : <td></td>}
            {tipoInventario.marca != null ?<td>{tipoInventario.marca.nombre} </td> : <td></td>}
            {tipoInventario.estado != null ?<td>{tipoInventario.estado.nombre} </td> : <td></td>}
            {tipoInventario.tipoEquipo != null ?<td>{tipoInventario.tipoEquipo.nombre} </td> : <td></td>}
            
            <td>
            <button type="button" className="btn btn-success">Editar</button>
            <button type="button" className="btn btn-danger">Eliminar</button>
            </td>
          </tr>
          )
          })
        }
      </tbody>
    </table>

  </div>
  )
}
