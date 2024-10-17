<template>
  <div id="app">
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
      isSidebarVisible: false // Estado inicial de la barra lateral
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Cambia la visibilidad
    }
  }
}
</script>

<style>
/* Aquí puedes añadir los estilos generales */
</style>
