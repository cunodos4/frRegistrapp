import { useRoute } from 'vue-router';
import axios from 'axios';
import { Storage } from '@ionic/storage';
import { RamoSeccion } from '@/composable/teacher/ramosAction'


export const getDates = async ()=>{
    const route = useRoute();
    const storage = new Storage();
    await storage.create();
    try {
        const id = await storage.get('id');
        const token = await storage.get('token');
        const seccion = route.params.seccion as string;
        const ramoId = await RamoSeccion(seccion);
        await storage.get('ramoId');
        const { data } = await axios.get(`http://localhost:3001/api/clases/${id}/${ramoId}`, {
            headers: {
                    'Authorization': `Bearer ${token}`,
            }
        });
        console.log(data)
        
        return data
    } catch (error) {
        console.error(error);
    }
} 