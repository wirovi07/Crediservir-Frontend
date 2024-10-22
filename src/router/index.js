import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import UIElements from '../views/UIElements.vue';
import Forms from '../views/Forms.vue';
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue';

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/ui-elements', component: UIElements },
  { path: '/forms', component: Forms },
  { path: '/', redirect: '/dashboard' },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
