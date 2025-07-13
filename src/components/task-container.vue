<script setup lang="ts">
interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
}

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'toggle-completed', id: string): void
}>()

const toggle = () => {
  emit('toggle-completed', props.task.id)
}
</script>

<template>
  <div class="task-card" :class="{ completed: task.completed }">
    <input type="checkbox" :checked="task.completed" @change="toggle" />
    <div class="task-content">
      <strong>{{ task.title }}</strong>
      <div v-if="task.description" class="task-description">{{ task.description }}</div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.task-card.completed strong {
  text-decoration: line-through;
  color: #888;
}

.task-description {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
}
</style>
