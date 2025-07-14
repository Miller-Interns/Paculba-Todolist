<script setup lang="ts">
import { useRouter } from 'vue-router'
import addIcon from './icons/icon-add.vue'

const router = useRouter()
function goToTodo() {
  router.push('/todo')
}
</script>

<template>
  <button @click="goToTodo">
    <addIcon style="width: 1em; height: 1em; vertical-align: middle" />
    GET STARTED
  </button>
</template>

<style scoped>
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
 background-color: #bbb7e5;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  font-weight: bold;
}
button:hover {
  background-color: #aaa6cd;
}
</style>
