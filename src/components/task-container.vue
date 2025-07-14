<script setup lang="ts">

import addIcon from './icons/icon-add.vue'
import editIcon from './icons/icon-edit.vue'
import deleteIcon from './icons/icon-delete.vue'
import saveIcon from './icons/icon-check.vue'
import { ref, watch, computed, defineProps, defineEmits } from 'vue'
import buttonFormats from './buttons-format.vue'


import type { Task, Subtask } from '@/types/types.ts'

const props = defineProps<{
  task: Task
}>()

const emits = defineEmits<{
  (e: 'update-task', updated: Task): void
  (e: 'delete-task', id: number): void
}>()

const editableTitle = ref(props.task.title)
const editableIsCompleted = ref(props.task.isCompleted)

const editableSubtasks = ref<Subtask[]>(props.task.subtasks.map(s => ({ ...s })))


watch(() => props.task, (newTask) => {
  editableTitle.value = newTask.title
  editableIsCompleted.value = newTask.isCompleted
editableSubtasks.value = props.task.subtasks.map(s => ({ ...s }))
})

const emitUpdate = () => {
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

const taskButtons = computed(() => [
  {
    label: 'Save',
    class: 'bg-blue-500 text-white px-2 py-1 rounded',
    icon: addIcon,
    onClick: emitUpdate
  },
  {
    label: 'Delete',
    class: 'bg-red-500 text-white px-2 py-1 rounded',
    icon: deleteIcon,
    onClick: deleteTask
  }
])

const addSubtask = () => {
  editableSubtasks.value.push({
    id: Date.now(),
    title: '',
    isCompleted: false,
  })
}

const removeSubtask = (index: number) => {
  editableSubtasks.value.splice(index, 1)
}

</script>

<template>
  <div class="task-container border p-4 mb-2 rounded shadow bg-white">
    <div class="flex justify-between items-center mb-2">
      <input v-model="editableTitle" class="border p-1 rounded flex-1 mr-2" />
      <label class="flex items-center mr-2">
        <input type="checkbox" v-model="editableIsCompleted" class="mr-1" /> Completed
      </label>

      <!-- ✅ Use ButtonFormats with icons -->
      <ButtonFormats :buttons="taskButtons" />
    </div>

    <div v-for="(subtask, index) in editableSubtasks" :key="subtask.id" class="flex items-center mb-1">
      <input v-model="subtask.title" class="border p-1 rounded flex-1 mr-2" />
      <label class="flex items-center mr-2">
        <input type="checkbox" v-model="subtask.isCompleted" class="mr-1" />
      </label>
      <button @click="removeSubtask(index)" class="text-red-500">✕</button>
    </div>

    <button @click="addSubtask" class="bg-green-500 text-white px-2 py-1 rounded mt-2">Add Subtask</button>
  </div>
</template>




