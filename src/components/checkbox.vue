<template>
  <div class="checkbox-wrapper">
    <label>
      <input type="checkbox" :checked="completed" @change="$emit('toggle')" />
      <span :class="{ completed: completed }">
        <template v-if="completed">✅</template>
        {{ label }}
      </span>
    </label>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  completed: Boolean
});

defineEmits(['toggle']);
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
}
.completed {
  text-decoration: line-through;
  color: #888;
}
label {
  cursor: pointer;
}
</style>