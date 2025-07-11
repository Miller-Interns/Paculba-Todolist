<script setup lang="ts">
defineProps<{
  msg: string
  date: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="blue">{{ msg }}</h1>
    <h2 class="white">{{date}}</h2>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
  margin-bottom: 0;
}

h2 {
  font-size: 2 rem;
   margin-top: 0;
}

.greetings{
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings{
    text-align: center;
  }
}
</style>
