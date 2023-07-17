<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  title: string;
  formError?: string;
  isDragActive: boolean;
}>();

const emit = defineEmits<{
  (e: 'on-drop', event: DragEvent): void;
  (e: 'insert'): void;
}>();

const hoveredDropZone = ref<number | null>(null);
const getHoveredClass = (idx: number): string =>
  hoveredDropZone.value === idx ? 'drop-zone-active' : '';

const onDragEnter = (e: any): void => {
  e.preventDefault();

  const dropZoneId = e.toElement.id.split('zone').reverse()[0];
  hoveredDropZone.value = Number(dropZoneId);
};

const onDragLeave = (): void => {
  hoveredDropZone.value = null;
};
</script>

<template>
  <div class="ranking-list">
    <div class="header">
      <h2>{{ title }}</h2>
      <p v-if="formError"><ion-icon name="alert-circle" />{{ formError }}</p>
    </div>

    <div class="elements-container">
      <slot name="elements"></slot>
    </div>

    <div class="end-container">
      <Transition name="fade" mode="out-in">
        <div
          v-if="isDragActive"
          class="drop-zone"
          :class="getHoveredClass(-1)"
          @drop="(e) => emit('on-drop', e)"
          @dragover.prevent
          @dragenter="onDragEnter"
          @dragleave="onDragLeave"
          id="drop-zone-1"
        ></div>

        <div v-else class="add-divider" @click="emit('insert')">
          <div class="divider"></div>
          <ion-icon name="add"></ion-icon>
          <div class="divider"></div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.ranking-list {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: $border-radius;
  background-color: $bg-color-dark;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0 0 0.5rem 0;
      padding: 0;
    }

    p {
      padding: 0;
      margin: 0;
      display: flex;
      gap: 0.5rem;
      color: $error-color;
    }
  }

  .elements-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .drop-zone {
    width: 100%;
    height: 1.5rem;
    background-color: $bg-color-mid;
    margin-bottom: 0.5rem;
    transition: background-color 0.2s;

    &.drop-zone-active {
      transition: background-color 0.2s;
      background-color: $accent-color;
    }
  }

  .add-divider {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .divider {
      height: 1px;
      width: 10rem;
      background-color: $bg-color-mid;
      transition: background-color 0.2s;
    }

    ion-icon {
      padding: 1px;
      color: $bg-color-dark;
      font-size: 1.2rem;
      background-color: $bg-color-mid;
      border-radius: $border-radius;
      margin: 0 0.5rem;
      transition: color 0.2s;
    }

    &:hover {
      cursor: pointer;

      .divider {
        background-color: $accent-color;
      }

      ion-icon {
        color: $accent-color;
      }
    }
  }

  .end-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.5rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
