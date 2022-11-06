<template>
  <body id="body">
    <NavBar v-if="isLoggedIn" />
    <section>
      <router-view v-slot="{ Component, route }">
        <Transition :name="route.meta.transition || ''" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </section>
  </body>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import { computed } from 'vue';
import { isAuthenticated } from '@/auth';

const isLoggedIn = computed(() => isAuthenticated());
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
@import './styles/colors.scss';
@import './styles/outline.scss';

body {
  background: $bg-color-light;
  margin: 0;
  padding: 0;
}

#app {
  margin: 0;
  padding: 0;
  font-family: Monserrat, sans-serif;
  color: $text-color;
  display: relative;

  a {
    text-decoration: none;
  }

  ion-icon {
    pointer-events: none;
  }
}

section {
  height: calc(100vh - 1rem - 2 * $section-padding);
  color: $text-color-dark;
  overflow: hidden;

  h1 {
    padding: 0;
    margin: 0;
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease-out;
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(-600px);
    opacity: 0;
  }
}
</style>
