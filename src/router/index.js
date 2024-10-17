import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import UIElements from '../views/UIElements.vue';
import Forms from '../views/Forms.vue';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/ui-elements', component: UIElements },
  { path: '/forms', component: Forms },
  { path: '/', redirect: '/dashboard' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
