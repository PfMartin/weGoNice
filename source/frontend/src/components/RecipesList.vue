<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue';
import OverviewControl from '@/components/OverviewControl.vue';
import { onMounted, ref } from 'vue';
import { SortDirections } from '@/utils/constants';
import { RECIPE_SORTING_OPTIONS } from '@/utils/constants';
import { sortRecipes } from '@/utils/sorting';

const props = defineProps<{
  author?: string;
  data: Recipes.Recipe[] | null;
}>();

const selectedSortingKey = ref('Name');
const setSortingKey = (key: string): void => {
  selectedSortingKey.value = key;
  sortRecipes(
    sortDirection.value,
    selectedSortingKey.value,
    visibleRecipes.value
  );
};

const sortDirection = ref(SortDirections.ASC);
const toggleSortDirection = (): void => {
  sortDirection.value =
    sortDirection.value === SortDirections.ASC
      ? SortDirections.DESC
      : SortDirections.ASC;
  sortRecipes(
    sortDirection.value,
    selectedSortingKey.value,
    visibleRecipes.value
  );
};

const visibleRecipes = ref<Recipes.Recipe[]>([]);

onMounted(() => {
  visibleRecipes.value = props.data || [];
});
</script>

<template>
  <div class="recipes-list">
    <h3><ion-icon name="book" /> Recipes by {{ author }}</h3>
    <div v-if="visibleRecipes.length" class="overview-controls">
      <OverviewControl
        :sortingKeys="RECIPE_SORTING_OPTIONS"
        :selectedSortingKey="selectedSortingKey"
        :sortingDirection="sortDirection"
        @set-sorting-key="setSortingKey"
        @toggle-sorting-direction="toggleSortDirection"
      />
    </div>
    <div v-if="visibleRecipes.length" class="recipes">
      <template v-for="recipe in visibleRecipes" :key="recipe.name">
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
    <p v-else>There are no recipes for this author so far...</p>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';
.recipes-list {
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    background-color: $bg-color-mid;
    padding: 0.5rem 1rem;
    border-radius: $border-radius;
    color: $text-color;
    box-shadow: $shadow;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .overview-controls {
    margin: 1rem 0;
  }

  .recipes {
    max-height: calc(100vh - 660px);
    overflow: auto;
    color: $text-color;
    display: flex;
    gap: 1rem;
    padding: 1rem;
    flex-wrap: wrap;
  }

  p {
    background: $bg-color-mid;
    border-radius: $border-radius;
    padding: 0.5rem 1rem;
    color: $text-color;
    margin: 1rem auto;
    font-size: 1rem;
    box-shadow: $shadow;
  }
}
</style>
