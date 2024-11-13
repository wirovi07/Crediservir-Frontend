import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue';
import Assistant from '../views/Assistant.vue';
import Category from '../views/Category.vue';
import Event from '../views/Event.vue';

const routes = [
  { 
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard 
  },
  { path: '/assistant',
    name: 'Assistant',
    component: Assistant 
  },
  { path: '/category',
    name: 'Category',
    component: Category 
  },
  { path: '/event',
    name: 'Event',
    component: Event 
  },
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
