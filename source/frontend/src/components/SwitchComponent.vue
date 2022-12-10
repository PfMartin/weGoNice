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

const wrapperStyle = computed(
  (): Record<string, boolean> => ({
    wrapper: true,
    on: !isSwitchOn.value,
  })
);

const switchId = computed(
  (): string => props.label.charAt(0).toLowerCase() + props.label.slice(1)
);
</script>

<template lang="html">
  <div class="switch-component">
    <label :for="label">{{ label }}</label>
    <div @click="toggleSwitch" :class="wrapperStyle">
      <input :id="label" type="checkbox" class="switch" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.switch-component {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  .wrapper {
    position: relative;
    background: $bg-color-dark;
    width: 35px;
    height: 20px;
    border-radius: 100px;
    display: flex;
    align-items: center;

    &.on {
      background-color: $accent-color;

      .switch {
        left: 2px;
      }
    }

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
      width: 16px;
      height: 16px;
      left: 17px;
      background: $text-color;
      transition: all 0.2s;
      border-radius: 100%;
      cursor: pointer;
    }
  }
}
</style>
