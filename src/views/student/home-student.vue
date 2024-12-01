<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, 
  IonTitle,IonContent, IonGrid,IonRow, IonCol, IonButton } from '@ionic/vue';
import { useAuthStore } from '../../stores/authStore';
const  { user , logOut} = useAuthStore();

const clases =  [
        { id: '09_D', name: 'Base de datos 1'},
        { id: '03_D', name: 'Desarrolla una app con Ionic'},
        { id: '03_V', name: 'Cómo contar chistes, ser gracioso y no morir en el intento'},
        { id: '04_D', name: 'Ingenieria aeroespacial'}
]
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Bienvenido {{ user }}</ion-title>
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
            <ion-col><p>{{ clase.id }}</p></ion-col>
            <ion-col>
              <router-link to="/home-studen/cam-view">{{ clase.name }}</router-link>
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
