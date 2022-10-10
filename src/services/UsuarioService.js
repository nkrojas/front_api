import { axiosConfig} from "../configuration/axiosConfig";

//consultar todos los usuarios

const obtenerUsuario = (estado = true) => {
    return axiosConfig.get( 'usuarios?estado='+estado, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

// crear tipo de usuarios

const crearUsuario = (data) => {
    return axiosConfig.post('usuario', data, {
        headers:{
            'Content-type': 'application/json'
        }       
    })
}

// Consultar usuario por id

const obtenerUsuarioPorID = (tipoId) => {
    return axiosConfig.get('usuario/'+tipoId, {
        headers:{
            'Content-type': 'application/json'
        }       
    })
}


// actualizar usuario por id

const editarUsuarioPorID = (tipoId, data) => {
    return axiosConfig.put('usuario/'+tipoId, data, {
        headers:{
            'Content-type': 'application/json'
        }       
    })
}

// borrar usuario por id

const borrarUsuarioPorID = (tipoId) => {
    return axiosConfig.delete('usuario/'+tipoId, {},{
        headers:{
            'Content-type': 'application/json'
        }       
    })
}

export{
    obtenerUsuario,
    crearUsuario,
    obtenerUsuarioPorID,
    editarUsuarioPorID,
    borrarUsuarioPorID
}