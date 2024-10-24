import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import router from './router';
import './assets/css/main.css';
import './assets/css/main.min.css';
import './assets/js/bootstrap.min.js'; // Asegúrate de que el archivo exista
import './assets/js/jquery-3.7.0.min.js'; // Asegúrate de que el archivo exista
import './assets/js/main.js'; // Asegúrate de que el archivo exista
// src/main.js
import 'bootstrap-icons/font/bootstrap-icons.css';


const app = createApp(App);
const head = createHead();
app.use(router);
app.use(head);
app.mount('#app');
