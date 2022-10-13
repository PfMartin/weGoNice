<template>
  <h1>Home</h1>
</template>

<script setup lang="ts">
import { refreshToken } from '@/apis/weGoNice';
import { isTokenExpired } from '@/auth';

isTokenExpired() && refreshToken();
console.log(isTokenExpired());
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

h1 {
  color: $text-color-dark;
}
</style>
