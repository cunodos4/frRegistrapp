<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Escanear QR</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-button @click="escanearCodigo">Escanear Código QR</ion-button>
      <ion-text v-if="mensaje">{{ mensaje }}</ion-text>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref } from "vue";
import { BarcodeScanning } from "@capacitor-mlkit/barcode-scanning";
import axios from "axios";
import { Storage } from '@ionic/storage';
// Estado reactivo para el mensaje
const mensaje = ref("");

// Función para escanear el código QR
const escanearCodigo = async () => {

  try {
    // Escanea el código QR
    const result = await BarcodeScanning.scan();
    if (result?.barcodes?.length > 0) {
      const qrData = result.barcodes[0].rawValue; // Datos del QR

      // Se asume que el QR contiene "rut|idFecha"
      const [rut, idFecha] = qrData.split("|");
      if (rut && idFecha) {
        await enviarAsistencia(rut, idFecha);
      } else {
        mensaje.value = "Código QR inválido.";
      }
    } else {
      mensaje.value = "No se detectó ningún código QR.";
    }
  } catch (error) {
    console.error("Error al escanear el QR:", error);
    mensaje.value = "Error al escanear el código QR.";
  }
};

// Función para enviar asistencia al backend
const enviarAsistencia = async (rut, idFecha) => {
  const storage = new Storage;
  await storage.create();
  try {
    // Configuración de la solicitud al backend
    const token = await storage.get("token") // Sustituye esto con tu lógica de obtención del token
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.put(
      `https://api-registrapp-nx3w.onrender.com/api/clases/update/${rut}/${idFecha}`,
      {}, // Cuerpo vacío porque los datos están en los parámetros de la URL
      config
    );

    if (response.data.status) {
      mensaje.value = "Asistencia marcada correctamente.";
    } else {
      mensaje.value = "No se pudo actualizar la asistencia.";
    }
  } catch (error) {
    console.error("Error al enviar asistencia:", error);
    mensaje.value = "Error al marcar la asistencia.";
  }
};
</script>
