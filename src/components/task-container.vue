<script setup lang="ts">
import addIcon from './icons/icon-add.vue'
import deleteIcon from './icons/icon-delete.vue'
import saveIcon from './icons/icon-save-category.vue'
import { ref, watch, computed, defineProps, defineEmits } from 'vue'
import buttonFormats from './buttons-format.vue'

import type { Task, Subtask } from '@/interface/interfaces.ts'

const props = defineProps<{
  task: Task
}>()

const emits = defineEmits<{
  (e: 'update-task', updated: Task): void
  (e: 'delete-task', id: number): void
}>()

const editableTitle = ref(props.task.title)
const editableIsCompleted = ref(props.task.isCompleted)
const editableSubtasks = ref<Subtask[]>(props.task.subtasks.map((s) => ({ ...s })))
const titleError = ref('')
const subtaskErrors = ref<string[]>([])

watch(
  () => props.task,
  (newTask) => {
    editableTitle.value = newTask.title
    editableIsCompleted.value = newTask.isCompleted
    editableSubtasks.value = props.task.subtasks.map((s) => ({ ...s }))
    titleError.value = ''
    subtaskErrors.value = []
  },
)

watch(editableIsCompleted, (isParentCompleted) => {
  const allSubtasksAreCurrentlyComplete = editableSubtasks.value.every((s) => s.isCompleted)

  if (isParentCompleted !== allSubtasksAreCurrentlyComplete) {
    editableSubtasks.value.forEach((subtask) => {
      subtask.isCompleted = isParentCompleted
    })
  }
})

watch(
  editableSubtasks,
  (newSubtasks) => {
    // Update parent's 'completed' state based on its children
    if (newSubtasks.length > 0) {
      const allSubtasksCompleted = newSubtasks.every((s) => s.isCompleted)
      editableIsCompleted.value = allSubtasksCompleted
    } else {
      // If there are no subtasks, the parent cannot be considered "complete" by its children
      editableIsCompleted.value = false
    }

    // Clear validation errors as the user types
    newSubtasks.forEach((subtask, index) => {
      if (subtask.title.trim() && subtaskErrors.value[index]) {
        subtaskErrors.value[index] = ''
      }
    })
  },
  { deep: true },
)

watch(editableTitle, (newVal) => {
  if (newVal.trim()) {
    titleError.value = ''
  }
})

const validate = (): boolean => {
  let isValid = true
  // Reset previous errors
  titleError.value = ''
  subtaskErrors.value = Array(editableSubtasks.value.length).fill('')

  // Validate main task title
  if (!editableTitle.value.trim()) {
    titleError.value = 'Task title cannot be empty.'
    isValid = false
  }

  editableSubtasks.value.forEach((subtask, index) => {
    if (!subtask.title.trim()) {
      subtaskErrors.value[index] = 'Subtask title cannot be empty.'
      isValid = false
    }
  })

  return isValid
}

const emitUpdate = () => {
  if (!validate()) {
    return // Stop if validation fails
  }

  emits('update-task', {
    ...props.task,
    title: editableTitle.value,
    isCompleted: editableIsCompleted.value,
    subtasks: editableSubtasks.value,
  })
}

const deleteTask = () => {
  emits('delete-task', props.task.id)
}

const addSubtask = () => {
  editableSubtasks.value.push({
    id: Date.now(),
    title: '',
    isCompleted: false,
  })
  subtaskErrors.value.push('')
}

const removeSubtask = (index: number) => {
  editableSubtasks.value.splice(index, 1)
  subtaskErrors.value.splice(index, 1)
}

const buttonBaseClass = 'text-white px-2 py-1 rounded inline-flex items-center gap-1'

const taskButtons = computed(() => [
  {
    label: '',
    class: `bg-blue-500 ${buttonBaseClass}`,
    icon: saveIcon,
    onClick: emitUpdate,
  },
  {
    label: '',
    class: `bg-red-500 ${buttonBaseClass}`,
    icon: deleteIcon,
    onClick: deleteTask,
  },
])

const addSubtaskButton = {
  label: '',
  class: 'bg-green-500 text-white px-2 py-1 rounded',
  icon: addIcon,
  onClick: addSubtask,
}

const removeSubtaskButton = (index: number) => ({
  label: '',
  class: 'bg-red-500 text-white px-1 py-1 rounded',
  icon: deleteIcon,
  onClick: () => removeSubtask(index),
})
</script>

<template>
  <div class="task-container">
    <div class="task-header">
      <input type="checkbox" v-model="editableIsCompleted" />
      <input
        v-model="editableTitle"
        class="task-title-input"
        :class="{ 'item-done': editableIsCompleted }"
      />
      <div class="action-buttons">
        <buttonFormats :buttons="taskButtons" />
      </div>
    </div>

    <!--  Subtasks list -->
    <div v-for="(subtask, index) in editableSubtasks" :key="subtask.id" class="subtask">
      <input
        v-model="subtask.title"
        class="subtask-input"
        :class="{ 'item-done': subtask.isCompleted }"
      />
      <input type="checkbox" v-model="subtask.isCompleted" class="subtask-checkbox" />
      <buttonFormats :buttons="[removeSubtaskButton(index)]" />
    </div>

    <!--  Add subtask button AFTER subtasks -->
    <buttonFormats :buttons="[addSubtaskButton]" class="add-subtask-btn" />
  </div>
</template>

<style scoped>
.task-container {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  background: #fff;
}

.task-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  flex-direction: row;
  font-weight: bold;
}

.item-done {
  text-decoration: line-through;
  color: #718096;
}

/* Main task container styles */
.task-title-input {
  border: none;
  border-bottom: 2px solid #333;
  font-weight: bold;
  padding: 0.25rem 0;
  outline: none;
  background: transparent;
  flex: 1;
  min-width: 50px;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  flex-direction: row;
}

.subtask {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.subtask-input {
  outline: none;
  border: none;
  border-bottom: 1px solid #aaa;
  padding: 1rem;
  flex: 1;
  min-width: 50px;
  gap: 0.5rem;
  padding: 0.25rem 0;
  margin-bottom: 0.5rem;
}
.subtask-checkbox {
  margin-left: 0.5rem;
}

.add-subtask-btn {
  margin-top: 0.5rem;
}
</style>
