import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Task } from '@/interface/interfaces.ts'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])

  // Load tasks from localStorage when store is created
  const loadTasks = () => {
    const saved = localStorage.getItem('tasks')
    if (saved) {
      tasks.value = JSON.parse(saved)
    }
  }

  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }

  watch(tasks, saveTasks, { deep: true })

  const addTask = () => {
    tasks.value.push({
      id: Date.now(),
      title: 'New Task',
      subtasks: [],
      isCompleted: false,
    })
  }

  const updateTask = (updated: Task) => {
    const index = tasks.value.findIndex((t) => t.id === updated.id)
    if (index !== -1) {
      tasks.value[index] = updated
    }
  }

  const deleteTask = (id: number) => {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  const toggleTaskCompletion = (id: number) => {
    const task = tasks.value.find((t) => t.id === id)
    if (task) {
      task.isCompleted = !task.isCompleted
    }
  }

  return { tasks, loadTasks, addTask, updateTask, deleteTask, toggleTaskCompletion }
})
