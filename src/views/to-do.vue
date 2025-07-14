<script setup lang="ts">
import taskContainer from '@/components/task-container.vue'
import { ref, onMounted } from 'vue'
import draggable from 'vuedraggable'
import { useTasksStore } from '@/composables/tasks-store.ts'
import type { Task, Subtask } from '@/types/types.ts'

const store = useTasksStore()

onMounted(() => {
  store.loadTasks()
})

const newTaskTitle = ref('')
const newSubtasks = ref<Subtask[]>([])

const addSubtask = () => {
  newSubtasks.value.push({
    id: Date.now() + Math.random(),
    title: '',
    isCompleted: false,
  })
}

const removeSubtask = (index: number) => {
  newSubtasks.value.splice(index, 1)
}
const editableSubtasks = ref<Subtask[]>([])

const addTask = () => {
  if (newTaskTitle.value.trim()) {
    store.tasks.push({
      id: Date.now(),
      title: newTaskTitle.value,
      subtasks: newSubtasks.value,
      isCompleted: false,
    })
    newTaskTitle.value = ''
    newSubtasks.value = []
  }
}

const showCategories = ref(false)

function toggleCategories() {
  showCategories.value = !showCategories.value
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-title">ToDo App</div>
    <div class="navbar-links">
      <router-link to="/">Home</router-link>
    </div>
  </nav>

  <div class="full-height-container" :class="{ expanded: showCategories }">
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
          <input v-model="subtask.title" placeholder="Subtask title" class="subtask-input" />
          <label class="subtask-checkbox">
            <input type="checkbox" v-model="subtask.isCompleted" />
            Done
          </label>
          <button @click="removeSubtask(index)" class="remove-subtask">✕</button>
        </div>

        <button @click="addSubtask" class="add-subtask-btn">ADD</button>
      </div>

      <!-- ✅ ACTION BUTTON -->
      <div class="task-actions-container">
        <button @click="addTask" class="save-task-btn">Save Task</button>
      </div>
    </div>

    <button @click="toggleCategories" class="toggle-button">
      {{ showCategories ? 'Hide Tasks' : 'Show Tasks' }}
    </button>

    <!-- All Tasks Section -->
    <div v-if="showCategories" class="all-tasks-container">
      <h3>All Tasks</h3>

      <div class="task-main-row">
        <div class = "subtask-link">
        <draggable v-model="store.tasks" item-key="id" class="tasks-list" ghost-class="ghost">
          <template #item="{ element }">
            <div class="task-item">
              <taskContainer
                :task="element"
                @update-task="store.updateTask"
                @delete-task="store.deleteTask"
              />
            </div>
          </template>
        </draggable>
      </div>
      </div>
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color: black;
  box-sizing: border-box;
}

.full-height-container.expanded {
  justify-content: flex-start;
}

.add-category {
  border: none;
  overflow-y: auto;
  max-height: 250px;
  background-color: #f8dada;
  padding: 2rem;
  border-radius: 16px;
  width: 50vw;
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
}

.subtasks-list input[type='checkbox'] {
  cursor: pointer;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: #ffffff;
}


.task-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}


.subtask-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}


.subtask-checkbox {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}



.add-subtask-btn {
  background-color: #e5aaaa;
  color: black;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.add-subtask-btn:hover {
  background-color: #b6c687;
}


.save-task-btn {
  background-color: #e5aaaa;
  color: black;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: bold;  
}

.save-task-btn:hover {
  background-color: #1d4ed8;
}

.subtasks-list button {
  background: transparent;
  border: none;
  color: #e3342f; /* same as text-red-500 */
  font-weight: bold;
  cursor: pointer;
}

.subtasks-list button:hover {
  color: #cc1f1a;
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
}

.task-actions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.toggle-button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background-color: #efbdbd;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
}

.toggle-button:hover {
  background-color: #e5aaaa;
}
.all-tasks-container {
  width: 50vw;
  overflow-y: auto;
  max-height: 200px;
  background-color: #f8dada;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
}

.all-tasks-container h3 {
  margin-bottom: 1rem;
  font-size: bold;
}

.all-tasks-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex; /* Make it flex column */
  flex-direction: column;
  gap: 1rem; /* Add space between task containers */
}

.all-tasks-container li {
  width: 100%;
}

.task-container {
  width: 100%;
  background: #ffffff;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.ghost {
  opacity: 0.4;
}
</style>
