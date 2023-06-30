<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'create',
  buttonText: 'New Author',
};

// Searching, sorting and filtering
const onSearchInput = (searchValue: string): void => {
  console.log(searchValue);
};

const pushAuthorsCreate = (): void => {
  router.push({ name: 'AuthorsCreate' });
};
</script>

<template>
  <div class="authors-overview">
    <body>
      <HeaderBar
        :config="headerConfig"
        @search-input="onSearchInput"
        @button-click="pushAuthorsCreate"
      />

      <RouterView />
    </body>
  </div>
</template>

<style scoped lang="scss"></style>
