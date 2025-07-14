<script setup lang="ts">
import { ref } from 'vue'
// import { useTaskStore } from '@/stores/tasks-store';
import type { Subtask } from '@/composables/tasks-store'

const props = defineProps<{
  groupId: string
  subtask: Subtask
  index: number
}>()

const emit = defineEmits<{
  (e: 'toggle', subtaskId: string, completed: boolean): void
  (e: 'edit', subtaskId: string, label: string): void
  (e: 'remove', subtaskId: string): void
}>()

const isEditing = ref(false)
const editValue = ref(props.subtask.label)

const handleToggle = () => {
  emit('toggle', props.subtask.id, !props.subtask.completed)
}

const startEditing = () => {
  isEditing.value = true
  editValue.value = props.subtask.label
}

const saveEdit = () => {
  if (editValue.value.trim()) {
    emit('edit', props.subtask.id, editValue.value)
    isEditing.value = false
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') saveEdit()
  else if (e.key === 'Escape') isEditing.value = false
}
</script>

<template>
  <div class="subtask-item">
    <input
      type="checkbox"
      :checked="subtask.completed"
      @change="handleToggle"
      class="subtask-checkbox"
    />

    <span
      v-if="!isEditing"
      @click="handleToggle"
      @dblclick="startEditing"
      :class="{ completed: subtask.completed }"
      class="subtask-label"
    >
      {{ subtask.label }}
    </span>

    <input
      v-else
      type="text"
      v-model="editValue"
      @blur="saveEdit"
      @keydown="handleKeyDown"
      v-focus
      class="subtask-edit-input"
    />

    <button
      @click="emit('remove', props.subtask.id)"
      class="subtask-delete-btn"
      aria-label="Delete subtask"
    >
      ×
    </button>
  </div>
</template>

<style scoped>
.subtask-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
}

.subtask-checkbox {
  cursor: pointer;
}

.subtask-label {
  flex-grow: 1;
  cursor: pointer;
  padding: 2px 4px;
}

.subtask-label.completed {
  text-decoration: line-through;
  color: #888;
}

.subtask-edit-input {
  flex-grow: 1;
  padding: 4px 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.subtask-delete-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 1.2em;
  padding: 0 4px;
}

.subtask-delete-btn:hover {
  color: #f44336;
}
</style>
