<template>
  <ion-icon class="icon" :name="name"></ion-icon>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  name: string;
}>();
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
.icon {
  width: 25px;
  height: 25px;
  transition: color 0.5s;

  &:hover {
    color: $accent-color;
    cursor: pointer;
  }
}
</style>
