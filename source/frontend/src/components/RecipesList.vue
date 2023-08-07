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
      <template v-for="recipe in data" :key="recipe.name">
        <RouterLink
          :to="{
            name: 'RecipesDetail',
            params: {
              id: recipe.id,
            },
          }"
        >
          <RecipeCard :data="recipe" />
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';
.recipes-list {
  display: flex;
  flex-direction: column;

  h1 {
    background-color: $bg-color-mid;
    padding: 0.5rem 1rem;
    border-radius: $border-radius;
    color: $text-color;
    box-shadow: $shadow;
  }
  .recipes {
    margin-top: 0.5rem;
    max-height: calc(100vh - 610px);
    overflow: auto;
    color: $text-color;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }
}
</style>
