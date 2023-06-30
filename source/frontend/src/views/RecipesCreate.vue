<script setup lang="ts">
import RecipeInfo from '@/components/RecipeInfo.vue';
import { OperationMode } from '@/utils/constants';
</script>

<template>
  <div class="recipes-create"><RecipeInfo :mode="OperationMode.Create" /></div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
.recipes-create {
  margin: 1rem 1rem 1rem calc($nav-bar-width + 1rem);

  .buttons {
    .control-buttons {
    }
  }
}
</style>
