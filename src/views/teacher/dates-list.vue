<script setup lang="ts">
import {ref, onMounted} from 'vue';
import { useRouter } from 'vue-router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonItem, IonDatetime, IonDatetimeButton, IonModal, IonIcon, IonButton, IonButtons, IonGrid } from '@ionic/vue';
import { arrowBack } from 'ionicons/icons';
import { Storage } from '@ionic/storage';
import { dateCompo } from '../../composable/teacher/datetime';

// Props
interface Props {
  seccion: string;
}
defineProps<Props>();

// Composables
const router = useRouter();

const { selectedDate, handleDateChange, filteredDates } = dateCompo();

// Estados adicionales
const loading = ref<boolean>(true); // Indicador de carga

// Métodos
const backButton = () => {
  router.back();
};
const id = ref<string | null>(null);



// Esperar a que los datos estén listos
onMounted(async () => {
  loading.value = false; 
  const storage = new Storage();
  await storage.create();
  id.value = await storage.get('id');// Asume que el composable termina de cargar
});
</script>

<template>
  <ion-content>
    <!-- Toolbar -->
    <ion-header>
      <ion-toolbar id="toolbar">
        <ion-buttons slot="start">
          <ion-button @click="backButton">
            <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title id="page-title">Nombre del ramo</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Carga -->
    <div v-if="loading" id="loading-container">Cargando...</div>

    <!-- Filtro de Fecha -->
    <ion-item v-else>
      <ion-datetime-button datetime="datetime" id="dateBtn"></ion-datetime-button>
      <IonModal :keep-contents-mounted="true">
        <ion-datetime
          id="datetime"
          display-format="DD-MM-YYYY"
          locale="es-ES"
          :value="selectedDate"
          @ionChange="handleDateChange"
          presentation="date"
        ></ion-datetime>
      </IonModal>
    </ion-item>

    <!-- Contenedor de la Tabla -->
    <div v-if="filteredDates.length > 0" id="custom-table-container">
      <ion-grid id="custom-table">
        <!-- Encabezado de la Tabla -->
        <ion-row id="header-row">
          <ion-col size="4" class="header-col"><strong>Fecha</strong></ion-col>
          <ion-col size="4" class="header-col"><strong>Abrir asistencia</strong></ion-col>
        </ion-row>

        <!-- Filas de Datos -->
        <ion-row v-for="(item, index) in filteredDates" :key="index" id="data-row">
          <ion-col size="4" class="data-col">{{ item }}</ion-col>
          <ion-col size="4" class="data-col">
            <router-link :to="{ name: 'ClassList', params: {userId:`${id}`} }">Asistencia</router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <!-- Mensaje de Sin Datos -->
    <div v-else id="no-data">No hay datos para mostrar.</div>
  </ion-content>
</template>

<style scoped>
/* Estilos optimizados como los originales */

#loading-container { text-align: center; margin: 20px; }
#error-container { text-align: center; color: red; }
#no-data { text-align: center; margin: 20px; font-weight: bold; }
</style>