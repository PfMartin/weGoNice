<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  headline: string;
  iconName: string;
  id: string;
  initialValue: string;
}>();

const emit = defineEmits<{
  (e: 'changed', value: string): void;
}>();

const inputValue = ref(props.initialValue);

const isInactive = ref(true);
const inputClass = computed(() => ({
  ['value-input']: true,
  inactive: isInactive,
}));
</script>

<template>
  <div class="text-input-field">
    <label :for="id" class="description">
      <ion-icon v-if="iconName" :name="iconName" /><span>{{ headline }}</span>
    </label>
    <input
      id="id"
      :class="inputClass"
      v-model="inputValue"
      @blur="emit('changed', inputValue)"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';
.text-input-field {
  display: flex;
  flex-direction: column;
  width: 100%;
  .description {
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.5rem;
  }

  .value-input {
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

    &.inactive {
    }
  }
}
</style>
