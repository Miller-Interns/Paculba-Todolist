<script setup lang="ts">
import buttonsFormat from '@/components/buttons-format.vue';
import { ref } from 'vue'

const showCategories = ref(false)

function toggleCategories() {
  showCategories.value = !showCategories.value
}

function handleAdd() {
  // Your logic for adding tasks
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar-title">ToDo App</div>
    <div class="navbar-links">
      <router-link to="/">Home</router-link>
    </div>
  </nav>
  
  <div class="full-height-container" :class="{ 'expanded': showCategories }">
    
    <!-- Add Tasks Section -->
    <div class="add-category">
      <h2>Add Tasks</h2>
      <input type="text" placeholder="Title: " />
      <input type="text" placeholder="Tasks: " />
      <buttonsFormat
        :showAdd="true"
        :showEdit="false"
        :showDelete="false"
        @add="handleAdd"
      />
      <button @click="toggleCategories" class="toggle-button">
        {{ showCategories ? 'Hide Tasks' : 'Show Tasks' }}
      </button>
    </div>

    <!-- All Tasks Section -->
    <div v-if="showCategories" class="all-tasks-container">
      <h3>All Tasks</h3>
      <!-- Replace with real tasks -->
      <ul>
        <li>Sample Task 1</li>
        <li>Sample Task 2</li>
        <li>Sample Task 3</li>
        <li>Sample Task 1</li>
        <li>Sample Task 2</li>
        <li>Sample Task 3</li>
        <li>Sample Task 1</li>
        <li>Sample Task 2</li>
        <li>Sample Task 3</li>
        <li>Sample Task 2</li>
        <li>Sample Task 3</li>
        <li>Sample Task 2</li>
        <li>Sample Task 3</li>
      </ul>
    </div>

  </div>
</template>

<style scoped>
.full-height-container {
  min-height: calc(100vh - 60px);
  width: 100vw;
  margin: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column; /* Vertical layout */
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.full-height-container.expanded {
  justify-content: flex-start;
  align-items: center;
}

.add-category {
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.all-tasks-container {
  width: 70vw;
  max-height: 300px; /* or any fixed height you want */
  overflow-y: auto;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

</style>
