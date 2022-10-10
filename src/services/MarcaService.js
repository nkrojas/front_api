import { axiosConfig } from "../configuration/axiosConfig";

//consultar todos los tipos de marca

const obtenerTiposMarcas = (estado = true) => {
    return axiosConfig.get('marcas?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

// crear tipo de equipo

const crearTipoMarca = (data) => {
    return axiosConfig.post('marca', data, {
        headers:{
            'content-type': 'aplication/json'
        }       
    })
}

// Consultar tipo de equipo por id

const obtenerTipoMarcaPorID = (tipoId) => {
    return axiosConfig.get('marca/'+tipoId, {
        headers:{
            'content-type': 'aplication/json'
        }       
    })
}


// actualizar tipo de equipo por id

const editarTipoMarcaPorID = (tipoId, data) => {
    return axiosConfig.put('marca/'+tipoId, data, {
        headers:{
            'content-type': 'aplication/json'
        }       
    })
}

// borrar tipo de equipo por id

const borrarTipoMarcaPorID = (tipoId) => {
    return axiosConfig.delete('marca/'+tipoId, {},{
        headers:{
            'content-type': 'aplication/json'
        }       
    })
}

export{
    obtenerTiposMarcas,
    crearTipoMarca,
    obtenerTipoMarcaPorID,
    editarTipoMarcaPorID,
    borrarTipoMarcaPorID
}