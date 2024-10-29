<template>
    <aside class="app-sidebar">
      <div class="app-sidebar__user">
        <img class="app-sidebar__user-avatar" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User Image">
        <div>
          <p class="app-sidebar__user-name">Wilmar Rojas</p>
          <p class="app-sidebar__user-designation">Frontend Developer</p>
        </div>
      </div>
      <ul class="app-menu">
        <li v-for="menuItem in menuItems" :key="menuItem.label">
          <router-link class="app-menu__item" :to="menuItem.path">
            <i :class="menuItem.icon"></i>
            <span class="app-menu__label">{{ menuItem.label }}</span>
          </router-link>
        </li>
      </ul>
    </aside>
  </template>
  
  <script>
  export default {
    data() {
      return {
        menuItems: [
          { label: 'Dashboard', path: '/dashboard', icon: 'bi bi-speedometer' },
          { label: 'Assistant', path: '/assistant', icon: 'bi bi-laptop' },
          { label: 'Forms', path: '/forms', icon: 'bi bi-ui-checks' },
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos del sidebar */
  </style>
  