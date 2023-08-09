<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getAllRecipes } from '@/apis/weGoNice/recipes';
import { RECIPE_SORTING_OPTIONS, SortDirections } from '@/utils/constants';
import RecipeCard from '@/components/RecipeCard.vue';
import OverviewControl from '@/components/OverviewControl.vue';
import { sortRecipes } from '@/utils/sorting';
import { useStore } from 'vuex';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

const store = useStore();

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

const listHeight = ref(0);
const computeListHeight = () => (listHeight.value = window.innerHeight - 180);

const recipes = ref<Recipes.Recipe[]>([]);

const visibleRecipes = computed(() => {
  const searchInput = store.getters['search/searchInput'].toLowerCase();

  return recipes.value.filter((r) => {
    const name = r.name.toLowerCase();
    const authorName = r.author?.name.toLowerCase();
    const authorFirstName = r.author?.firstName.toLowerCase();
    const authorLastName = r.author?.lastName.toLowerCase();

    return (
      name.includes(searchInput) ||
      authorName?.includes(searchInput) ||
      authorFirstName?.includes(searchInput) ||
      authorLastName?.includes(searchInput)
    );
  });
});

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  recipes.value = (await getAllRecipes()) || [];
  computeListHeight();
  addEventListener('resize', computeListHeight);
  isLoading.value = false;
});
</script>

<template>
  <div class="recipes-overview">
    <OverviewControl
      :sortingKeys="RECIPE_SORTING_OPTIONS"
      :selectedSortingKey="selectedSortingKey"
      :sortingDirection="sortDirection"
      @set-sorting-key="setSortingKey"
      @toggle-sorting-direction="toggleSortDirection"
      :hasFilter="visibleRecipes.length < recipes.length"
    />

    <div
      class="recipes"
      v-if="!isLoading"
      :style="`max-height: ${listHeight}px`"
    >
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
    <div class="spinner-container" v-else>
      <SpinnerComponent size="large" />
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
    flex-wrap: wrap;
    gap: 1rem;
  }

  .spinner-container {
    margin-top: 5rem;
    display: flex;
    justify-content: center;
  }
}
</style>
