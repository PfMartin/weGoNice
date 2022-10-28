<template>
  <body>
    <HeaderBar :config="headerConfig" @search-input="onSearchInput" />
  </body>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'add-circle-outline',
  buttonText: 'Add Author',
};

const onSearchInput = (searchValue: string) => {
  console.log(searchValue);
};
</script>

<style scoped lang="scss"></style>
