<script setup lang="ts">
defineProps<{
  buttons: {
    label: string
    class?: string
    icon: any
    onClick: () => void
  }[]
}>()
</script>

<template>
  <div class="button-container">
    <button
      v-for="button in buttons"
      :key="button.label"
      :class="button.class"
      @click="button.onClick"
      class="flex items-center gap-1"
    >
      <component :is="button.icon" class="w-4 h-4" />
      <span>{{ button.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
}

button {
  width: 2rem;
  height: 2rem;
  color: black;
  background: #efbdbd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  border: none;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;
  border-radius: 50%;
}

button:hover {
  background-color: #bbb7e5;
}
</style>
