<template>
  <nav v-if="isAuthenticated">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import authenticate from './auth';

export default defineComponent({
  name: 'App',
  setup() {
    authenticate();
    const store = useStore();

    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    return {
      isAuthenticated,
    };
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400&display=swap');
@import './styles/colors.scss';

body {
  background: $main-bg-color;
}

#app {
  padding: 0.5rem;
  font-family: Monserrat, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  color: $text-color;
}

nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
