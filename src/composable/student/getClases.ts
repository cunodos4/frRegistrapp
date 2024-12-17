import axios from 'axios';
import { Storage } from '@ionic/storage';


// Función para obtener clases por userId y ramoId
export const getClasesByUserAndRamo = async (userId: number, ramoId: number) => {
    const storage = new Storage();
    await storage.create();
    const token = await storage.get("token");
    try {
    const response = await axios.get(
      `http://localhost:3001/api/clases/${userId}/${ramoId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Token de autenticación
        },
      }
    );

    return response.data; // Retorna los datos obtenidos
  } catch (error) {
    console.error("Error al obtener las clases:", error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};
