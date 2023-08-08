<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
  (e: 'search-input', searchValue: string): void;
}>();

const searchBoxStyle = ref({
  ['search-box']: true,
  ['has-focus']: false,
});
const toggleSearchBoxFocus = (): void => {
  searchBoxStyle.value['has-focus'] = !searchBoxStyle.value['has-focus'];
};
const searchInputElement = ref<HTMLInputElement | null>(null);
const focusSearchInput = (): void => {
  searchInputElement.value && searchInputElement.value.focus();
};

// Search box
const searchInput = ref('');
watch(searchInput, (newValue) => {
  emit('search-input', newValue);
});
</script>

<template>
  <div :class="searchBoxStyle" @click="focusSearchInput">
    <ion-icon name="search-outline" class="icon" />
    <input
      type="text"
      v-model="searchInput"
      ref="searchInputElement"
      @focus="toggleSearchBoxFocus"
      @blur="toggleSearchBoxFocus"
    />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.search-box {
  border-radius: $border-radius;
  background: $bg-color-light;
  padding-left: 0.5rem;
  display: flex;
  align-items: center;
  color: $bg-color-dark;
  min-width: 400px;
  transition: background-color 0.3s;
  border: 1px solid $bg-color-mid;

  &.has-focus {
    background: #ddd;
    border: 1px solid $accent-color;
  }

  .icon {
    width: 20px;
    height: 20px;
  }

  input {
    color: inherit;
    padding: 0.4rem 0.3rem 0.4rem 0.3rem;
    margin-left: 5px;
    border: none;
    background: none;
    font-size: 0.9rem;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
