import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js'; // Corrige la ruta aquí
import './assets/css/main.css';
import './assets/css/main.min.css';
import './assets/js/bootstrap.js'; // Asegúrate de que el archivo exista
import './assets/js/jquery-3.7.0.js'; // Asegúrate de que el archivo exista
import './assets/js/main.js'; // Asegúrate de que el archivo exista

const app = createApp(App);
app.use(router);
app.mount('#app');
