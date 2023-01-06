<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  buttonText: string;
  buttonIconName?: string;
  isDefault?: boolean;
}>();

const emit = defineEmits<{
  (e: 'on-click'): void;
}>();

const onClick = () => {
  emit('on-click');
};

const buttonClass = computed(() => {
  return {
    button: true,
    default: props.isDefault || false,
  };
});
</script>

<template>
  <div @click="onClick" :class="buttonClass">
    <ion-icon :name="buttonIconName" />
    <p>{{ buttonText }}</p>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.button {
  border-radius: 5px;
  background: $accent-color;
  padding: 6px 12px;
  color: $bg-color-dark;
  display: flex;
  align-items: center;
  transition: background-color 0.5s;

  &.default {
    background: $bg-color-lighter;

    &:hover {
      background: $bg-color-light;
    }
  }

  &:hover {
    background-color: $accent-hover-color;
    cursor: pointer;
  }

  p {
    font-size: 0.9rem;
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
