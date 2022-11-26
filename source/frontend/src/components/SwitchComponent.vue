<template lang="html">
  <div class="switch-component">
    <label :for="label">{{ label }}</label>
    <div @click="toggleSwitch" class="wrapper">
      <input :id="label" type="checkbox" :class="switchStyle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  label: string;
}>();

const emit = defineEmits<{
  (e: 'toggle-switch', switchId: string, toggleState: boolean): void;
}>();

const isSwitchOn = ref(true);
const toggleSwitch = (): void => {
  isSwitchOn.value = !isSwitchOn.value;
  emit('toggle-switch', switchId.value, isSwitchOn.value);
};

const switchStyle = computed(
  (): Record<string, boolean> => ({
    ['switch']: true,
    ['on']: !isSwitchOn.value,
  })
);

const switchId = computed(
  (): string => props.label.charAt(0).toLowerCase() + props.label.slice(1)
);
</script>

<style scoped lang="scss">
@import '../styles/outline.scss';
@import '../styles/colors.scss';

.switch-component {
  display: flex;
  align-items: center;
  gap: 0.2rem;
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
      margin: 0;
      padding: 0;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 19px;
      height: 19px;
      left: 22px;
      background: $bg-color-light;
      transition: all 0.2s;
      border-radius: 100%;
      cursor: pointer;

      &.on {
        background: $text-color;
        left: 3px;
      }
    }
  }
}
</style>
