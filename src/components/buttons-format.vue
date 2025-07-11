<script setup lang="ts">
import addIcon from './icons/icon-add.vue'
import editIcon from './icons/icon-edit.vue'
import deleteIcon from './icons/icon-delete.vue'

const props = defineProps({
  showAdd: { type: Boolean, default: true },
  showEdit: { type: Boolean, default: true },
  showDelete: { type: Boolean, default: true }
})

const emit = defineEmits(['add', 'edit', 'delete'])
</script>

<template>
  <div class="button-container">
    <button v-if="props.showAdd" @click="$emit('add')">
      <addIcon style="width: 1em; height: 1em; vertical-align: middle;" />
      ADD
    </button>

    <button v-if="props.showEdit" @click="$emit('edit')">
      <editIcon style="width: 1em; height: 1em; vertical-align: middle;" />
      EDIT
    </button>

    <button v-if="props.showDelete" @click="$emit('delete')">
      <deleteIcon style="width: 1em; height: 1em; vertical-align: middle;" />
      DELETE
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
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #1565c0;
}
</style>
