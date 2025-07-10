<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';

</script>


<template>
  <div class="center-content">
      <HelloWorld msg="TO DO" />
      
  </div>
</template>

<style>
.full-height-container {
  height: 100vh;
  width: 100vw;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
}

.center-content h1 {
  margin-bottom: 20px;
}
</style>
