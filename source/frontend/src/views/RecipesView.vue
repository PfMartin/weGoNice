<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { getAllRecipes } from '@/apis/weGoNice';
import { useStore } from 'vuex';
import router from '@/router';

const headerConfig = {
  pageTitle: 'Recipes',
  buttonIconName: 'create',
  buttonText: 'New Recipe',
};

const onSearchInput = (searchValue: string): void => {
  console.log(searchValue);
};

const store = useStore();
const getRecipes = async (): Promise<void> => {
  const res = await getAllRecipes(store.getters['auth/sessionToken']);
  console.log(res);
};

getRecipes();

const createRecipe = (): void => {
  router.push({ name: 'RecipesCreate' });
};
</script>

<template>
  <div class="recipes-overview">
    <body>
      <HeaderBar
        :config="headerConfig"
        @search-input="onSearchInput"
        @button-click="createRecipe"
      />

      <RouterView />
    </body>
  </div>
</template>

<style scoped lang="scss"></style>
