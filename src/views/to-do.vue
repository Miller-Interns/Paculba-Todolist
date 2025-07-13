<script setup lang="ts">
import buttonsFormat from '@/components/buttons-format.vue'
import textBox from '@/components/text-box.vue'
import checkBox from '@/components/check-box.vue'
import { ref } from 'vue'
import type { TaskGroup } from '@/stores/tasks-store'

const taskTitle = ref('')
const taskSubtasks = ref<string[]>([])
const taskCompleted = ref(false)

const props = defineProps<{
  group: TaskGroup
}>()

const emit = defineEmits<{
  (e: 'toggle-subtask', groupId: string, subtaskId: string, completed: boolean): void
  (e: 'edit-subtask', groupId: string, subtaskId: string, label: string): void
  (e: 'add-task', title: string, subtasks: string[]): void
}>()

const handleToggle = (subtaskId: string, completed: boolean) => {
  emit('toggle-subtask', props.group.id, subtaskId, completed)
}

const handleEdit = (subtaskId: string, label: string) => {
  emit('edit-subtask', props.group.id, subtaskId, label)
}

const showCategories = ref(false)

function toggleCategories() {
  showCategories.value = !showCategories.value
}

function handleAdd() {
  if (taskTitle.value.trim()) {
    emit('add-task', taskTitle.value, taskSubtasks.value)
    taskTitle.value = ''
    taskSubtasks.value = []
  }
}

function addNewSubtask() {
  taskSubtasks.value.push('')
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
      <div class="task-section input-row">
        <label for="title">Title:</label>
        <textBox v-model="taskTitle" placeholder="Enter task title..." @keyup.enter="handleAdd" />
      </div>

      <div class="task-section">
        <label>Subtasks:</label>
        <div class="subtasks-list">
    <checkBox
      v-for="(subtask, index) in group.tasks"
      :key="subtask.id"
      :groupId="group.id"
      :subtask="subtask"
      :index="index"
      @toggle="(id, completed) => handleToggle(id, completed)"
      @edit="(id, label) => handleEdit(id, label)"
    />
  </div>
        <button @click="addNewSubtask" class="add-subtask-btn">+ Add Subtask</button>
      </div>

      <div class="task-actions-container">
        <buttonsFormat
          :showAdd="false"
          :showEdit="false"
          :showDelete="false"
          :showSave="true"
          @save="handleAdd"
        />
      </div>
    </div>

    <button @click="toggleCategories" class="toggle-button">
      {{ showCategories ? 'Hide Tasks' : 'Show Tasks' }}
    </button>

    <!-- All Tasks Section -->
    <div v-if="showCategories" class="all-tasks-container">
      <h3>All Tasks</h3>
      <ul>
        <li v-for="(task, index) in group.tasks" :key="index">
          {{ task.label }} - {{ task.completed ? 'Completed' : 'Pending' }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.full-height-container {
  min-height: calc(100vh - 60px);
  width: 100vw;
  margin: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color: black;
  font-size: 0.8rem;
}

.full-height-container.expanded {
  justify-content: flex-start;
  align-items: center;
}

.add-category {
  overflow-y: auto;
  max-height: 280px;
  background-color: #f8dada;
  padding: 2rem;
  border-radius: 16px;
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.task-section {
  width: 100%;
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.task-section label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.subtasks-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.add-subtask-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 4px 8px;
  text-align: left;
  width: fit-content;
}

.add-subtask-btn:hover {
  color: #2196f3;
  text-decoration: underline;
}

.task-actions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.toggle-button {
  padding: 0.5rem 1rem;
  font-size: 0.8rem;
  background-color: #efbdbd;
  color: black;
  border: 1px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
}

.all-tasks-container {
  width: 50vw;
  max-height: 250px;
  overflow-y: auto;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.all-tasks-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.all-tasks-container li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.input-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-row label {
  width: 60px;
  font-weight: bold;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
}

.navbar-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.navbar-links a {
  margin-left: 1rem;
  text-decoration: none;
  color: #333;
}
</style>
