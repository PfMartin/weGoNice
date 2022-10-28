<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createAuthor"
    />
  </body>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'add-circle-outline',
  buttonText: 'Add Author',
};

const onSearchInput = (searchValue: string): void => {
  console.log(searchValue);
};

const createAuthor = (): void => {
  console.log('createAuthor');
};
</script>

<style scoped lang="scss"></style>
