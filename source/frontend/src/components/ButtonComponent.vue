<template>
  <div @click="onClick" class="button">
    <ion-icon :name="iconName" />
    <p>{{ buttonText }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  buttonText: string;
  iconName?: string;
}>();

const emit = defineEmits<{
  (e: 'on-click'): void;
}>();

const onClick = () => {
  emit('on-click');
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.button {
  border-radius: 10px;
  background: $accent-color;
  padding: 0.5rem 1.5rem;
  color: $bg-color-dark;
  display: flex;
  align-items: center;
  transition: background-color 0.5s;

  &:hover {
    background-color: $accent-hover-color;
    cursor: pointer;
  }

  p {
    padding: 0;
    margin: 0;
  }

  ion-icon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
}
</style>
