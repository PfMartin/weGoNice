<template>
  <div class="navbar">
    <body @click.prevent="toggleExpand" :class="navBarClass">
      <div class="logout">
        <NavIcon name="log-out" @click="logout" />
        <p>Logout</p>
      </div>
      <nav>
        <router-link :to="{ name: 'Home' }"
          ><NavIcon name="home" />
          <p>Home</p></router-link
        >
        <router-link :to="{ name: 'Recipes' }">
          <NavIcon name="book" />
          <p>Recipes</p>
        </router-link>
        <router-link :to="{ name: 'Authors' }">
          <NavIcon name="people" />
          <p>Authors</p></router-link
        >
      </nav>
      <div class="options">
        <div>
          <NavIcon name="person-circle" />
          <p>Account</p>
        </div>
        <div>
          <NavIcon name="notifications" />
          <p>Notifications</p>
        </div>
        <div>
          <NavIcon name="settings" />
          <p>Settings</p>
        </div>
      </div>
    </body>
  </div>
</template>

<script setup lang="ts">
import NavIcon from '@/components/NavIcon.vue';
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Expanding the navbar
const isExpanded = ref(false);
const toggleExpand = (e: Event) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('bar')) {
    isExpanded.value = !isExpanded.value;
  }
};
const navBarClass = computed(() => {
  return {
    bar: true,
    expanded: isExpanded.value,
  };
});

// Routing
const store = useStore();
const router = useRouter();

const logout = () => {
  store.dispatch('auth/setSessionToken', '');
  router.push({ name: 'Login' });
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.navbar {
  position: relative;
  margin: $margin-out;

  body {
    position: absolute;
    background: $bg-color;
    display: flex;
    flex-direction: column;
    width: 50px;
    height: calc(100vh - 1rem);
    justify-content: space-between;
    transition: width 1s;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: $box-shadow;

    &:hover {
      cursor: pointer;
    }

    &.expanded {
      width: 165px;
    }

    .logout {
      margin-top: $margin-out;
      display: flex;
      align-items: center;
      padding-left: 15px;
      gap: 20px;
      width: 200px;

      &:hover {
        color: $accent-color;
        transition: color 0.5s;
      }
    }

    nav {
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: center;

      a {
        text-decoration: none;
        color: inherit;
        border-left: 3px solid $bg-color;
        display: flex;
        align-items: center;
        gap: 20px;
        padding-left: 10px;
        width: 200px;
        transition: color 0.5s;

        &:hover {
          color: $accent-color;
        }

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
      margin-bottom: 2rem;
      width: 200px;

      & * {
        display: flex;
        gap: 20px;
        align-items: center;
        margin-left: 6px;
        margin-bottom: 5px;
        transition: color 0.2s;

        &:hover {
          color: $accent-color;
        }
      }
    }
  }

  p {
    padding: 0;
    margin: 0;
  }
}
</style>
