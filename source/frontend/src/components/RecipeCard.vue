<script setup lang="ts">
defineProps<{
  data: Recipes.Recipe;
}>();
</script>

<template>
  <div class="recipe-card">
    <h3>{{ data.title }}</h3>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.recipe-card {
  background: $bg-color-dark;
  padding: 0.5rem;
  border-radius: $border-radius;

  h3 {
    padding: 0;
    margin: 0;
  }
}
</style>
