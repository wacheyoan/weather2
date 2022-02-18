<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Météo locale</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Méteo locale</ion-title>
        </ion-toolbar>
      </ion-header>
      <current-weather-header v-if="currentWeather" :weather="currentWeather" />
      <current-weather-list-forecast
        v-if="forecastWeather"
        :forecasts="forecastWeather"
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
  IonContent,
  loadingController,
  toastController,
} from "@ionic/vue";
import CurrentWeatherHeader from "@/components/CurrentWeatherHeader.vue";
import CurrentWeatherListForecast from "@/components/CurrentWeatherListForecast.vue";
import WeatherService from "@/services/weather.service";
import { CurrentWeather } from "@/interfaces/weather.interface";
import { Coordinates } from "@/interfaces/coordinates.interface";

export default {
  components: {
    CurrentWeatherHeader,
    CurrentWeatherListForecast,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  data() {
    return {
      currentWeather: null,
      forecastWeather: null,
    };
  },
  async mounted() {
    if ("geolocation" in navigator) {
      await this.showGeolocationNotAvailable();
      await this.getCurrentWeatherByLocation();
    } else {
      throw new Error("Geolocation is not available");
    }
  },
  methods: {
    async getCurrentWeather(
      latitude: number,
      longitude: number
    ): Promise<CurrentWeather> {
      const coordinates = { latitude, longitude } as Coordinates;
      const currentWeather: CurrentWeather =
        await WeatherService.getCurrentWeather(coordinates);
      return currentWeather;
    },
    async showGeolocationNotAvailable() {
      navigator.permissions.query({ name: "geolocation" }).then(async () => {
        const toast = await toastController.create({
          message: `La géolocalisation n'est pas disponible sur votre support.`,
          duration: 2000,
        });
        return toast.present();
      });
    },
    async getCurrentWeatherByLocation() {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const loading = await loadingController.create({
          message: "Synchronisation des données en cours, veuillez patienter",
        });
        loading.present();
        const { latitude, longitude } = position.coords;
        this.currentWeather = (await this.getCurrentWeather(
          latitude,
          longitude
        )) as CurrentWeather;
        this.forecastWeather = await this.getWeatherForecast(
          latitude,
          longitude
        );
        loading.dismiss();
      });
    },
    async getWeatherForecast(
      latitude: number,
      longitude: number
    ): Promise<any> {
      const coordinates = { latitude, longitude } as Coordinates;
      const weatherForecast = await WeatherService.getWeatherForecast(
        coordinates
      );
      return weatherForecast;
    },
  },
};
</script>