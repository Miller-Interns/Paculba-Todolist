<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function goToTodo() {
  router.push('/todo')
}
</script>


<template>
  <div class="button-container">
  <button @click="goToTodo">GET STARTED</button>
  </div>
</template>


<style scoped>

button-container {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>