import dayjs from 'dayjs'
import React, { useEffect, useState} from 'react'
import { obtenerUsuario, crearUsuario } from '../../services/UsuarioService'
import Modal2 from '../ui/Modal2'

export default function Usuarios() {
 
  const [tipoUsuarios, setTipoUsuarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState(true)
  const [error, setError] = useState(false)
  const [tipoUsuario, setTipoUsuario] =useState({
    nombre:''
  })

  const listTipoUsuarios = async () =>{
    setLoading(true)
    try{
      setError(false)
      const { data } = await obtenerUsuario(query)
      setTipoUsuarios(data)
      setLoading(false)
    }catch(e){ 
      console.log(e)
      setError(true)
      setLoading(false)
    }
  }


  useEffect(() =>{
    listTipoUsuarios();
  }, [query])

  const cambiarSwitche = () =>{
    setQuery(!query)
  }

  const guardarTipoUsuario = () => {
    crearUsuario(tipoUsuario)
  }

  const handleChange = e =>{
    setTipoUsuario({
      ...tipoUsuario, 
      [e.target.name]: e.target.value
    })
  }
  return (
<div>
      <Modal2 titulo={'Usuario'} 
      guardar={guardarTipoUsuario}
      element={tipoUsuario}
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
            <th scope="col">Email</th>
            <th scope="col">Estado</th>
            <th scope="col">Fecha creación</th>
            <th scope="col">Fecha actualización </th>
            <th scope='col'></th>
          </tr>
        </thead>
        <tbody>
          {
            tipoUsuarios.map((tipousuario, index) =>{

            return(
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{tipousuario.nombre}</td>
              <td>{tipousuario.email}</td>
              <td>{tipousuario.estado ? 'Activo': 'Inactivo'}</td>
              <td>{dayjs(tipousuario.fechaCreacion).format('YYYY-MM-DD')}</td>
              <td>{dayjs(tipousuario.fechaActualizacion).format('YYYY-MM-DD')}</td>
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
