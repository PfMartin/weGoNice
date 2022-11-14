<template lang="html">
  <div @click="toggleSwitch" class="wrapper">
    <div :class="switchStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const isSwitchOn = ref(true);
const toggleSwitch = (): void => {
  isSwitchOn.value = !isSwitchOn.value;
  console.log(isSwitchOn.value);
};

const switchStyle = computed(
  (): Record<string, boolean> => ({
    ['switch']: true,
    ['off']: !isSwitchOn.value,
    ['on']: isSwitchOn.value,
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

  .switch {
    position: absolute;
    width: 20px;
    height: 20px;
    background: $text-color;
    border-radius: 100%;
    transition: all 0.5s;

    &.on {
      left: 2px;
    }
    &.off {
      right: 2px;
    }
  }
}
</style>
