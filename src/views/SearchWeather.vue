<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rechercher une ville</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Rechercher une ville</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-input v-model="city" clear-input value=""></ion-input>
      <div class="button-container">
      <ion-button @click="searchWeather" expand="block" :disabled="!this.city"
        >Rechercher</ion-button
      >
      <ion-button @click="addToFavorites" expand="block" :disabled="!this.city"
        >Ajouter en favoris</ion-button
      >
      </div>
      <current-weather
        v-if="coordinates"
        :latitude="coordinates.latitude"
        :longitude="coordinates.longitude"
      />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonContent,
} from "@ionic/vue";
import coordinatesService from "../services/coordinates.service";
import CurrentWeather from "../components/CurrentWeather.vue";
import { Coordinates } from "@/interfaces/coordinates.interface";
import { mapActions, mapState } from "pinia";
import { cityStore } from "@/store/city.store";

export default {
  components: {
    CurrentWeather,
    IonHeader,
    IonInput,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  data() {
    return {
      city: "",
      coordinates: null
    };
  },
  async mounted() {
    if (this.$route.query.city) {
      this.city = this.$route.query.city;
      await this.searchWeather(); 
    }
  },
  computed: {
    ...mapState(cityStore, ["favoritesCity"]),
  },
  methods: {
    ...mapActions(cityStore, ["addNewCity"]),
    
    async searchWeather(): Promise<void> {
      this.coordinates = null;
      const coordinates = await coordinatesService.getCoordinatesByCityName(
        this.city
      );
      this.coordinates = coordinates as Coordinates;
    },
    addToFavorites(): void {
      if(this.city && false === this.checkIfCityAlreadyInFavorites()){
        return this.addNewCity(this.city);
      }
    },
    checkIfCityAlreadyInFavorites(): boolean {

      const isExistCity: Array<string> = this.favoritesCity.filter(
        (city: string) => city.toLowerCase() === this.city.toLowerCase()
      );


      return isExistCity.length > 0;
    },
  },
};
</script>

<style scoped>
  .button-container{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 16px 0 16px;
  }

  .button-container > * {
    width: 100%
  }

  ion-input{
    border: 1px solid black;
    width: 90%;
    border-radius: 8px;
    margin: 0 16px 0 18px;
    padding-left: 8px !important;
  }

  ion-input > button{
    position: absolute;
    right: 8px;
  }
</style>