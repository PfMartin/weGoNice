<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getAllRecipes } from '@/apis/weGoNice/recipes';
import { RECIPE_SORTING_OPTIONS, SortDirections } from '@/utils/constants';
import DropdownInput from '@/components/DropdownInput.vue';
import RecipeCard from '@/components/RecipeCard.vue';
import OverviewControl from '@/components/OverviewControl.vue';

const selectedSortingOption = ref('Name');
const setSelectedOption = (option: string): void => {
  selectedSortingOption.value = option;
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

const sortRecipes = (): void => {
  const sortKey: string =
    selectedSortingOption.value.charAt(0).toLowerCase() +
    selectedSortingOption.value.slice(1);

  recipes.value = recipes.value.sort((a: any, b: any) => {
    switch (selectedSortingOption.value) {
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

const visibleRecipes = ref<Recipes.Recipe[]>([]);

const listHeight = ref(0);
const computeListHeight = () => (listHeight.value = window.innerHeight - 180);

const isReady = computed(() => !!recipes.value.length);

const recipes = ref<Recipes.Recipe[]>([]);
onMounted(async () => {
  recipes.value = (await getAllRecipes()) || [];
  visibleRecipes.value = recipes.value;
  computeListHeight();
  addEventListener('resize', computeListHeight);
});

// TODO: MAKE A SEPARATE COMPONENT FROM list-control
</script>

<template>
  <div class="recipes-overview">
    <OverviewControl
      :sortingOptions="RECIPE_SORTING_OPTIONS"
      :selectedOption="selectedSortingOption"
      :sortingDirection="sortDirection"
      @set-sorting-key="setSelectedOption"
      @toggle-sorting-direction="toggleSortDirection"
    />

    <div class="recipes" v-if="isReady" :style="`max-height: ${listHeight}px`">
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
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';
.recipes-overview {
  margin-left: $nav-bar-width;
  padding: 1rem 1rem;

  .recipes {
    margin: 2rem 0;
    display: flex;
    gap: 1rem;
  }
}
</style>
