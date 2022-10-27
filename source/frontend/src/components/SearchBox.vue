<template>
  <div class="search-box">
    <ion-icon name="search-outline" class="icon" />
    <input type="text" v-model="inputValue" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue';

const emit = defineEmits<{
  (e: 'on-input', value: string): void;
}>();

const inputValue = ref('');
watch(inputValue, (newValue) => {
  emit('on-input', newValue);
});
</script>

<style lang="scss">
@import '../styles/colors.scss';

.search-box {
  border-radius: 3px;
  background: $main-bg-color;
  padding: 0.3rem 0.3rem 0.3rem 0.5rem;
  display: flex;
  align-items: center;
  color: $bg-color-dark;

  .icon {
    width: 20px;
    height: 20px;
  }

  input {
    color: inherit;
    margin-left: 5px;
    border: none;
    background: $main-bg-color;
    font-size: 0.9rem;

    &:focus {
      outline: none;
    }
  }
}
</style>
