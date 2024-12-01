<script setup lang="ts">
  import { IonContent,  IonPage, IonButton, IonItem, IonIcon, IonInput } from '@ionic/vue';
  import { chevronForward, qrCode, bug } from 'ionicons/icons';
  import { validation } from '../../composable/login/resetMailValidation';
  const { onSubmit ,email, emailAttrs,  errors } = validation();
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <section id="wrapper">
        <!-- Formulario usando Vee-Validate -->
        <form @submit.prevent="onSubmit">
          <!-- Icono de la aplicación -->
          <ion-icon :icon="qrCode" size="large" id="wave"></ion-icon>
          <h3>Recuperación de Contraseña</h3>

          <!-- Campo de email con validación de Vee-Validate -->
          <ion-item>
            <ion-input label="Email" type="email"  v-model="email" v-bind="emailAttrs"></ion-input>  
          </ion-item>
          <span v-if="errors.email" id="errEmail">
            <ion-icon :icon="bug" size="small"></ion-icon>
            {{ errors.email }}
          </span>
          <!-- Botón de envío -->
          <ion-button id="subBtn" type="submit" >
            Recuperar Contraseña
            <ion-icon :icon="chevronForward" size="small"></ion-icon>
          </ion-button>
        </form>
      </section>
    </ion-content>
  </ion-page>
</template>



<style scoped>
@import url('../../theme/loginPage.css');
</style>