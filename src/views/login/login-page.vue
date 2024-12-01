<script setup lang="ts">
import { IonContent,  IonPage, IonButton, IonItem, IonIcon, IonInput } from '@ionic/vue';
import { chevronForward, bug, qrCode, eye, eyeOff } from 'ionicons/icons';
import { validation, passVisibility} from '../../composable/login/loginValidation';
import { useNavigation } from '../../composable/navegationComposables';

const { isVisible, toggleVisibility } = passVisibility();
const { onSubmit, email, emailAttrs, password, passwordAttrs, errors } = validation();
const { passchange } = useNavigation();

</script>

<template>
<ion-page>
    <ion-content :fullscreen="true">
        <section id="wrapper">
            <form @submit.prevent="onSubmit">
                <ion-icon :icon="qrCode" size="large" id="wave"></ion-icon>
                <h3>Bienvenidos a RegistrApp</h3>
                <ion-item>
                    <ion-input label="Email" type="email"  v-model="email" v-bind="emailAttrs"></ion-input>    
                </ion-item>
                <span v-if="errors.email" id="errEmail">
                    <ion-icon :icon="bug" size="small"></ion-icon>
                    {{ errors.email }}
                </span>

                <ion-item id= passwordContainer>
                    <ion-input id="passwordInput" label="Contraseña" :type="isVisible ? 'text' : 'password'" v-model="password" v-bind="passwordAttrs"></ion-input>
                    <ion-icon :icon="isVisible ? eyeOff : eye"  size="small" @click="toggleVisibility"></ion-icon>
                </ion-item>
                <span v-if="errors.password" id="errPass">
                    <ion-icon :icon="bug" size="small"></ion-icon>
                    {{ errors.password }}
                </span>
                <ion-button id="subBtn"  type="submit">
                        Enviar
                        <ion-icon :icon="chevronForward" size="small"></ion-icon>
                </ion-button>
            </form>
        </section>
        <section id="wrapper">
            <ion-item>
                <ion-button @click="passchange">Recuperar contraseña</ion-button>
            </ion-item>
        </section>
    </ion-content>
</ion-page>
</template>

<style scoped>
@import url('../../theme/loginPage.css');
</style>