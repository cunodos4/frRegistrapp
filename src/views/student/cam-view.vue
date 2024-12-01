<script setup  lang="ts">
import {onMounted, ref} from "vue";
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { arrowBack, scan } from 'ionicons/icons';
import { alertController, IonPage, IonContent, IonHeader, 
        IonToolbar, IonButtons, IonButton, IonIcon, 
        IonTitle, IonFooter, IonFabButton,
        IonList, IonItem, IonGrid, IonRow,
        IonCol, IonNote, IonInput, IonLabel 
      } from '@ionic/vue';
import { useNavigation } from '../../composable/navegationComposables';
const { backButton } = useNavigation();
const isSuported = ref(false);
const barcodeList = ref([] as Barcode[]);
const presentAlert = async () => {
    const alert = await alertController.create({
      message: 'Necesitas los permisos.',
      buttons: ['OK'],});
      await alert.present();
};
const requestpermissions = async ()=>{
  const { camera } = await BarcodeScanner.requestPermissions();
  const permissions = camera ==='granted' || camera === 'limited';
  return permissions;
};
onMounted(async () => {
  isSuported.value = ( await BarcodeScanner.isSupported()).supported
});
const startSacning = async ()=>{
  const granted = await requestpermissions();
  if(!granted){
    presentAlert();
    return;
  }
  const { barcodes } = await BarcodeScanner.scan();
  barcodeList.value.push(...barcodes);
}
</script>


<template>
<ion-page>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button @click="backButton">
          <ion-icon slot="icon-only" :icon="arrowBack"></ion-icon>
        </ion-button>
      </ion-buttons>
      <ion-title>Scanear qr</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content :fullscreen=true>
    <ion-list v-if="barcodeList.length > 0">
      <ion-item v-for="barcode of barcodeList" :key="barcode.rawValue">
        <ion-grid>
        <ion-row>
          <ion-col>
            <ion-input type="text" :value="barcode.rawValue" :readonly="true"></ion-input>
          </ion-col>
        </ion-row>
        <ion-row class="ion-text-center">
          <ion-col>
            <ion-label>Format</ion-label>
            <ion-note>Presente</ion-note>
          </ion-col>
          <ion-col>
            <ion-label>Type</ion-label>
            <ion-note> asistencia </ion-note>
          </ion-col>
        </ion-row>
        </ion-grid>
      </ion-item>
    </ion-list>
  </ion-content>
  <ion-footer class="ion-padding">
    <ion-fab-button style="margin: auto;" v-if="isSuported" @click="startSacning()">
      <ion-icon :icon="scan"></ion-icon>
    </ion-fab-button>
  </ion-footer>
</ion-page>
</template>