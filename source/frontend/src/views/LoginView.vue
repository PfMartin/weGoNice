<template>
  <div class="login-page">Login Page</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const store = useStore();
    console.log(store.getters.isAuthenticated);
  },
});
</script>

<style scoped lang="scss"></style>
