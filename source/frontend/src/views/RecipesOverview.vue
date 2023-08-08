<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { getAllRecipes } from '@/apis/weGoNice/recipes';
import { RECIPE_SORTING_OPTIONS, SortDirections } from '@/utils/constants';
import RecipeCard from '@/components/RecipeCard.vue';
import OverviewControl from '@/components/OverviewControl.vue';
import { sortRecipes } from '@/utils/sorting';
import { useStore } from 'vuex';
import search from '@/store/search';

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
const isReady = computed(() => !!recipes.value.length);

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

onMounted(async () => {
  recipes.value = (await getAllRecipes()) || [];
  computeListHeight();
  addEventListener('resize', computeListHeight);
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
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style>
