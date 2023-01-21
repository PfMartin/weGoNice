<template lang="html">
  <div class="modal-component">
    <Transition name="fade" appear>
      <div v-if="isVisible" class="outline" @click="closeModal"></div>
    </Transition>
    <Transition name="slide" appear>
      <div v-if="isVisible" :class="modalStyle">
        <header>
          <div class="close-button" @click="closeModal">
            <ion-icon name="close" />
          </div>
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
import { computed, ref, watch } from 'vue';

export interface ModalConfig {
  size: 's' | 'm' | 'l' | 'xl' | 'xxl';
}

const props = defineProps<{
  config: ModalConfig;
  shouldClose?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const isVisible = ref(true);
const closeModal = (): void => {
  isVisible.value = false;
  setTimeout(() => {
    // Timeout required for leave animation
    emit('close');
  }, 200);
};

const modalStyle = computed((): string => `modal-content ${props.config.size}`);

// Programmatic close needs to be this way for the animation to work
watch(
  () => props.shouldClose,
  () => closeModal()
);
</script>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

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
  z-index: 10;
}
.modal-content {
  top: 100px;
  position: fixed;
  background: $bg-color-dark;
  max-height: $modal-height;
  padding: 1rem;
  border-radius: $border-radius;
  left: calc(100vw / 2 - 80vw / 2);
  width: 80vw;
  max-width: 80vw;
  z-index: 15;

  &.s {
    @media screen and (min-width: 600px) {
      left: calc(100vw / 2 - #{$modal-width-s / 2});
      width: $modal-width-s;
    }
  }

  &.m {
    @media screen and (min-width: 900px) {
      left: calc(100vw / 2 - #{$modal-width-m / 2});
      width: $modal-width-m;
    }
  }
  &.l {
    @media screen and (min-width: calc($modal-width-l + 3 * $nav-bar-width)) {
      left: calc(100vw / 2 - #{$modal-width-l / 2});
      width: $modal-width-l;
    }
  }
  &.xl {
    @media screen and (min-width: 1550px) {
      left: calc(100vw / 2 - #{$modal-width-xl / 2});
      width: $modal-width-xl;
    }
  }

  &.xxl {
    @media screen and (min-width: 1850px) {
      left: calc(100vw / 2 - #{$modal-width-xxl / 2});
      width: $modal-width-xxl;
    }
  }
}

header {
  .close-button {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    font-size: 1.3rem;
    transition: color 0.2s;

    &:hover {
      color: $accent-color;
      cursor: pointer;
    }
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
