<!-- components/text-boxes.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue'

// Accept v-model binding as prop
const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

// Emit event when input changes
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// Local copy of the input value
const inputValue = ref(props.modelValue)

// Sync changes from parent
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

// Emit changes to parent
watch(inputValue, (newVal) => {
  emit('update:modelValue', newVal)
})
</script>

<template>
  <input
    v-model="inputValue"
    :placeholder="placeholder || 'Enter value...'"
    class="textbox"
    type="text"
  />
</template>

<style scoped>
.textbox {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.8rem;
}
</style>
