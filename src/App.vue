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
import loginLayout from './layouts/login-layout.vue'; // El layout del login (sin Header ni Sidebar)
import registerLayout from './layouts/register-layout.vue';

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
      // Si estamos en la ruta de login, usamos el layout de login
      if (route.path === '/login') {
        return 'loginLayout';
      }
      // Si estamos en la ruta de registro, usamos el layout de registro
      else if (route.path === '/register') {
        return 'registerLayout';
      }
      // Para las demás rutas, usamos el layout general
      return 'appLayout';
    });

    return { layout };
  },
};
</script>
