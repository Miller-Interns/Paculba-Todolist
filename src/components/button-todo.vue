<script setup lang="ts">
import { useRouter } from 'vue-router'
import { RouteName } from '@/router'
import addIcon from './icons/icon-arrow.vue'

const router = useRouter()

function goToTodo() {
  router.push({ name: RouteName.TODOLIST })
}
</script>

<template>
  <button @click="goToTodo">
    GO TO MY TO-DO LIST
    <addIcon style="width: 1em; height: 1em; vertical-align: middle" />
  </button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: rgb(115, 78, 78);
  color: white;
  border-radius: 5px;
}
</style>
