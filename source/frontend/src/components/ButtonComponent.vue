<script setup lang="ts">
import { computed } from 'vue';
import { ButtonType } from '@/utils/constants';

const props = defineProps<{
  buttonText: string;
  buttonIconName?: string;
  buttonType?: ButtonType;
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
    primary: props.buttonType === ButtonType.Primary,
    delete: props.buttonType === ButtonType.Delete,
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
  border-radius: $border-radius;
  background: $bg-color-dark;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  box-shadow: $shadow;
  color: $bg-color-lighter;

  &.primary {
    background: $accent-color;
    color: $bg-color-dark;

    &:hover {
      background: $accent-hover-color;
    }
  }

  &.delete {
    background: $error-color;
    color: $text-color;

    &:hover {
      background: $error-hover-color;
    }
  }

  &:hover {
    background: $bg-color-mid;
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
