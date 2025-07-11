<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTaskStore } from '@/stores/tasks-store'

const taskStore = useTaskStore()

const title = ref('')
const task = ref('')

function handleAdd() {
  if (title.value && task.value) {
    taskStore.addTask(title.value, task.value)
    title.value = ''
    task.value = ''
  }
}

onMounted(() => {
  taskStore.loadTasks()
})
</script>

<template>
  <div class="add-category">
    <h2>Add Tasks</h2>
    <input v-model="title" type="text" placeholder="Title" />
    <input v-model="task" type="text" placeholder="Task" />
    <button @click="handleAdd">Add</button>
  </div>

  <div class="all-tasks-container">
    <h3>All Tasks</h3>
    <ul>
      <li v-for="t in taskStore.tasks" :key="t.id">
        <strong>{{ t.title }}:</strong> {{ t.task }}
        <button @click="taskStore.removeTask(t.id)">🗑</button>
      </li>
    </ul>
  </div>
</template>
