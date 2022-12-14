import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { crearTipoEquipo, obtenerTiposEquipos } from '../../services/TipoEquipoService'
import Modal from '../ui/Modal'

export default function TipoEquipos() {


  const [tipoEquipos, setTipoEquipos] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [tipoEquipo, setTipoEquipo] =useState({
    nombre:''
  })
  const [errorSend, setErrorSend]= useState({
    status: false,
    msg: ''
  })
 
  const listTipoEquipos = async () =>{
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerTiposEquipos(query)
      setTipoEquipos(data)
      setLoading(false)
    }catch(e){ 
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }


  useEffect(() =>{
    listTipoEquipos();
  }, [query])

  const cambiarSwitche = () =>{
    setQuery(!query)
  }

  const guardarTipoEquipo = async () =>{
    console.log('gola')
    setLoading(true)
    try{
      const res = await crearTipoEquipo(tipoEquipo)
      console.log(res)
      setLoading(true)
      setTipoEquipo({nombre: ''})
      //listTipoEquipos()
    }catch (e){
      const {status, data} = e.response;
      // if(status ==400){
      //   console.log(data.msg)
      // }
      setErrorSend({status: true, msg: data.msg})
      console.log(e)
      setLoading(false)
    }
  }

  const handleChange = e =>{
    setTipoEquipo({
      ...tipoEquipo, 
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Modal titulo={'Tipo de equipo'} 
      guardar={guardarTipoEquipo}
      element={tipoEquipo}
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
      { errorSend.status &&( 
      <div className="alert alert-danger" role="alert">
      {errorSend.msg}
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
            <th scope="col">Fecha creaci??n</th>
            <th scope="col">Fecha actualizaci??n </th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {
            tipoEquipos.map((tipoequipo, index) =>{

            return(
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{tipoequipo.nombre}</td>
              <td>{tipoequipo.estado ? 'Activo': 'Inactivo'}</td>
              <td>{dayjs(tipoequipo.fechaCreacion).format('YYYY-MM-DD')}</td>
              <td>{dayjs(tipoequipo.fechaActualizacion).format('YYYY-MM-DD')}</td>
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

