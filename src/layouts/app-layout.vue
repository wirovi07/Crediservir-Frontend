<template>
    <div>
        <!--  BEGIN NAVBAR  -->
        <Header v-if="!isLoginPage" @toggle-sidebar="toggleSidebar"></Header>
        <!--  END NAVBAR  -->

        <Sidebar v-if="!isLoginPage" :is-visible="isSidebarVisible"></Sidebar>
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
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Comprobar si estamos en la página de login
const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
</script>

<style scoped>
/* Estilos para el layout principal */
.app-content {
    padding: 20px;
}
</style>