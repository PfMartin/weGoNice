<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  headline?: string;
  iconName?: string;
  id: string;
  initialValue: string;
  placeholder: string;
  inputError?: string;
  width?: string;
  isDark?: boolean;
  withErrorHandling?: boolean;
}>();

const emit = defineEmits<{
  (e: 'changed', value: string): void;
}>();

const inputValue = ref(props.initialValue);

const isInactive = ref(true);
const inputClass = computed(() => ({
  ['value-input']: true,
  inactive: isInactive,
  hasError: props.inputError,
  dark: props.isDark,
}));

const labelClass = computed(() => ({
  label: true,
}));

const widthStyle = computed(() => `width: ${props.width}`);
</script>

<template>
  <div class="text-input-field" :style="widthStyle">
    <label v-if="headline" :for="props.id" :class="labelClass">
      <div class="label-text">
        <ion-icon v-if="iconName" :name="props.iconName" />&nbsp;
        <span>{{ props.headline }}</span>
      </div>
    </label>
    <input
      :id="props.id"
      :placeholder="props.placeholder"
      :class="inputClass"
      v-model="inputValue"
      @blur="emit('changed', inputValue)"
    />
    <template v-if="withErrorHandling">
      <Transition name="fade" mode="out-in">
        <small v-if="props.inputError">{{ props.inputError }}</small>
        <small v-else></small>
      </Transition>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';
.text-input-field {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 100%;

  label {
    margin: 0;
    padding: 0;
    gap: 0.5rem;
    align-items: center;
    justify-content: space-between;

    .label-text {
      display: flex;
      align-items: center;
    }
  }
  small {
    display: block;
    min-height: 1rem;
    color: $accent-color;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.2s ease;
    }

    &.fade-enter-from,
    &.fade-leave-to {
      opacity: 0;
    }
  }

  .value-input {
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: $text-color;
    background: $bg-color-mid;
    border: 1px solid $bg-color-mid;
    padding: 8px 8px;
    border-radius: $border-radius;
    transition:
      background,
      border 0.2s;

    &.hasError {
      border: 1px solid $accent-color;
    }

    &::placeholder {
      font-size: 1rem;
      font-weight: normal;
    }

    &.dark {
      background: $bg-color-dark;
      border-color: $bg-color-dark;

      &:hover {
        background: $bg-color-mid;
      }

      &:focus {
        background: $bg-color-mid;
      }
    }

    &:hover {
      cursor: text;
      background: $bg-color-dark;
      border: 1px solid $accent-color;
    }

    &:focus {
      border: 1px solid $accent-color;
      outline: none;
      background: $bg-color-dark;
    }
  }
}
</style>
