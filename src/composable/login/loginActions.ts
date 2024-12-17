import axios  from 'axios';
import { isAxiosError } from 'axios';




export const loginAction = async (email: string, password: string)=>{
    try {
       const { data } = await axios.post(`https://api-registrapp-nx3w.onrender.com/api/user/login`,{
            email,
            contrasena: password
       });

       return {
            estatus: 'ok',
            id: data.id,
            nombre: data.nombre,
            rut: data.rut,
            rol: data.rol,
            token: data.token
        }
    } catch (error) {
        if(isAxiosError(error)){
            if(error.response?.status === 401){
                return {
                    status: 401,
                    msg: 'Sin autorización'
                }
            }
        }
        console.log(error)
        throw new Error('No se pudo hacer la petición')
    }
};

