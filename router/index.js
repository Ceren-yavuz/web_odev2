import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('~/layouts/default.vue'), // Ana layout
  },
  {
    path: '/login',
    component: () => import('~/pages/login.vue'), // Login sayfası
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

