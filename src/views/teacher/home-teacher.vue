<script setup lang="ts">
import { ref,onMounted } from 'vue';
import { RouterLink} from 'vue-router';
import { IonPage, IonHeader, IonToolbar, 
  IonTitle,IonContent, IonRow, IonCol, IonButtons, IonButton,
  IonGrid } from '@ionic/vue';
import {  useAuthStore } from '@/stores/authStore';
import { ramosAction } from '@/composable/teacher/ramosAction';
import { Storage } from '@ionic/storage';


interface Clase {
  nombre: string,
  seccion: string
}
const { logOut } = useAuthStore();
const clases = ref<Clase[]>([]);
const nombre = ref<string>('');
const fetchClases = async ()=>{
  const storage = new Storage();
  try {
    await storage.create();
    const name:any = await storage.get("user");
    const data = await ramosAction();

    if(Array.isArray(data)){
      clases.value = data as Clase[];
      nombre.value = name as string
    }
  } catch (error) {
    console.error('Error al recuperar los datos:', error);
  }
};



onMounted(fetchClases);
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
      </ion-buttons>
        <ion-title>Te damos la bienvenida {{ nombre }} </ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <section>
        <ion-grid id="custom-table">
          <!-- Encabezados de la tabla -->
          <ion-row id="header-row">
            <ion-col>Sección</ion-col>
            <ion-col>Materia</ion-col>
          </ion-row>

          <!-- Filas de datos -->
          <ion-row v-for="(clase, index) in clases" :key="index" id="data-row">
            <ion-col>
              <router-link :to="{ name: 'DateList', params: {seccion:`${ clase.seccion }`} }">{{ clase.seccion }}</router-link>
            </ion-col>
            <ion-col>
              <p>{{ clase.nombre }}</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </section>
      <ion-button  router-link="/login" @click.prevent="logOut()">Cerrar sesión</ion-button>
    </ion-content>
  </ion-page>
</template>

<style scoped>
/* Estilo de la tabla */
#custom-table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

#header-row {
  background-color: #1976D2; /* Color de encabezado similar al primario de Vuetify */
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 12px 0;
}

#data-row {
  border-bottom: 1px solid #e0e0e0;
  padding: 12px 0;
  text-align: center;
  transition: background-color 0.3s;
}

#data-row:hover {
  background-color: #f5f5f5; /* Color de hover similar al estilo de Vuetify */
}

ion-col {
  text-align: center;
}

/* Enlaces de la tabla */
a {
  color: #1976D2; /* Azul de Vuetify */
  text-decoration: none;
}

a:hover {
  color: red blue;
  text-decoration: underline;
}
</style>
