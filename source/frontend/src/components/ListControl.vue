<template>
  <div class="list-control">
    <div class="controls">
      <div class="dropdown-container">
        <DropdownInput :options="sortingOptions" />
      </div>
      <!-- <p>Name Ascending Descending</p>
      <p>Amount Recipes Ascending Descending</p>
      <p>Toggle show authors with 0 Recipes</p>
      <p>Creation Date Ascending Descending</p>
      <p>Modification Date Ascending Descending</p>
      <p>Toggle for youtube, instagram, website</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import DropdownInput from '@/components/DropdownInput.vue';

defineProps<{
  sortingOptions: string[];
}>();
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.list-control {
  margin-left: $nav-bar-width;
  padding: 1rem 2rem;

  h1 {
    padding: 0;
    margin: 0;
  }

  .controls {
    display: flex;

    p {
      margin: 1rem;
      border: 1px solid $bg-color-dark;
    }
  }
}
</style>
