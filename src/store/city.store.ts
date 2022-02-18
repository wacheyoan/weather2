import { defineStore } from 'pinia'

export const cityStore = defineStore('storeId', {
    state: () => {
        return {
            favoritesCity: ['Arras', 'Paris', 'Marseille'],
        }
    },
    actions: {
        addNewCity(city: string): void {
            this.favoritesCity.push(city)
        },
        deleteCity(index: number): void {
            this.favoritesCity.splice(0, index);
        }
    }
})

