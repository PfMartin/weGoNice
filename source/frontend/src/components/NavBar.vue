<template>
  <div class="navbar">
    <body
      @click="toggleExpand"
      :class="navBarClass"
      ref="navBarBody"
      :tabindex="-1"
      @blur="collapseBar"
    >
      <div class="account">
        <ion-icon name="person-circle" />
        <p>Account</p>
      </div>
      <nav>
        <router-link :to="{ name: 'Recipes' }">
          <ion-icon name="book" />
          <p>Recipes</p>
        </router-link>
        <router-link :to="{ name: 'Authors' }">
          <ion-icon name="people" />
          <p>Authors</p></router-link
        >
      </nav>
      <div class="options">
        <div>
          <ion-icon name="notifications" />
          <p>Notifications</p>
        </div>
        <div>
          <ion-icon name="settings" />
          <p>Settings</p>
        </div>
        <div class="logout" @click="logout">
          <ion-icon name="log-out" />
          <p>Logout</p>
        </div>
      </div>
    </body>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// Expanding the navbar
const navBarBody = ref<HTMLElement | null>(null);
const isExpanded = ref(false);
const toggleExpand = (e: Event) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('bar')) {
    isExpanded.value = !isExpanded.value;
    navBarBody.value?.focus();
  }
};
const navBarClass = computed(() => {
  return {
    bar: true,
    expanded: isExpanded.value,
  };
});
const collapseBar = (): void => {
  isExpanded.value = false;
};

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
  z-index: 20;

  body {
    position: absolute;
    background: $bg-color-dark;
    display: flex;
    flex-direction: column;
    width: $nav-bar-width;
    height: 100vh;
    justify-content: space-between;
    transition: width 0.3s;
    overflow: hidden;

    &:hover {
      cursor: pointer;
    }

    &.expanded {
      width: 165px;
    }

    ion-icon {
      width: 25px;
      height: 25px;
    }

    .account {
      margin-top: $margin-out;
      display: flex;
      align-items: center;
      margin-left: 13px;
      margin-top: 10px;
      gap: 20px;
      width: 200px;

      &:hover {
        color: $accent-color;
        transition: color 0.3s;
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
        border-left: 2px solid $bg-color-dark;
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 5px 5px 5px 10px;
        width: 200px;
        transition: color 0.2s;

        &:hover {
          color: $accent-color;
        }

        &:not(:last-child) {
          margin-bottom: 10px;
        }
      }

      .router-link-active {
        color: $accent-color;
        border-left: 2px solid $accent-color;
      }
    }

    .options {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-bottom: 1rem;
      width: 200px;

      & * {
        display: flex;
        gap: 20px;
        align-items: center;
        margin-left: 6px;
        margin-bottom: 5px;
        transition: color 0.2s;

        &:hover {
          color: $accent-hover-color;
        }
      }

      .logout {
        margin-left: 8px;
      }
    }
  }

  p {
    padding: 0;
    margin: 0;
  }
}
</style>
