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
  <div class="flex gap-2">
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
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 1rem;
  font-size: 0.8rem;
  background-color: #efbdbd;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: bold;

}

button:hover {
  background-color: #bbb7e5;
}
</style>


