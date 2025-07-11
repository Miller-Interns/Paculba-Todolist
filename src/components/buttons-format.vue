<script setup lang="ts">
import addIcon from './icons/icon-add.vue'
import editIcon from './icons/icon-edit.vue'
import deleteIcon from '.icons/icon-delete.vue'

</script>

<template>
  <div class="button-container">
    <button>
      <addIcon style="width: 1em; height: 1em; vertical-align: middle;" />
      ADD
    </button>
    <button>
      <editIcon style="width: 1em; height: 1em; vertical-align: middle;" />
      EDIT
    </button>
    <button>
      <deleteIcon style="width: 1em; height: 1em; vertical-align: middle;" />
      DELETE
    </button>
  </div>
</template>

<style scoped>

button-container {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button {
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