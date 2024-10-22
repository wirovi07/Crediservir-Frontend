<template>
    <div class="login-layout">
        <router-view />
    </div>
</template>

<script setup>
// No necesitas importar Header ni Sidebar aquí, ya que este es el layout de login
</script>

<style scoped>
/* Estilos específicos para el layout de login */
.login-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>