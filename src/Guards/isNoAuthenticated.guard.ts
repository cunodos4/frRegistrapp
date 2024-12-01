import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Storage } from '@ionic/storage';
import { status } from '@/composable/login/interface/enum-auth';

export const noPasa = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  
  try {
    
    // Obtiene el rol y verifica el estado de autenticación
    const storage = new Storage();
    await storage.create() 
    const Status = await storage.get('status')
    // Verifica si estás logeado.
    if (Status === status.Unauthenticated || Status === status.checking || Status === undefined ) {
        next({ name: 'Login' }); // Redirige si no estás logeado.
    } else {
        next(); // Permite la navegación
    }
  } catch (error) {
    console.error('Error al verificar el rol o crear el almacenamiento:', error);
    next({ name: 'NotFound' }); // Redirige a una página de error si hay problemas
  }
};




export default noPasa;