import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/currentWeather'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/currentWeather'
      },
      {
        path: 'currentWeather',
        component: () => import('@/views/CurrentWeather.vue')
      },
      {
        path: 'searchWeather',
        component: () => import('@/views/FavoritesWeathers.vue')
      },
      {
        path: 'favoritesWeather',
        component: () => import('@/views/SearchWeather.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
