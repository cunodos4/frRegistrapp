import axios  from 'axios';
import { isAxiosError } from 'axios';
import { Storage } from '@ionic/storage';




export const loginAction = async (email: string, password: string)=>{
    const storage = new Storage();
    storage.create();
    try {
       const { data } = await axios.post(`https://registraapp-api.onrender.com/api/user/login`,{
            email,
            contrasena: password
       });
       console.log(data.id);
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

