<script setup lang="ts">
import buttonsFormat from '@/components/buttons-format.vue';
import { useRouter } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="navbar-title">ToDo App</div>
    <div class="navbar-links">
      <router-link to="/">Home</router-link>
      <!-- <router-link to="/todo">ToDo</router-link> -->
    </div>
  </nav>
  <div class="full-height-container">
    <div class="center-content">
      <profileFormat msg="HERIEL KAYE U. PACULBA" date="July 10, 2025"></profileFormat>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  background: #1976d2;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  box-sizing: border-box;
  z-index: 1000;
}

.navbar-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.navbar-links {
  display: flex;
  gap: 1.5rem;
}

.navbar-links a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.navbar-links a.router-link-exact-active {
  text-decoration: underline;
}

.navbar-links a:hover {
  color: #bbdefb;
}

.full-height-container {
  margin-top: 60px;
  height: calc(100vh - 60px);
  width: 100vw;
}


.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  width: 100%
}

.center-content h1 {
  margin-bottom: 20px;
}
</style>