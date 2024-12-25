import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inputName',
      component: () => import('../views/InputName.vue'),
    },
    {
      path: '/inputAge',
      name: 'inputAge',
      component: () => import('../views/InputAge.vue'),
    },
    {
      path: '/inputAuthority',
      name: 'inputAuthority',
      component: () => import('../views/InputAuthority.vue'),
    },
    {
      path: '/checkInputs',
      name: 'checkInputs',
      component: () => import('../views/CheckInputs.vue'),
    },
  ],
})

export default router
