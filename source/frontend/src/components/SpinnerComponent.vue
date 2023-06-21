<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  size?: 'small' | 'mid' | 'large';
}>();

const spinnerClass = computed(() => ['spinner', props.size || 'mid']);
</script>

<template>
  <div :class="spinnerClass"></div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
.spinner {
  display: inline-block;
  border: 4px solid $bg-color-dark;
  border-radius: 50%;
  border-top-color: $accent-color;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spinner 1s ease-in-out infinite;

  &.small {
    width: 20px;
    height: 20px;
  }

  &.mid {
    width: 30px;
    height: 30px;
  }

  &.large {
    width: 50px;
    height: 50px;
  }
}

@keyframes spinner {
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-webkit-keyframes spinner {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
