<template>
  <body>
    <h1>{{ data.Name }}</h1>
    <p>{{ data.Website }}</p>
    <p>{{ data.Instagram }}</p>
    <p>{{ data.YouTube }}</p>
  </body>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  data: any;
}>();
</script>

<style scoped lang="scss"></style>
