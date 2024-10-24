<template>
    <div>
        <!--  BEGIN NAVBAR  -->
        <Header @toggle-sidebar="toggleSidebar"></Header>
        <!--  END NAVBAR  -->

        <Sidebar :is-visible="isSidebarVisible"></Sidebar>
        <!--  END SIDEBAR  -->

        <!--  BEGIN CONTENT AREA  -->
        <div class="app-content">
            <router-view />
        </div>
        <!--  END CONTENT AREA  -->
    </div>
</template>

<script setup>
import Header from "../components/layout/Header.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

// Estado de visibilidad del sidebar
const isSidebarVisible = ref(true);

// Función para alternar la visibilidad del sidebar
const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};

// Comprobar si estamos en la página de login
const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');

// Ocultar el sidebar si estamos en la página de login
if (isLoginPage.value) {
    isSidebarVisible.value = false;
}
</script>

<style scoped>
/* Estilos para el layout principal */
.app-content {
    padding: 20px;
}
</style>
