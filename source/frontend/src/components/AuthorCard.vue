<template>
  <body>
    <h1>{{ data.name }}</h1>
    <p>{{ data.website }}</p>
    <p>{{ data.instagram }}</p>
    <p>{{ data.youTube }}</p>
  </body>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  data: any;
}>();
</script>

<style scoped lang="scss"></style>
