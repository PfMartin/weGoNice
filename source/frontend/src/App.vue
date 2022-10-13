<template>
  <NavBar />
  <section>
    <router-view />
  </section>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
@import './styles/colors.scss';
@import './styles/outline.scss';

body {
  background: $view-bg-color;
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  padding: 0;
  font-family: Monserrat, sans-serif;
  color: $text-color;
  display: relative;
}

section {
  margin: $margin-out $margin-out $margin-out
    calc(50px + $margin-out + $margin-out);
  background: $main-bg-color;
  border-radius: 10px;
  height: calc(100vh - 1rem - 2 * $section-padding);
  padding: $section-padding;
  box-shadow: $box-shadow;

  h1 {
    padding: 0;
    margin: 0;
  }
}
</style>
