import axios from 'axios';
import {Storage} from '@ionic/storage';

export const updateAsistencia = async (rut: string, idFecha: number) => {
    const storage = new Storage;
    await storage.create();
    try {
        const token = await storage.get("token");
        const response = await axios.put(
        `http://localhost:3001/api/clases/update/${rut}/${idFecha}`, // URL con parámetros
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Si necesitas autenticación
          }
        }
      );
  
      console.log('Respuesta del servidor:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar la asistencia:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error de respuesta:', error.response?.data);
      }
    }
};
  