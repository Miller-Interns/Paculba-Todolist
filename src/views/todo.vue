<template>
  <div class="todo-app">
    <h1>To Do App</h1>
    <nav><a href="#">Home</a></nav>

    <div class="input-section">
      <div class="form-group">
        <label for="title">Title:</label>
        <input id="title" type="text" v-model="newGroupTitle" placeholder="Enter group title" />
      </div>
      <div class="form-group">
        <label for="tasks">Tasks:</label>
        <textarea
          id="tasks"
          v-model="newTasksRaw"
          placeholder="Enter tasks, one per line"
        ></textarea>
      </div>
      <button @click="addNewTaskGroup" class="save-btn">💾 Save</button>
    </div>

    <button @click="showCategories = !showCategories" class="toggle-btn">
      {{ showCategories ? 'Hide Tasks' : 'Show Tasks' }}
    </button>

    <div v-if="showCategories" class="task-groups">
      <h2>All Tasks</h2>
      <div v-for="group in taskStore.tasks" :key="group.id" class="task-group">
        <div class="group-header">
          <h3 v-if="!group.editing" @dblclick="editGroup(group)">{{ group.title }}</h3>
          <input
            v-else
            type="text"
            v-model="group.newTitle"
            @keyup.enter="saveGroupTitle(group)"
            @blur="saveGroupTitle(group)"
            v-focus
          />
          <div class="group-actions">
            <button @click="taskStore.removeTask(group.id)" class="delete-btn">
              🗑 Delete Group
            </button>
          </div>
        </div>
        <ul>
          <li v-for="(sub, index) in group.tasks" :key="sub.id || index" class="subtask-item">
            <input
              type="checkbox"
              class="checkbox"
              :checked="sub.completed"
              @change="taskStore.toggleSubtask(group.id, index)"
            />
            <input
              v-if="sub.editing"
              type="text"
              v-model="sub.label"
              @blur="finishSubtaskEdit(group, index)"
              @keyup.enter="handleSubtaskEnter(group.id, index)"
              class="edit-subtask-input"
              v-focus
            />
            <span v-else @dblclick="startSubtaskEdit(sub)" :class="{ completed: sub.completed }">
              {{ sub.label }}
            </span>
            <button @click="taskStore.removeSubtask(group.id, index)" class="delete-btn-small">
              🗑
            </button>
          </li>
        </ul>
        <button @click="addNewSubtaskToGroup(group.id)" class="add-task-btn">+ Add Task</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/composables/tasks-store'

const taskStore = useTaskStore()
const newGroupTitle = ref('')
const newTasksRaw = ref('')
const showCategories = ref(true)

// Custom directive to focus on an element when it's mounted
const vFocus = {
  mounted: (el) => el.focus(),
}

onMounted(() => {
  taskStore.loadTasks()
})

const addNewTaskGroup = () => {
  if (newGroupTitle.value.trim() && newTasksRaw.value.trim()) {
    const tasks = newTasksRaw.value
      .split('\n')
      .map((label) => ({
        label: label.trim(),
        completed: false,
        editing: false,
      }))
      .filter((task) => task.label)
    taskStore.addTaskGroup(newGroupTitle.value, tasks)
    newGroupTitle.value = ''
    newTasksRaw.value = ''
  }
}

const editGroup = (group) => {
  group.editing = true
  group.newTitle = group.title
}

const saveGroupTitle = (group) => {
  if (group.newTitle && group.newTitle.trim()) {
    taskStore.editGroupTitle(group.id, group.newTitle)
  }
  group.editing = false
}

const startSubtaskEdit = (sub) => {
  taskStore.tasks.forEach((g) => g.tasks.forEach((s) => (s.editing = false)))
  sub.editing = true
}

const finishSubtaskEdit = (group, index) => {
  const sub = group.tasks[index]
  if (sub) {
    sub.editing = false
    if (!sub.label.trim()) {
      taskStore.removeSubtask(group.id, index)
    } else {
      taskStore.saveTasks()
    }
  }
}

const handleSubtaskEnter = (groupId, currentIndex) => {
  const group = taskStore.tasks.find((g) => g.id === groupId)
  if (group && group.tasks[currentIndex]) {
    group.tasks[currentIndex].editing = false
    if (!group.tasks[currentIndex].label.trim()) {
      taskStore.removeSubtask(groupId, currentIndex)
    } else {
      taskStore.addNewSubtask(groupId, currentIndex)
    }
    taskStore.saveTasks()
  }
}

const addNewSubtaskToGroup = (groupId) => {
  const group = taskStore.tasks.find((g) => g.id === groupId)
  if (group) {
    const lastIndex = group.tasks.length - 1
    taskStore.addNewSubtask(groupId, lastIndex)
  }
}
</script>

<style scoped>
.todo-app {
  font-family: sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}
.input-section,
.task-group {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.form-group {
  margin-bottom: 10px;
}
input[type='text'],
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.save-btn,
.toggle-btn,
.add-task-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  margin-top: 10px;
}
.toggle-btn {
  background-color: #6c757d;
}
.add-task-btn {
  background-color: #28a745;
  font-size: 0.9em;
  padding: 8px 12px;
}
.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.group-header h3 {
  cursor: pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
.subtask-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
}
.subtask-item .checkbox {
  width: 20px;
  height: 20px;
}
.subtask-item span {
  flex-grow: 1;
  cursor: pointer;
}
.subtask-item .completed {
  text-decoration: line-through;
  color: #888;
}
.edit-subtask-input {
  flex-grow: 1;
}
.delete-btn,
.delete-btn-small {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #dc3545;
}
.delete-btn-small {
  font-size: 1rem;
}
</style>
