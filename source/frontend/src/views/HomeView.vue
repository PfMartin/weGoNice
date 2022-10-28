<template>
  <HeaderBar :config="headerConfig" />
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
isTokenExpired() && refreshToken();
console.log(isTokenExpired());
</script>

<style scoped lang="scss"></style>
