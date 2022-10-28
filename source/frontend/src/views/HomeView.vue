<template>
  <HeaderBar
    :config="headerConfig"
    @search-input="onSearchInput"
    @button-click="createRecipe"
  />
</template>

<script setup lang="ts">
import { refreshToken } from '@/apis/weGoNice';
import { isTokenExpired } from '@/auth';
import HeaderBar from '@/components/HeaderBar.vue';

const headerConfig = {
  pageTitle: 'Home',
  buttonIconName: 'add-circle-outline',
  buttonText: 'Add Recipe',
};

const onSearchInput = (searchValue: string): void => {
  console.log(searchValue);
};

const createRecipe = (): void => {
  console.log('create recipe');
};

isTokenExpired() && refreshToken();
console.log(isTokenExpired());
</script>

<style scoped lang="scss"></style>
