<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue';

defineProps<{
  author?: string;
  data: Recipes.Recipe[];
}>();
</script>

<template>
  <div class="recipes-list">
    <h1>Recipes by {{ author }}</h1>
    <div class="recipes">
      <RecipeCard v-for="recipe in data" :data="recipe" :key="recipe.title" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';
.recipes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .recipes {
    background: $bg-color-mid;
    border-radius: $border-radius;
    color: $text-color;
    display: flex;
    gap: 5px;
    padding: 1rem;
    box-shadow: $shadow;
  }
}
</style>
