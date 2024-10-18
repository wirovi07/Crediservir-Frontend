<template>
  <div :class="['app', { 'sidebar-collapsed': !isSidebarVisible }]">
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :is-visible="isSidebarVisible" />
    <main class="app-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';

export default {
  components: {
    Header,
    Sidebar
  },
  data() {
    return {
      isSidebarVisible: true // Estado inicial, el sidebar está visible
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Cambia la visibilidad del sidebar
    }
  }
}
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

.sidebar-collapsed .app-content {
  margin-left: 0;
}
</style>
