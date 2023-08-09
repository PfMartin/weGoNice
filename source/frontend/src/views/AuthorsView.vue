<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'create',
  buttonText: 'New Author',
};

const pushAuthorsCreate = (): void => {
  router.push({ name: 'AuthorsCreate' });
};
</script>

<template>
  <div class="authors-overview">
    <body>
      <HeaderBar :config="headerConfig" @button-click="pushAuthorsCreate" />

      <RouterView />
    </body>
  </div>
</template>

<style scoped lang="scss"></style>
