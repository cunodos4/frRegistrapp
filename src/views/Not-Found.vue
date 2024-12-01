<script setup lang="ts" >
import { IonPage, IonContent } from '@ionic/vue';
import {useRouter} from 'vue-router';
const name = '404 - Página no encontrada'
const route  = useRouter();
const goback = () => route.go(-1);
</script>

<template>
    <ion-page>
    <ion-content :fullscreen="true">
        <div class="not-found">
            <h1>{{ name }}</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <a @click.prevent="goback" >Volver al inicio</a>
        </div>
    </ion-content>
</ion-page>
</template>

  
<style scoped>
@import url('../theme/notFound.css');
</style>
  