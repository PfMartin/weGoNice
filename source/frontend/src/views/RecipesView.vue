<template>
  <body>
    <HeaderBar :config="headerConfig" @search-input="onSearchInput" />
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

const onSearchInput = (searchValue: string) => {
  console.log(searchValue);
};

const getRecipes = async () => {
  const res = await getAllRecipes();
  console.log(res);
};

getRecipes();
</script>

<style scoped lang="scss"></style>
