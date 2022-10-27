<template>
  <body>
    <HeaderBar :config="headerConfig" />
  </body>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { getAllRecipes } from '@/apis/weGoNice';

const headerConfig = {
  pageTitle: 'Recipes',
  iconName: 'add-circle-outline',
  buttonText: 'Add Recipe',
};

const getRecipes = async () => {
  const res = await getAllRecipes();
  console.log(res);
};

getRecipes();
</script>

<style scoped lang="scss"></style>
