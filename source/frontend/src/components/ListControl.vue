<template>
  <div class="list-control">
    <h1>List Control</h1>
    <div class="controls">
      <p>Name Ascending Descending</p>
      <p>Amount Recipes Ascending Descending</p>
      <p>Toggle show authors with 0 Recipes</p>
      <p>Creation Date Ascending Descending</p>
      <p>Modification Date Ascending Descending</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.list-control {
  margin-left: $nav-bar-width;
  padding: 1rem;

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
