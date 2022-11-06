<template>
  <div :class="inputClass">
    <label :for="label.name"
      ><div class="label-text">
        <ion-icon v-if="label.iconName" :name="label.iconName" /> &nbsp;
        <span>{{ label.name }}</span>
      </div>
      <Transition name="fade">
        <small v-if="inputError">{{ inputError }}</small>
      </Transition>
    </label>

    <textarea
      rows="3"
      expandY
      v-if="isTextarea"
      @focus="toggleActive"
      @blur="toggleActive"
      :id="label.name"
      v-model="inputValue"
    >
    </textarea>
    <input
      v-else
      @focus="toggleActive"
      @blur="toggleActive"
      :id="label.name"
      :type="isPassword ? 'password' : 'text'"
      v-model="inputValue"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, computed, watch } from 'vue';

const props = defineProps<{
  label: Record<string, string>;
  isPassword?: boolean;
  inputError?: string;
  initialValue: string;
  isTextarea?: boolean;
}>();

const emit = defineEmits<{
  (e: 'on-input', value: string): void;
  (e: 'on-blur'): void;
}>();

const inputValue = ref<string>(props.initialValue);
watch(inputValue, (currentValue) => {
  emit('on-input', currentValue);
});

watch(
  () => props.initialValue,
  (currentValue) => {
    inputValue.value = currentValue;
  }
);

// Styling
const isActive = ref<boolean>(false);
const toggleActive = () => {
  isActive.value = !isActive.value;
};
const inputClass = computed(() => ({
  input: true,
  active: isActive.value,
}));
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.input {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  transition: 0.3s all;

  &.active {
    color: $accent-color;
  }

  input {
    box-shadow: none;
    border: none;
    border-bottom: 1px solid $text-color;
    outline: none;
    background: $bg-color-mid;
    margin: 0.5rem 0;
    padding: 0.5rem;
    transition: border 0.3s;
    color: $text-color;
    font-size: 0.9rem;

    &:focus {
      border-bottom: 1px solid $accent-color;
    }
  }

  textarea {
    box-shadow: none;
    border: 1px solid $bg-color-mid;
    outline: none;
    margin-top: 1rem;
    border-radius: $border-radius;
    padding: 0.5rem;
    font: inherit;
    font-size: 0.9rem;
    color: $text-color;
    background: $bg-color-dark;
    resize: vertical;

    &:focus {
      border: 1px solid $accent-color;
    }
  }

  .label-text {
    display: flex;
    align-items: center;
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;

    small {
      display: block;
      margin-right: 0.5rem;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s ease-in;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
