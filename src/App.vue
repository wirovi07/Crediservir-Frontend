<template>
  <div :class="['app', { 'sidebar-collapsed': !isSidebarVisible }]">
    <!-- Mostrar Header y Sidebar solo si no estamos en la vista de login -->
    <Header v-if="!isLoginPage" @toggle-sidebar="toggleSidebar" />
    <Sidebar v-if="!isLoginPage" :is-visible="isSidebarVisible" />
    
    <!-- Estructura principal -->
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      isSidebarVisible: true, // Estado inicial, el sidebar está visible
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Cambia la visibilidad del sidebar
    },
  },
  setup() {
    const route = useRoute(); // Obtener la ruta actual
    const isLoginPage = computed(() => route.path === '/login'); // Comprobar si estamos en la ruta de login
    return { isLoginPage };
  },
};
</script>

<style>
/* Estilos generales para el comportamiento del sidebar */
.app {
  display: flex;
}

.app-content {
  transition: margin-left 0.3s ease;
  width: 100%;
}

/* Cuando el sidebar está colapsado, se ajusta el margen */
.sidebar-collapsed .app-content {
  margin-left: 0;
}
</style>
