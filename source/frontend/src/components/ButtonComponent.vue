<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  buttonText: string;
  buttonIconName?: string;
  isPrimary?: boolean;
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
    primary: props.isPrimary || false,
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
  background: $bg-color-lighter;
  padding: 6px 12px;
  color: $bg-color-dark;
  display: flex;
  align-items: center;
  transition: background-color 0.5s;

  &.primary {
    background: $accent-color;

    &:hover {
      background: $accent-hover-color;
    }
  }

  &:hover {
    background: $bg-color-light;
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
