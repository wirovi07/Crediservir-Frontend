<template>
  <div>
    <!-- Usar el layout correcto basado en la ruta -->
    <component :is="layout"></component>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import appLayout from './layouts/app-layout.vue';
import loginLayout from './layouts/login-layout.vue'; 
import registerLayout from './layouts/register-layout.vue';

// Importar las funciones desde use-meta.js
import { usePageTitle, useMeta } from './composables/use-meta.js';

export default {
  components: {
    appLayout,
    loginLayout,
    registerLayout
  },
  setup() {
    const route = useRoute();

    // Definir el layout en función de la ruta
    const layout = computed(() => {
      if (route.path === '/login') {
        return 'loginLayout';
      } else if (route.path === '/register') {
        return 'registerLayout';
      }
      return 'appLayout';
    });

    // Llamar a usePageTitle para establecer el título de la página
    const pageTitle = computed(() => {
      if (route.path === '/login') {
        return 'Login';
      } else if (route.path === '/register') {
        return 'Register';
      }
      return 'Dashboard'; // Título por defecto para otras rutas
    });
    usePageTitle(pageTitle);

    // Llamar a useMeta para establecer los metadatos de la página
    useMeta({
      title: pageTitle.value,
      description: 'This is the meta description for the current page'
    });

    return { layout };
  },
};
</script>
