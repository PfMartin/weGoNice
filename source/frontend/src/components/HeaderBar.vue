<template lang="html">
  <body>
    <header>
      <h2>{{ props.config.pageTitle }}</h2>
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
    </header>
    <ButtonComponent
      @click="emit('button-click')"
      :buttonText="props.config.buttonText"
      :buttonIconName="props.config.buttonIconName"
    />
  </body>
</template>

<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';
import { defineProps, defineEmits, ref, watch } from 'vue';

interface HeaderConfig {
  pageTitle: string;
  buttonIconName: string;
  buttonText: string;
}

const emit = defineEmits<{
  (e: 'button-click'): void;
  (e: 'search-input', searchValue: string): void;
}>();

const props = defineProps<{
  config: HeaderConfig;
}>();

// Search box
const searchInput = ref('');
watch(searchInput, (newValue) => {
  emit('search-input', newValue);
});

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
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

body {
  position: sticky;
  top: 0;
  left: 0;
  margin-left: $nav-bar-width;
  padding: 0.6rem 1rem 0.6rem 1rem;
  background: $bg-color-mid;
  color: $text-color;
  display: flex;
  align-items: center;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;

    h2 {
      margin: 0;
      padding: 0;
      margin-right: 3rem;
      width: 120px;
    }

    .search-box {
      border-radius: 3px;
      background: $bg-color-light;
      padding-left: 0.5rem;
      display: flex;
      align-items: center;
      color: $bg-color-dark;
      width: 500px;
      transition: background 0.3s;

      &.has-focus {
        background: #ddd;
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
  }
}
</style>
