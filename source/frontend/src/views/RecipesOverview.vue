<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getAllRecipes } from '@/apis/weGoNice/recipes';
import { RECIPE_SORTING_OPTIONS, SortDirections } from '@/utils/constants';
import DropdownInput from '@/components/DropdownInput.vue';
import RecipeCard from '@/components/RecipeCard.vue';

const selectedOption = ref('Name');
const setSelectedOption = (option: string): void => {
  selectedOption.value = option;
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

const sortDirectionIcon = computed((): string =>
  sortDirection.value === SortDirections.ASC ? 'arrow-down' : 'arrow-up'
);

const sortRecipes = (): void => {
  const sortKey: string =
    selectedOption.value.charAt(0).toLowerCase() +
    selectedOption.value.slice(1);

  recipes.value = recipes.value.sort((a: any, b: any) => {
    switch (selectedOption.value) {
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
    <div class="list-control">
      <div class="controls">
        <div class="sorting">
          <div class="dropdown-container">
            <DropdownInput
              :options="RECIPE_SORTING_OPTIONS"
              :selectedOption="selectedOption"
              @select-option="setSelectedOption"
              id="recipeSortBy"
              label="Sort By"
              iconName="list"
              width="300px"
            />
          </div>
          <span @click="toggleSortDirection" class="sort-direction"
            ><ion-icon :name="sortDirectionIcon"
          /></span>
        </div>
      </div>
    </div>

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

  .list-control {
    padding: 0 1rem;
    h1 {
      padding: 0;
      margin: 0;
    }

    .controls {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .sorting {
        display: flex;
        margin-right: 1rem;
        .sort-direction {
          margin-left: 0.2rem;
          font-size: 1.5rem;
          color: $bg-color-mid;
          display: flex;
          align-items: center;

          &:hover {
            cursor: pointer;
            color: $bg-color-dark;
          }
        }
      }

      .filter-switches {
        display: flex;
        gap: 0.5rem;
      }
    }
  }

  .recipes {
    margin: 2rem 0;
    display: flex;
    gap: 1rem;
  }
}
</style>
