<template>
  <body>
    <HeaderBar :config="headerConfig" />
  </body>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'add-circle-outline',
  buttonText: 'Add Author',
};
</script>

<style scoped lang="scss"></style>
