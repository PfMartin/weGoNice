<template>
  <HeaderBar :config="headerConfig" @search-input="onSearchInput" />
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

const onSearchInput = (searchValue: string) => {
  console.log(searchValue);
};

isTokenExpired() && refreshToken();
console.log(isTokenExpired());
</script>

<style scoped lang="scss"></style>
