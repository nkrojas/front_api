import { axiosConfig } from "../configuration/axiosConfig";

//consultar todos los estados

const obtenerTiposEstados = (estado = true) => {
    return axiosConfig.get( 'estados?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

// crear tipo de estado

const crearTipoEstado = (data) => {
    return axiosConfig.post('estado', data, {
        headers:{
            'content-type': 'aplication/json'
        }       
    })
}

// Consultar tipo de estado por id

const obtenerTipoEstadoPorID = (tipoId) => {
    return axiosConfig.get('estado/'+tipoId, {
        headers:{
            'content-type': 'aplication/json'
        }       
    })
}


// actualizar tipo de estado por id

const editarTipoEstadoPorID = (tipoId, data) => {
    return axiosConfig.put('estado/'+tipoId, data, {
        headers:{
            'content-type': 'aplication/json'
        }       
    })
}

// borrar tipo de estado por id

const borrarTipoEstadoPorID = (tipoId) => {
    return axiosConfig.delete('estado/'+tipoId, {},{
        headers:{
            'content-type': 'aplication/json'
        }       
    })
}

export{
    obtenerTiposEstados,
    crearTipoEstado,
    obtenerTipoEstadoPorID,
    editarTipoEstadoPorID,
    borrarTipoEstadoPorID
}