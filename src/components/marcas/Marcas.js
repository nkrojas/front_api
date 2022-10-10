import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { crearTipoMarca, obtenerTiposMarcas } from '../../services/MarcaService'
import Modal from '../ui/Modal'


export default function Marcas() {

  const [tipoMarcas, setTipoMarcas] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [tipoMarca, setTipoMarca] =useState({
    nombre:''
  })
 
  const listTipoMarcas = async () =>{
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerTiposMarcas(query)
      setTipoMarcas(data)
      setLoading(false)
    }catch(e){ 
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }


  useEffect(() =>{
    listTipoMarcas();
  }, [query])

  const cambiarSwitche = () =>{
    setQuery(!query)
  }
  const guardarTipoMarca = () =>{
    crearTipoMarca(tipoMarca)
  }

  const handleChange = e =>{
    setTipoMarca({
      ...tipoMarca, 
      [e.target.name]: e.target.value
    })
  }
  return (
<div>
      <Modal titulo={'Tipo de Marca'} 
      guardar={guardarTipoMarca}
      element={tipoMarca}
      change={handleChange}
      />
      <button type="button" 
      className="btn btn-primary" 
      data-bs-toggle="modal" 
      data-bs-target="#exampleModal">
        Nuevo
        </button>
      <div className="form-check form-switch">
        <input 
        className="form-check-input" 
        type="checkbox" 
        role="switch" 
        id="flexSwitchCheckChecked" 
        checked = {query}
        onChange={cambiarSwitche}
        />
        <label className="form-check-label" for="flexSwitchCheckChecked">(Inactivo / Activo)</label>
      </div>
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
            <th scope="col">Nombre</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización </th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {
            tipoMarcas.map((tipomarca, index) =>{

            return(
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{tipomarca.nombre}</td>
              <td>{tipomarca.estado ? 'Activo': 'Inactivo'}</td>
              <td>{dayjs(tipomarca.fechaCreacion).format('YYYY-MM-DD')}</td>
              <td>{dayjs(tipomarca.fechaActualizacion).format('YYYY-MM-DD')}</td>
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
