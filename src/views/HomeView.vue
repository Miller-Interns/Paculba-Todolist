<script setup lang="ts">
import profileFormat from '@/components/profile-format.vue';
import todoButton from '@/components/button-todo.vue';
</script>

<template>
  <div class="full-height-container">
    <div class="center-content">
      <profileFormat msg="HERIEL KAYE U. PACULBA" />
      <profileFormat date="July 10, 2025" />
      <todoButton/>
  </div>
</div>
</template>

<style scoped>
.full-height-container {
  height: 100vh;
  width: 100vw;
}

.center-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100vw;
  gap: 1rem;
}

.center-content h1 {
  margin-bottom: 20px;
}
</style>
