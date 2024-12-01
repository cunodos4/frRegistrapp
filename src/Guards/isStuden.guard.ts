
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { Storage } from '@ionic/storage';
import { status } from '@/composable/login/interface/enum-auth';

export const esAlumno = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const storage = new Storage();
  await storage.create() 
  // Crea el almacenamiento y maneja posibles errores
  try {
    
    // Obtiene el rol y verifica el estado de autenticación
    const rol = await storage.get('rol');
    const Status = await storage.get('status');

    // Verifica si el rol es 'ALUMNO' y el estado de autenticación es válido
    if (rol === 'ALUMNO' && Status === status.Authenticated) {
      next(); // Permite la navegación
    } else {
      next({ name: 'HomeTeacher' }); // Redirige si no es un alumno
    }
  } catch (error) {
    console.error('Error al verificar el rol o crear el almacenamiento:', error);
    next({ name: 'NotFound' }); // Redirige a una página de error si hay problemas
  }
};


export default esAlumno;