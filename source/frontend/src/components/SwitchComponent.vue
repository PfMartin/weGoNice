<template lang="html">
  <div @click="toggleSwitch" class="wrapper">
    <div :class="switchStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref, computed } from 'vue';

const emit = defineEmits<{
  (e: 'toggle-switch', toggleState: boolean): void;
}>();

const isSwitchOn = ref(true);
const toggleSwitch = (): void => {
  isSwitchOn.value = !isSwitchOn.value;
  emit('toggle-switch', isSwitchOn.value);
};

const switchStyle = computed(
  (): Record<string, boolean> => ({
    ['switch']: true,
    ['off']: !isSwitchOn.value,
  })
);
</script>

<style scoped lang="scss">
@import '../styles/outline.scss';
@import '../styles/colors.scss';

.wrapper {
  position: relative;
  background: $bg-color-dark;
  width: 45px;
  height: 25px;
  border-radius: 100px;
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }

  .switch {
    position: absolute;
    width: 20px;
    height: 20px;
    background: $text-color;
    left: 2px;
    transition: all 0.2s;
    border-radius: 100%;

    &.off {
      left: 23px;
    }
  }
}
</style>
