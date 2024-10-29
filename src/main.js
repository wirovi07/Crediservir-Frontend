import { createApp } from 'vue';
import App from './App.vue';
import { createHead } from '@vueuse/head';
import router from './router';
import './assets/css/main.min.css';
import './assets/css/datatables.min.css';
import './assets/js/bootstrap.min.js'; 
import './assets/js/jquery-3.7.0.min.js'; 
import './assets/js/plugins/jquery.dataTables.min';
import './assets/js/main.js'; 
import 'bootstrap-icons/font/bootstrap-icons.css';



const app = createApp(App);
const head = createHead();
app.use(router);
app.use(head);
app.mount('#app');
