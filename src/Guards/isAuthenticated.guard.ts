import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Storage } from '@ionic/storage';
import { status } from '@/composable/login/interface/enum-auth';

export const noPasaP = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const storage = new Storage();
  await storage.create() 
  try {
    
    // Obtiene el rol y verifica el estado de autenticación
    const Status = await storage.get('status');
    const rol = await storage.get('rol');
    // Verifica si estás logeado.
    if (Status === status.Authenticated || rol === 'PROFESOR' ) {
        next({name: 'HomeTeacher'}); 
    } else if (Status === status.Authenticated || rol === 'ALUMNO'){
        next({name: 'HomeStuden'}); 
    } else {
        next(); // Permite la navegación
    }
  } catch (error) {
    console.error('Error al verificar el rol o crear el almacenamiento:', error);
    next({ name: 'NotFound' }); // Redirige a una página de error si hay problemas
  }
};




export default noPasaP;