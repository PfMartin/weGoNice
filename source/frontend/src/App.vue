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

body {
  background: $main-bg-color;
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  padding: 0;
  font-family: Monserrat, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  color: $text-color;
  display: relative;
}

section {
  padding: 0;
  margin-left: 50px;

  h1 {
    padding: 0;
    margin: 0;
  }
}
</style>
