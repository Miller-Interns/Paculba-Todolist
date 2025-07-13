<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string[] // subtask labels
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

// Local copy of the subtasks
const localSubtasks = ref<string[]>([...props.modelValue])

// Sync prop changes
watch(() => props.modelValue, (newVal) => {
  localSubtasks.value = [...newVal]
})

// Emit updates to parent
watch(localSubtasks, (newVal) => {
  emit('update:modelValue', newVal)
}, { deep: true })

// New subtask input
const newSubtask = ref('')

function addSubtask() {
  const trimmed = newSubtask.value.trim()
  if (trimmed && !localSubtasks.value.includes(trimmed)) {
    localSubtasks.value.push(trimmed)
    newSubtask.value = ''
  }
}

function removeSubtask(index: number) {
  localSubtasks.value.splice(index, 1)
}
</script>

<template>
  <div class="subtasks-checkboxes">
    <div v-for="(subtask, index) in localSubtasks" :key="index" class="subtask-item">
      <input type="checkbox" disabled />
      <span>{{ subtask }}</span>
      <button @click="removeSubtask(index)">❌</button>
    </div>

    <div class="add-subtask">
      <input
        v-model="newSubtask"
        placeholder="Add subtask"
        @keyup.enter="addSubtask"
        class="textbox"
        type="text"
      />
      <button @click="addSubtask">Add</button>
    </div>
  </div>
</template>

<style scoped>
.subtasks-checkboxes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.subtask-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.add-subtask {
  display: flex;
  gap: 0.5rem;
}
</style>
