import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:children',
      name: 'components',
      component: () => import('@/components/HelloWorld.vue')
    },
    { path: '/:notFound(.*)*', redirect: '/' }
  ]
})

export default router
