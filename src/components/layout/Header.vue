<template>
  <header class="app-header">
    <a class="app-header__logo" href="#">Crediservir</a>
    <a class="app-sidebar__toggle" href="#" @click="toggleSidebar" aria-label="Hide Sidebar"></a>
    <ul class="app-nav">
      <li class="app-search">
        <input class="app-search__input" type="search" placeholder="Search">
        <button class="app-search__button"><i class="bi bi-search"></i></button>
      </li>
      <li class="dropdown">
        <a class="app-nav__item" href="#" aria-label="Show notifications">
          <i class="bi bi-bell fs-5"></i>
        </a>
      </li>
      <li class="dropdown">
        <!-- Cambiar a un enlace que cambia la ubicación -->
        <a class="app-nav__item" href="#" @click="goToLogin" aria-label="Open Profile Menu">
          <i class="bi bi-person fs-5"></i>
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  methods: {
    toggleSidebar() {
      document.body.classList.toggle('sidenav-toggled');
    },
    goToLogin() {
      window.location.href = '/login'; // Redirigir manualmente a la ruta de login
    }
  }
};
</script>
