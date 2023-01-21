<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  headline: string;
  iconName: string;
  id: string;
  initialValue: string;
  placeholder: string;
  inputError?: string;
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
}));

const labelClass = computed(() => ({
  label: true,
}));
</script>

<template>
  <div class="text-input-field">
    <label :for="props.id" :class="labelClass">
      <div class="label-text">
        <ion-icon v-if="props.iconName" :name="props.iconName" />&nbsp;
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
    <Transition name="fade" mode="out-in">
      <small v-if="props.inputError">{{ props.inputError }}</small>
      <small v-else></small>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';
.text-input-field {
  display: flex;
  flex-direction: column;
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
    background: $bg-color-dark;
    border: 1px solid $bg-color-dark;
    padding: 8px 8px;
    border-radius: $border-radius;
    transition: background, border 0.2s;

    &.hasError {
      border: 1px solid $accent-color;
    }

    &::placeholder {
      font-size: 1rem;
      font-weight: normal;
    }

    &:hover {
      cursor: pointer;
      background: $bg-color-mid;
      border: 1px solid $accent-color;
    }

    &:focus {
      border: 1px solid $accent-color;
      outline: none;
      background: $bg-color-mid;
    }
  }
}
</style>
