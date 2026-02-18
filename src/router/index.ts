import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MaterView from '@/views/MaterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/mater',
      name: 'mater',
      component: MaterView,
    },
    {
      path: '/king',
      name: 'King',
      component: () => import('@/views/ServicesView.vue'),
    },
    {
      path: '/chicks',
      name: 'Chicks',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
    },
  ],
})

export default router
