<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const headerConfig = {
  pageTitle: 'Recipes',
  buttonIconName: 'create',
  buttonText: 'New Recipe',
};

const pushRecipesCreate = (): void => {
  router.push({ name: 'RecipesCreate' });
};
</script>

<template>
  <div class="recipes-overview">
    <body>
      <HeaderBar :config="headerConfig" @button-click="pushRecipesCreate" />

      <RouterView />
    </body>
  </div>
</template>

<style scoped lang="scss"></style>
