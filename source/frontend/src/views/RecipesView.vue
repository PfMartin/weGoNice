<template>
  <body>
    <header>
      <h2>Recipes</h2>
      <SearchBox @on-input="onSearchInput" />
    </header>
    <router-link :to="{ name: 'Home' }">
      <ButtonComponent buttonText="New Recipe" iconName="add-circle-outline" />
    </router-link>
  </body>
</template>

<script setup lang="ts">
import SearchBox from '@/components/SearchBox.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const onSearchInput = (inputValue: string) => {
  console.log(inputValue);
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

body {
  margin: $margin-out $margin-out $margin-out
    calc(50px + $margin-out + $margin-out);
  padding: $section-padding;
  border-radius: 10px;
  background: $bg-color-dark;
  box-shadow: $box-shadow;
  color: $text-color;
  display: flex;
  align-items: center;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;

    h2 {
      margin: 0;
      padding: 0;
      margin-right: 3rem;
    }
  }
}
</style>
