<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createRecipe"
    />
  </body>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { getAllRecipes } from '@/apis/weGoNice';

const headerConfig = {
  pageTitle: 'Recipes',
  buttonIconName: 'add-circle-outline',
  buttonText: 'Add Recipe',
};

const onSearchInput = (searchValue: string): void => {
  console.log(searchValue);
};

const getRecipes = async (): Promise<void> => {
  const res = await getAllRecipes();
  console.log(res);
};

getRecipes();

const createRecipe = (): void => {
  console.log('createRecipe');
};
</script>

<style scoped lang="scss"></style>
