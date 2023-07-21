<script setup lang="ts">
defineProps<{
  data: Recipes.Recipe;
}>();
</script>

<template>
  <div class="recipe-card">
    <div class="picture">
      <!-- v-if="!data.imageName" -->
      <ion-icon name="person" />
      <!-- <img v-if="img" :src="img" /> -->
      <!-- <SpinnerComponent size="small" v-else /> -->
    </div>
    <div class="main"></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.recipe-card {
  background: $bg-color-mid;
  padding: 0.5rem;
  border-radius: $border-radius;
  border: 2px solid $bg-color-mid;
  color: $text-color;
  padding: 0.5rem;
  width: 200px;
  // display: grid;
  justify-content: center;

  &:hover {
    cursor: pointer;
    background-color: $bg-color-dark;
    border-color: $accent-color;

    .main {
      background: $bg-color-mid;
    }
  }

  .picture {
    margin: auto;
    display: flex;
    height: 150px;
    justify-content: center;
    align-items: center;
    width: 150px;
    overflow: hidden;
    border-radius: $border-radius;

    img {
      height: 100px;
      border-radius: $border-radius;
    }

    ion-icon {
      font-size: 6rem;
      color: $bg-color-light;
      z-index: 1;
    }
  }

  .main {
    display: flex;
    background: $bg-color-dark;
    padding: 0.5rem;
    border-radius: $border-radius;
    transition: background-color 0.3s;

    h3 {
      padding: 0;
      margin: 0;
    }
  }
}
</style>
