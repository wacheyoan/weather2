<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Liste des favoris</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Liste des favoris</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-card
        v-for="(city, index) in favoritesCity"
        :key="index"
        @click="showWeatherLocation(city)"
      >
        <ion-card-header>
          <ion-card-title>{{ city }}</ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { mapState } from "pinia";
import { cityStore } from "../store/city.store";

export default {
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  computed: {
    ...mapState(cityStore, ["favoritesCity"]),
  },
  methods: {
    showWeatherLocation(city: string): void {
      window.location.href = `/tabs/searchWeather?city=${city}`;
    },
  },
};
</script>