<template>
  <div class="navbar">
    <body>
      <div class="logout">
        <NavIcon name="log-out" @click="logout" />
      </div>
      <nav>
        <router-link :to="{ name: 'Home' }"
          ><NavIcon name="home"
        /></router-link>
        <router-link :to="{ name: 'Recipes' }"
          ><NavIcon name="book"
        /></router-link>
        <router-link :to="{ name: 'Authors' }"
          ><NavIcon name="people"
        /></router-link>
      </nav>
      <div class="options">
        <NavIcon name="person-circle" />
        <NavIcon name="notifications" />
        <NavIcon name="settings" />
      </div>
    </body>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '@/components/NavIcon.vue';

const logout = () => {
  console.log('logout');
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.navbar {
  position: relative;

  body {
    position: absolute;
    background: $content-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    height: 100vh;
    justify-content: space-between;

    .logout {
      margin-top: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    nav {
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: center;

      a {
        text-decoration: none;
        color: inherit;
        border-left: 3px solid $content-color;

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }

      .router-link-active {
        color: $accent-color;
        border-left: 3px solid $accent-color;
      }
    }

    .options {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      margin-bottom: 2rem;

      & * {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
