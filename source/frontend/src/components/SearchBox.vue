<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const hasFocus = ref(false);
const toggleSearchBoxFocus = (): void => {
  hasFocus.value = !hasFocus.value;
};
const searchInputElement = ref<HTMLInputElement | null>(null);
const focusSearchInput = (): void => {
  searchInputElement.value && searchInputElement.value.focus();
};

const searchInput = ref(store.getters['search/searchInput']);
watch(searchInput, () => {
  store.dispatch('search/setSearchInput', searchInput.value);
});

const storedInput = computed(() => store.getters['search/searchInput']);
watch(storedInput, () => {
  if (storedInput.value === '') {
    searchInput.value = '';
  }
});

const searchBoxStyle = computed(() => ({
  'search-box': true,
  'has-focus': hasFocus.value,
}));
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
