<template>
  <div class="author-card">
    <header>
      <h3>{{ data.name || 'n/a' }}</h3>
    </header>
    <footer class="footer">
      <a :href="data.website"><ion-icon name="earth" /></a>
      <a :href="data.instagram"><ion-icon name="logo-instagram" /></a>
      <a :href="data.youTube"><ion-icon name="logo-youTube" /></a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  data: any;
}>();
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.author-card {
  background: $bg-color-mid;
  border-radius: $border-radius;
  color: $text-color;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    h3 {
      padding: 0;
      margin: 0;
    }
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: $text-color;
      font-size: 1.5rem;
      margin-left: 2rem;
      transition: color 0.2s;

      &:hover {
        color: $accent-color;
        cursor: pointer;
      }
    }
  }
}
</style>
