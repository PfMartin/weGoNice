<script setup lang="ts">
import RecipeCard from '@/components/RecipeCard.vue';
import OverviewControl from '@/components/OverviewControl.vue';
import { onMounted, ref } from 'vue';
import { SortDirections } from '@/utils/constants';
import { RECIPE_SORTING_OPTIONS } from '@/utils/constants';

const props = defineProps<{
  author?: string;
  data: Recipes.Recipe[];
}>();

const selectedSortingKey = ref('Name');
const setSortingKey = (key: string): void => {
  selectedSortingKey.value = key;
  sortRecipes();
};

const sortDirection = ref(SortDirections.ASC);
const toggleSortDirection = (): void => {
  sortDirection.value =
    sortDirection.value === SortDirections.ASC
      ? SortDirections.DESC
      : SortDirections.ASC;
  sortRecipes();
};

const visibleRecipes = ref<Recipes.Recipe[]>([]);

const sortRecipes = (): void => {
  const sortKey: string =
    selectedSortingKey.value.charAt(0).toLowerCase() +
    selectedSortingKey.value.slice(1);

  visibleRecipes.value = visibleRecipes.value.sort((a: any, b: any) => {
    switch (selectedSortingKey.value) {
      case 'Author':
        if (a.author.name && b.author.name) {
          if (a.author.name < b.author.name) {
            return sortDirection.value === SortDirections.ASC ? -1 : 1;
          } else {
            return sortDirection.value === SortDirections.ASC ? 1 : -1;
          }
        } else if (a.author.lastName && b.author.lastName) {
          if (a.author.lastName < b.author.lastName) {
            return sortDirection.value === SortDirections.ASC ? -1 : 1;
          } else {
            return sortDirection.value === SortDirections.ASC ? 1 : -1;
          }
        } else if (a.author.firstName && b.author.firstName) {
          if (a.author.firstName < b.author.firstName) {
            return sortDirection.value === SortDirections.ASC ? -1 : 1;
          } else {
            return sortDirection.value === SortDirections.ASC ? 1 : -1;
          }
        }
        return sortDirection.value === SortDirections.ASC ? 1 : -1;
      case 'Time':
        if (
          a.timeHours * 60 + a.timeMinutes <
          b.timeHours * 60 + b.timeMinutes
        ) {
          return sortDirection.value === SortDirections.ASC ? -1 : 1;
        }
        return sortDirection.value === SortDirections.ASC ? 1 : -1;
      default:
        if (a[sortKey] < b[sortKey]) {
          return sortDirection.value === SortDirections.ASC ? -1 : 1;
        }
        return sortDirection.value === SortDirections.ASC ? 1 : -1;
    }
  });
};

onMounted(() => {
  visibleRecipes.value = props.data;
});
</script>

<template>
  <div class="recipes-list">
    <h3>Recipes by {{ author }}</h3>
    <div class="overview-controls">
      <OverviewControl
        :sortingKeys="RECIPE_SORTING_OPTIONS"
        :selectedSortingKey="selectedSortingKey"
        :sortingDirection="sortDirection"
        @set-sorting-key="setSortingKey"
        @toggle-sorting-direction="toggleSortDirection"
      />
    </div>
    <div class="recipes">
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
}
</style>
