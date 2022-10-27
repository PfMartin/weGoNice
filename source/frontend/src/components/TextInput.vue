<template>
  <div :class="inputClass">
    <label :for="label"
      ><div>{{ label }}</div>
      <Transition name="fade">
        <small v-if="inputError">{{ inputError }}</small>
      </Transition>
    </label>
    <input
      @focus="toggleActive"
      @blur="toggleActive"
      :id="label"
      :type="isPassword ? 'password' : 'text'"
      v-model="inputValue"
    />
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref, computed, watch } from 'vue';

const props = defineProps<{
  label: string;
  isPassword?: boolean;
  inputError?: string;
  initialValue: string;
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
    border-bottom: 1px solid #fff;
    outline: none;
    background: $card-color;
    margin: 0.5rem 0;
    padding: 0.5rem;
    transition: border 0.3s;
    color: #fff;

    &:focus {
      border-bottom: 1px solid $accent-color;
    }
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
