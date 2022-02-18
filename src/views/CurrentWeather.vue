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
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        this.currentWeather = (await this.getCurrentWeather(
          latitude,
          longitude
        )) as CurrentWeather;
        this.forecastWeather = await this.getWeatherForecast(
          latitude,
          longitude
        );
      });
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