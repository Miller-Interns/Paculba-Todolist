<!-- <script setup lang="ts">
import addIcon from './icons/icon-add.vue'
import editIcon from './icons/icon-edit.vue'
import deleteIcon from './icons/icon-delete.vue'
import saveIcon from './icons/icon-check.vue'


const props = defineProps({
  showAdd: { type: Boolean, default: true },
  showEdit: { type: Boolean, default: true },
  showDelete: { type: Boolean, default: true },
  showSave: { type: Boolean, default: true }
})

const emit = defineEmits(['add', 'edit', 'delete', 'save'])
</script>

<template>
  <div class="button-container">
    <button v-if="props.showAdd" @click="$emit('add')">
      <addIcon style="width: 1em; height: 1em; vertical-align: middle;" />
    </button>

    <button v-if="props.showEdit" @click="$emit('edit')">
      <editIcon style="width: 1em; height: 1em; vertical-align: middle;" />
      EDIT
    </button>

    <button v-if="props.showDelete" @click="$emit('delete')">
      <deleteIcon style="width: 1em; height: 1em; vertical-align: middle;" />
      DELETE
    </button>

    <button v-if="props.showSave" @click="$emit('save')">
      SAVE<saveIcon style="width: 1em; height: 1em; vertical-align: middle;" />
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
</style> -->

<!-- ButtonFormats.vue -->
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

<script setup lang="ts">
defineProps<{
  buttons: {
    label: string
    class?: string
    icon: any  // Vue icon component
    onClick: () => void
  }[]
}>()
</script>

