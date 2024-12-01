import axios  from 'axios';
import { isAxiosError } from 'axios';
import { Storage } from '@ionic/storage';


export const ramosAction = async ()=>{
    
    const storage = new Storage();
    await storage.create();

    try {
        const rut =  await storage.get("rut"); 
        const token =  await storage.get("token");
        const { data } = await axios.get(`http://localhost:3001/api/ramos/${rut}`, {
            headers: {
                "Content-Type": 'json',
                'Authorization': `Bearer ${token}`,
            }
      });
      console.log(data)
       return data;
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

export const RamoSeccion = async (section: string) => {
    // Obtener el arreglo de ramos (puedes usar la respuesta de la petición axios aquí)
    const ramos = await ramosAction();  // Asumimos que ramosAction ya devuelve el arreglo de ramos


    // Verificar si `data` existe y es un arreglo
    if (!ramos || !Array.isArray(ramos)) {
      console.log('Datos de ramos no encontrados o en formato incorrecto.');
      return null;  // Si no se encuentra `data` o no es un arreglo, retornamos null
    }

    // Buscar el ramo con la sección proporcionada
    const ramo = ramos.find((ramo: { seccion: string; }) => ramo.seccion === section);

    // Si se encuentra el ramo
    if (ramo) {
        // Crear o acceder al almacenamiento de Ionic
        const storage = new Storage();
        await storage.create();

        // Guardar el ID del ramo encontrado en el almacenamiento
        await storage.set('ramoId', ramo.id as string);

        console.log(`ID del ramo con sección ${section}:`, ramo.id);

        return ramo.id;  // Retorna el ID encontrado (puedes usarlo donde lo necesites)
    } else {
        console.log('No se encontró un ramo con esa sección.');
        return null;  // Si no se encuentra ningún ramo con esa sección, retornar null
    }
};