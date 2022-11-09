<template>
  <body>
    <h3>{{ data.name }}</h3>
    <p>{{ data.website || 'n/a' }}</p>
    <p>{{ data.instagram || 'n/a' }}</p>
    <p>{{ data.youTube || 'n/a' }}</p>
  </body>
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

body {
  background: $bg-color-mid;
  border-radius: $border-radius;
  color: $text-color;
  padding: 1rem;

  h3 {
    padding: 0;
    margin: 0;
  }
}
</style>
