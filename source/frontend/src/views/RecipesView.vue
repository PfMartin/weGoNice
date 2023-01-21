<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { getAllRecipes } from '@/apis/weGoNice';
import { useStore } from 'vuex';

const headerConfig = {
  pageTitle: 'Recipes',
  buttonIconName: 'add',
  buttonText: 'Add Recipe',
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
  console.log('createRecipe');
};
</script>

<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createRecipe"
    />
  </body>
</template>

<style scoped lang="scss"></style>
