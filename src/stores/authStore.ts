/*
import {ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { status, rol } from '@/composable/login/interface/enum-auth';
import { loginAction } from '@/composable/login/loginActions'



export const useAuthStore = defineStore('auth', async ()=> {
  const id = ref<number | undefined>(0);
  const user = ref<string | undefined >();
  const Rol = ref<rol| undefined>();
  const token = ref<string | undefined>(' ');
  const rut = ref<string | undefined>('');
  //Estatus para ver si se está autenticado
  const AuthStatus = ref<string>(status.checking);
  const storage = new Storage()
  await storage.create() 
  const login = async (email: string, password: string)=>{
    try {
      const loginResp = await loginAction(email, password);
      if(!loginResp.estatus){
        return false;
      }
      id.value = loginResp.id;
      user.value = loginResp.nombre;
      rut.value = loginResp.rut;
      Rol.value = loginResp.rol;
      token.value = loginResp.token;
      AuthStatus.value = status.Authenticated;
      await storage.set('token', loginResp.token);
      await storage.set('id', loginResp.id);
      await storage.set('user', loginResp.nombre);
      await storage.set('rol', loginResp.rol);
      await storage.set('rut', loginResp.rut);
      await storage.set('status', AuthStatus.value);
      return true
    } catch (error) {
      return logOut();
    
    }
  }

  const logOut = async ()=>{
    AuthStatus.value = status.Unauthenticated;
    id.value = undefined;
    user.value = undefined;
    Rol.value = undefined;
    token.value = '';
    await storage.remove('token')
    await storage.remove('user');
    await storage.remove('rut');
    await storage.remove('rol');
    await storage.remove('status');
    await storage.remove('id');
    return false 
  }

  return {
    id,
    user,
    Rol,
    token,
    AuthStatus,
    
    //Actions
    login,
    logOut,

    // geters
    isCheking: computed(()=> AuthStatus.value === status.checking),
    isAuthenticated: computed(()=> AuthStatus.value === status.Authenticated),
    isNotAuthenticated: computed(()=> AuthStatus.value === status.Unauthenticated),

    //Geters para saber el rol
    isProfesor: computed(()=> Rol.value === rol.profesor),
    isAlumno : computed(()=> Rol.value === rol.alumno),
  }
});


*/
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Storage } from '@ionic/storage';
import { status, rol } from '@/composable/login/interface/enum-auth';
import { loginAction } from '@/composable/login/loginActions';

export const useAuthStore = defineStore('auth', () => {
  // Definición de los estados
  const id = ref<number | undefined>(0);
  const user = ref<string | undefined>();
  const Rol = ref<rol | undefined>();
  const token = ref<string | undefined>(' ');
  const rut = ref<string | undefined>('');
  const AuthStatus = ref<string>(status.checking);

  // Crear el almacenamiento de Ionic como singleton
  const storagePromise = (async () => {
    const storage = new Storage();
    await storage.create();
    return storage;
  })();

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password);
      if (!loginResp.estatus) {
        return false;
      }

      // Actualizar los valores en el store
      id.value = loginResp.id;
      user.value = loginResp.nombre;
      rut.value = loginResp.rut;
      Rol.value = loginResp.rol;
      token.value = loginResp.token;
      AuthStatus.value = status.Authenticated;

      // Guardar los datos en el almacenamiento
      const storage = await storagePromise;
      await storage.set('token', loginResp.token);
      await storage.set('id', loginResp.id);
      await storage.set('user', loginResp.nombre);
      await storage.set('rol', loginResp.rol);
      await storage.set('rut', loginResp.rut);
      await storage.set('status', AuthStatus.value);

      return true;
    } catch (error) {
      // En caso de error, cerrar sesión
      return logOut();
    }
  };

  // Función para cerrar sesión
  const logOut = async () => {
    AuthStatus.value = status.Unauthenticated;
    id.value = undefined;
    user.value = undefined;
    Rol.value = undefined;
    token.value = '';

    // Eliminar los datos del almacenamiento
    const storage = await storagePromise;
    await storage.remove('token');
    await storage.remove('user');
    await storage.remove('rut');
    await storage.remove('rol');
    await storage.remove('status');
    await storage.remove('id');

    return false;
  };

  return {
    id,
    user,
    Rol,
    token,
    AuthStatus,
    storagePromise,

    // Acciones
    login,
    logOut,

    // Computed Properties
    isCheking: computed(() => AuthStatus.value === status.checking),
    isAuthenticated: computed(() => AuthStatus.value === status.Authenticated),
    isNotAuthenticated: computed(() => AuthStatus.value === status.Unauthenticated),

    // Computed Properties para el rol
    isProfesor: computed(() => Rol.value === rol.profesor),
    isAlumno: computed(() => Rol.value === rol.alumno),
  };
});

