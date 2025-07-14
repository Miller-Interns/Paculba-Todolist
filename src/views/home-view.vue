<script setup lang="ts">
import todoButton from '@/components/button-todo.vue';
</script>

<template>
  <div class="main-container">
    <div class="center-container">
      <h2>HERIEL KAYE U. PACULBA</h2>
        <br><h3>Date Started: July 11, 2025</h3>
    </div>
    <div class="button-container">
      <todoButton />
    </div>
  </div>
</template>


<style scoped>

.main-container {
  background-color: #f7dfdf;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  color: black;
  font-style: 'Helvetica Neue';
}

.center-container {
  background-color: #bbb7e5;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
}

.center-container h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  line-height: 1.5;
}

.button-container {

  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>

