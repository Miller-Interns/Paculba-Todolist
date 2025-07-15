<script setup lang="ts">
import taskContainer from '@/components/task-container.vue'
import { useTasksStore } from '@/stores/tasks-store'
import type { Subtask } from '@/interface/interfaces.ts'
import { ref, watch, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { RouteName } from '@/router'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTasksStore()

const newTaskTitle = ref('')
const newSubtasks = ref<Subtask[]>([])

const titleError = ref('')
const subtaskErrors = ref<string[]>([])

// --- WATCHERS FOR REAL-TIME ERROR CLEARING ---
watch(newTaskTitle, (newVal) => {
  if (newVal.trim()) {
    titleError.value = ''
  }
})

watch(
  newSubtasks,
  (subtasks) => {
    // Clear subtask errors as the user types in the respective input
    subtasks.forEach((subtask, index) => {
      if (subtask.title.trim() && subtaskErrors.value[index]) {
        subtaskErrors.value[index] = ''
      }
    })
  },
  { deep: true },
)

onMounted(() => {
  store.loadTasks()
})

const addSubtask = () => {
  newSubtasks.value.push({
    id: Date.now() + Math.random(),
    title: '',
    isCompleted: false,
  })
  subtaskErrors.value.push('')
}

const removeSubtask = (index: number) => {
  newSubtasks.value.splice(index, 1)
  subtaskErrors.value.splice(index, 1)
}
const validateAndShowAlerts = (): boolean => {
  const errors: string[] = []
  if (!newTaskTitle.value.trim()) {
    errors.push('Task title cannot be empty.')
  }

  newSubtasks.value.forEach((subtask, index) => {
    if (!subtask.title.trim()) {
      errors.push(`Subtask #${index + 1} title cannot be empty.`)
    }
  })

  if (errors.length > 0) {
    alert('Please fix the following issues:\n\n- ' + errors.join('\n- '))
    return false // Indicate validation failed
  }

  return true // Indicate validation succeeded
}

const addTask = () => {
  if (!validateAndShowAlerts()) {
    return
  }

  store.tasks.push({
    id: Date.now(),
    title: newTaskTitle.value,
    subtasks: newSubtasks.value,
    isCompleted: false,
  })
  newTaskTitle.value = ''
  newSubtasks.value = []
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-title" @click="() => router.push({ name: RouteName.TODOLIST })">
      To-Do App
    </div>
    <div class="navbar-links" @click="() => router.push({ name: RouteName.HOME })">Home</div>
  </nav>

  <div class="full-height-container">
    <!-- Add Tasks Section -->
    <div class="add-category">
      <!-- ✅ TASK TITLE INPUT -->
      <div class="task-section">
        <label for="task-title">Task Title:</label>
        <input
          id="task-title"
          v-model="newTaskTitle"
          placeholder="Enter task title"
          class="task-input"
        />
      </div>

      <!-- ✅ SUBTASKS LIST -->
      <div class="task-section">
        <label>Subtasks:</label>

        <div class="subtasks-list" v-for="(subtask, index) in newSubtasks" :key="subtask.id">
          <input
            v-model="subtask.title"
            placeholder="Subtask title"
            class="subtask-input"
            :class="{ 'subtask-done': subtask.isCompleted }"
          />
          <label class="subtask-checkbox">
            <input type="checkbox" v-model="subtask.isCompleted" /> Done
          </label>
          <button @click="removeSubtask(index)" class="delete-btn">✕</button>
        </div>

        <button @click="addSubtask" class="add-subtask-btn">ADD</button>
      </div>

      <!-- ✅ ACTION BUTTON -->
      <div class="task-actions-container">
        <button @click="addTask" class="save-task-btn">SAVE TASK</button>
      </div>
    </div>

    <!-- All Tasks Section -->
    <div class="all-tasks-container">
      <label>All Tasks</label>

      <draggable v-model="store.tasks" item-key="id" class="tasks-list" ghost-class="ghost">
        <template #item="{ element }">
          <taskContainer
            :task="element"
            @update-task="store.updateTask"
            @delete-task="store.deleteTask"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped>
.full-height-container {
  min-height: calc(100vh - 60px);
  width: 100%;
  margin: 0;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color: black;
  box-sizing: border-box;
}

.full-height-container.expanded {
  justify-content: flex-start;
}

/* add category section  */
.add-category {
  border: none;
  overflow-y: auto;
  height: 500px;
  background-color: #f8dada;
  padding: 2rem;
  border-radius: 16px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  box-sizing: border-box;
}

.task-section {
  background-color: #efbdbd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.task-section label:first-child {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.task-title-input {
  border: none;
  border-bottom: 2px solid #333; /* Underline only */
  font-weight: bold; /* Make text bold */
  padding: 0.25rem 0;
  outline: none;
  background: transparent;
  flex: 1;
  min-width: 150px;
}

.subtasks-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.subtasks-list input[type='text'] {
  flex: 1;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
  min-width: 100px;
}

.subtasks-list input[type='checkbox'] {
  cursor: pointer;
}

.task-input {
  border: none;
  border-bottom: 2px solid #333;
  font-weight: bold;
  padding: 0.25rem 0;
  outline: none;
  background: transparent;
  flex: 1;
  width: 100%;
}

.subtask-input {
  border: none;
  border-bottom: 2px solid #333;
  padding: 0.25rem 0;
  outline: none;
  background: transparent;
  flex: 1;
  width: 80px;
}

.subtask-checkbox {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.add-subtask-btn {
  background-color: rgb(80, 48, 48);
  color: whitesmoke;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.add-subtask-btn:hover {
  background-color: rgb(129, 77, 77);
}

.save-task-btn {
  background-color: rgb(80, 48, 48);
  color: whitesmoke;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.save-task-btn:hover {
  background-color: whitesmoke;
  color: rgb(80, 48, 48);
}

.subtasks-list button {
  background: transparent;
  border: none;
  color: rgb(80, 48, 48); /* same as text-red-500 */
  font-weight: bold;
  cursor: pointer;
}

.subtasks-list button:hover {
  color: rgb(80, 48, 48);
}

.input-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.subtasks-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.subtasks-list input[type='text'] {
  flex: 1;
  width: 100%;
}

.task-actions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.button-container {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
}

/* all tasks */
.all-tasks-container {
  border: none;
  overflow-y: auto;
  height: 500px;
  background-color: #f8dada;
  padding: 2rem;
  border-radius: 16px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  box-sizing: border-box;
}

.all-tasks-container label:first-child {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtask-done {
  text-decoration: line-through;
  color: #718096; /* A muted gray color for completed items */
}

.subtasks-list {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}
.task-main-row {
  background-color: #efbdbd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}
</style>
