<template lang="html">
  <div class="modal-component">
    <Transition name="fade" appear>
      <div
        v-if="isVisible"
        class="outline"
        z-index="10"
        @click="closeModal"
      ></div>
    </Transition>
    <Transition name="slide" appear>
      <div v-if="isVisible" :class="modalStyle">
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
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits, ref } from 'vue';

export interface ModalConfig {
  size: 's' | 'm' | 'l' | 'xl' | 'xxl';
}

const props = defineProps<{
  config: ModalConfig;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const isVisible = ref(true);
const closeModal = () => {
  isVisible.value = false;
  setTimeout(() => {
    emit('close');
  }, 200);
};

const modalStyle = computed(() => `modal-content ${props.config.size}`);
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

$modal-height: 720px;
$modal-width-s: 480px;
$modal-width-m: 720px;
$modal-width-l: 960px;
$modal-width-xl: 1240px;
$modal-width-xxl: 1520px;

.outline {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: $bg-dark-modal;
}
.modal-content {
  top: 100px;
  position: fixed;
  background: $bg-color-dark;
  max-height: $modal-height;
  padding: 1rem;
  border-radius: $border-radius;

  &.s {
    left: calc(100vw / 2 - #{$modal-width-s / 2});
    width: $modal-width-s;
  }

  &.m {
    left: calc(100vw / 2 - #{$modal-width-m / 2});
    width: $modal-width-m;
  }
  &.l {
    left: calc(100vw / 2 - #{$modal-width-l / 2});
    width: $modal-width-l;
  }
  &.xl {
    left: calc(100vw / 2 - #{$modal-width-xl / 2});
    width: $modal-width-xl;
  }

  &.xxl {
    left: calc(100vw / 2 - #{$modal-width-xxl / 2});
    width: $modal-width-xxl;
  }
}

main {
  background: $bg-color-mid;
  margin: 1rem 0;
  border-radius: $border-radius;
  padding: 1rem;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100vh);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease-out;
}
</style>
