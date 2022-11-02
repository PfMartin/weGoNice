<template lang="html">
  <Transition name="modal">
    <div class="outline" z-index="10" @click="emit('close')">
      <div :class="modalStyle" @click.stop>
        <header>
          <slot name="header"></slot>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';

export interface ModalConfig {
  size: 's' | 'm' | 'l' | 'xl';
}

const props = defineProps<{
  config: ModalConfig;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const modalStyle = computed(() => `modal-content ${props.config.size}`);
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

$modal-width: 720px;
$modal-height: 720px;

.outline {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: $bg-dark-modal;

  .modal-content {
    top: 100px;
    left: calc(100vw / 2 - #{$modal-width / 2});
    position: fixed;
    background: $bg-color-dark;
    width: $modal-width;
    max-height: $modal-height;
    padding: 1rem;
  }

  main {
    background: $bg-color-mid;
    margin: 1rem 0;
  }
}
</style>
