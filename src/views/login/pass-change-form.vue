<script setup lang="ts">
import { IonContent,  IonPage, IonButton, IonItem, IonInput } from '@ionic/vue';
</script>

<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <section id="wrapper">
          <h3>Cambiar Contraseña</h3>
          <form> <!-- @submit.prevent="onSubmit"-->
            <ion-item>
              <ion-label position="floating">Contraseña actual</ion-label>
              <ion-input
                type="password"
              ></ion-input><!-- v-model="currentPassword"
              v-bind="currentPasswordAttrs" -->
            </ion-item>
            <!--<span v-if="errors.currentPassword">{{ errors.currentPassword }}</span>-->
  
            <ion-item>
              <ion-label position="floating">Nueva contraseña</ion-label>
              <ion-input
                type="password"
              ></ion-input><!--  v-model="newPassword"
              v-bind="newPasswordAttrs"-->
            </ion-item>
            <!--<span v-if="errors.newPassword">{{ errors.newPassword }}</span>-->
  
            <ion-item>
              <ion-label position="floating">Confirmar nueva contraseña</ion-label>
              <ion-input
                type="password"
                
              ></ion-input><!-- v-model="confirmPassword"
              v-bind="confirmPasswordAttrs"-->
            </ion-item>
            <!--<span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>-->
  
            <ion-button type="submit">Cambiar contraseña</ion-button>
          </form>
        </section>
      </ion-content>
    </ion-page>
  </template>
  
<style scoped>
@import url('../../theme/loginPage.css');
</style>