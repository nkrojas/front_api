import {axiosConfig} from "../configuration/axiosConfig";

//consultar todos los usuarios

const obtenerInventarios = () => {
    return axiosConfig.get( 'inventarios', {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

// crear tipo de usuarios

const crearinventario = (data) => {
    return axiosConfig.post('inventarios', data, {
        headers:{
            'Content-type': 'application/json'
        }       
    })
}
 export {
    obtenerInventarios,
    crearinventario
 }
