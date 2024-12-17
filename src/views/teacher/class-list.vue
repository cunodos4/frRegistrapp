<script setup lang="ts">
import { ref, ComponentPublicInstance, onMounted } from 'vue'
import { IonPage, IonHeader, IonToolbar, 
  IonTitle,IonContent, IonRow, IonCol, IonButtons, IonIcon, IonItem, 
  IonModal, IonButton } from '@ionic/vue';
import { checkmarkCircle, close } from 'ionicons/icons';
import { updateAsistencia } from '@/composable/student/updateActionClass'
import QrcodeVue from 'vue-qrcode';
import { getClasesByUserAndRamo } from '@/composable/student/getClases';

const qrValue = ref<string>("");


const rut: string  = "18395024-k";
const idFecha = 1;

const generateQrCode = async () => {
  try {
    // Llamada a tu función de Axios
    const response = await updateAsistencia(rut, idFecha);

    // Asigna un valor al QR
    qrValue.value = JSON.stringify({
      status: response.data.status,
      msg: response.data.msg,
      rut: rut,
      idFecha: idFecha
    });

    console.log("QR generado:", qrValue.value);
  } catch (error) {
    console.error("Error al generar el QR:", error);
    qrValue.value = "Error al generar el QR"; // Valor por defecto en caso de error
  }
};
const page = ref(null);
const modal = ref<ComponentPublicInstance | null>(null);

  function dismiss() {
    modal.value?.$el?.dismiss();
  }

  function canDismiss(data?: any, role?: string) {
    return   role !== 'gesture';
  }
  /*AA*/
  // Estados reactivas
const alumnos = ref<{ name: string; presente: boolean }[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Datos de ejemplo (IDs y token)
const userId = 2; // ID del usuario
const ramoId = 1; // ID del ramo

// Obtener y mapear los datos
const fetchClases = async () => {
  try {
    const response = await getClasesByUserAndRamo(userId, ramoId);
    
    // Mapea los datos a la estructura esperada
    alumnos.value = response.clases.map((clase: any) => ({
      name: `${clase.usuario.primerNombre} ${clase.usuario.apellidoPaterno}`, // Puedes agregar lógica para obtener nombres reales
      presente: clase.asistencia,
    }));
  } catch (err: any) {
    console.error("Error al cargar las clases:", err);
    error.value = "Error al cargar los datos.";
  } finally {
    loading.value = false;
  }
};

// Llamada inicial
onMounted(() => {
  fetchClases();
});
</script>

<template>
    <ion-page>
      <ion-header>
        <ion-toolbar id="toolbar">
          <ion-title id="page-title">Nombre del curso-sección</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content :fullscreen="true">
        <ion-item id="BtnModel">
          <ion-button id="open-modal" expand="block" @click="generateQrCode">Generar QR.</ion-button>
        </ion-item>
        <ion-modal ref="modal" trigger="open-modal" :can-dismiss="canDismiss" :presenting-element="page">
        <ion-header>
          <ion-toolbar>
            <ion-title>qr</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="dismiss">cerrar</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <!-- codigo qr -->
          <qrcode-vue 
          id="X"
          :value="qrValue" 
          :size="2000"
          :color="{ dark: '#2c3e50', light: '#ecf0f1' }" 
          type="image/png" />
        </ion-content>
      </ion-modal>
        
      
        <ion-content id="custom-table-container">
          <ion-item> 
            <!-- <p>Fecha: {{ fecha }}</p>-->
          </ion-item>
          <ion-grid id="custom-table">
            <!-- Encabezados de la tabla -->
            <ion-row id="header-row">
              <ion-col class="header-col">Nombre</ion-col>
              <ion-col class="header-col">Asistencia</ion-col>
            </ion-row>
  
            <!-- Filas de datos -->
            <ion-row v-for="(alumno, index) in alumnos" :key="index" id="data-row">
              <ion-col class="data-col">
                <p>{{ alumno.name }}</p>
              </ion-col>
              <ion-col class="data-col">
                <ion-icon 
                :icon="alumno.presente ? checkmarkCircle: close" 
                :class="alumno.presente ? 'icon-red':'icon-green'" 
                size="small"></ion-icon>
                </ion-col>
            </ion-row>
          </ion-grid>
        </ion-content>
      </ion-content>
    </ion-page>
  </template>
  
  <style scoped>
  /* Estilos del toolbar */
  #toolbar {
    background-color: #1976D2; /* Color principal de Vuetify */
    color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  #page-title {
    font-weight: bold;
    font-size: 1.2rem;    
    color: black;
  }
  
  /* Contenedor de la tabla */
  #custom-table-container {
    margin: 20px;
    padding: 10px;
    background-color: #f5f5f5; /* Fondo gris claro */
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
  }
  
  /* Estilos de la tabla */
  #custom-table {
    width: 100%;
  }
  
  /* Estilos de los encabezados de la tabla */
  #header-row {
    background-color: #E0E0E0; /* Color de encabezado */
    border-bottom: 2px solid #BDBDBD; /* Borde inferior para los encabezados */
    text-transform: uppercase;
    font-weight: 600;
  }
  
  .header-col {
    text-align: left;
    padding: 12px;
  }
  
  /* Estilos de las filas de datos */
  #data-row {
    border-bottom: 1px solid #E0E0E0; /* Borde entre filas */
  }
  
  .data-col {
    padding: 12px;
  }
  
  .data-col p {
    margin: 0;
    color: #424242; /* Color de texto */
  }
  
  /* Icono */
  ion-icon {
    color: white;
    font-size: 24px;
    cursor: pointer;
    color: black;
  }
  
  /* Hover para el botón de retroceso */
    ion-buttons:hover ion-icon {
        opacity: 0.8;
    }
    .icon-red {
        color: green;        
    }
    .icon-green{

        color: red;
    }

.modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0;
}

#X {
  width: 100%;
  height: 100%;
  max-width: 100%; /* Ajusta para que no exceda el tamaño del modal */
  object-fit: contain;
}
</style>
  
