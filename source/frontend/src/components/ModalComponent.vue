<template lang="html">
  <div class="outline" z-index="10">
    <div :class="modalStyle">
      <header>
        <slot name="header"></slot>
      </header>
      <body>
        <slot></slot>
      </body>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

export interface ModalConfig {
  size: 's' | 'm' | 'l' | 'xl';
}

const props = defineProps<{
  config: ModalConfig;
}>();

const modalStyle = computed(() => `modal ${props.config.size}`);
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.outline {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: $bg-color-dark;
  opacity: 80%;
}
</style>
