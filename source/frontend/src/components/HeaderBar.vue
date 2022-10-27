<template lang="html">
  <body>
    <header>
      <h2>{{ props.config.pageTitle }}</h2>
      <SearchBox @on-input="onSearchInput" />
    </header>
    <ButtonComponent
      @click="emit('on-button')"
      :buttonText="props.config.buttonText"
      :iconName="props.config.iconName"
    />
  </body>
</template>

<script setup lang="ts">
import SearchBox from '@/components/SearchBox.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { defineProps, defineEmits } from 'vue';

interface HeaderConfig {
  pageTitle: string;
  iconName: string;
  buttonText: string;
}

const props = defineProps<{
  config: HeaderConfig;
}>();

const emit = defineEmits<{
  (e: 'on-button'): void;
}>();

const onSearchInput = (inputValue: string) => {
  console.log(inputValue);
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

body {
  margin-left: $nav-bar-width;
  padding: 0.3rem 0.3rem 0.3rem 1rem;
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
    }
  }
}
</style>
