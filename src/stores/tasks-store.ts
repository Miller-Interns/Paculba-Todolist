// src/stores/taskStore.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<{ id: number, title: string, task: string }[]>([])

  function addTask(title: string, task: string) {
    tasks.value.push({ id: Date.now(), title, task })
    saveTasks()
  }

  function removeTask(id: number) {
    tasks.value = tasks.value.filter(t => t.id !== id)
    saveTasks()
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  function loadTasks() {
    const stored = localStorage.getItem('tasks')
    if (stored) {
      tasks.value = JSON.parse(stored)
    }
  }

  return {
    tasks,
    addTask,
    removeTask,
    loadTasks
  }
})
