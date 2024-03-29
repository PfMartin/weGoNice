<script setup lang="ts">
import { ref, computed, watch } from 'vue';

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
  type: 'text' | 'number' | 'textarea';
}>();

const emit = defineEmits<{
  (e: 'changed', value: string): void;
}>();

watch(
  () => props.initialValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const inputValue = ref(props.initialValue);

const isInactive = ref(true);
const inputClass = computed(() => ({
  ['value-input']: true,
  inactive: isInactive,
  hasError: props.inputError,
  dark: props.isDark,
}));

const emitInput = () => {
  emit('changed', inputValue.value);
};

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
      v-if="type === 'text' || type === 'number'"
      :type="type"
      :id="props.id"
      :placeholder="props.placeholder"
      :class="inputClass"
      v-model="inputValue"
      @blur="emitInput"
    />
    <textarea
      v-else-if="type === 'textarea'"
      :id="props.id"
      :placeholder="props.placeholder"
      :class="inputClass"
      v-model="inputValue"
      @blur="emitInput"
    ></textarea>
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
    color: $error-color;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: opacity 0.2s ease;
    }

    &.fade-enter-from,
    &.fade-leave-to {
      opacity: 0;
    }
  }

  textarea {
    resize: vertical;
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
    font-family: Monserrat, sans-serif;

    &.hasError {
      border: 1px solid $error-color;
    }

    &::placeholder {
      font-size: 1rem;
      font-weight: normal;
      font-family: Monserrat, sans-serif;
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

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
