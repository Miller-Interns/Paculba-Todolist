<script setup lang="ts">
const props = defineProps<{
  label: string
  checked: boolean
}>()

const emit = defineEmits(['toggle'])

function handleToggle() {
  emit('toggle')
}
</script>

<template>
  <div class="checkbox-item">
    <input type="checkbox" :checked="checked" @change="handleToggle" />
    <span :class="{ completed: checked }">{{ label }}</span>
  </div>
</template>

<style scoped>
.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}

.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
























<!-- <script setup lang="ts">
import { ref, watch } from 'vue'

// Each checkbox has a label and checked status
interface CheckboxItem {
  label: string
  checked: boolean
}

const checkboxes = ref<CheckboxItem[]>([
  { label: '', checked: false }
])

// Add a new checkbox when the last one receives Enter key
const handleKeydown = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Enter' && index === checkboxes.value.length - 1) {
    checkboxes.value.push({ label: '', checked: false })
  }
}
</script>

<template>
  <div class="checkbox-list">
    <div
      class="checkbox-item"
      v-for="(box, index) in checkboxes"
      :key="index"
    >
    
      <input
        type="checkbox"
        v-model="box.checked"
      />

      <input
        type="text"
        v-model="box.label"
        @keydown="handleKeydown($event, index)"
        placeholder="Enter label and press Enter"
      />
    </div>
  </div>
</template> -->






<!-- 



<style scoped>
.checkbox-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style> -->





