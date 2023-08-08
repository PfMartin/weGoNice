<script setup lang="ts">
import ButtonComponent from '@/components/ButtonComponent.vue';
import { ButtonType } from '@/utils/constants';
import { ref, watch } from 'vue';
import SearchBox from './SearchBox.vue';

interface HeaderConfig {
  pageTitle: string;
  buttonIconName: string;
  buttonText: string;
}

const emit = defineEmits<{
  (e: 'button-click'): void;
}>();

const props = defineProps<{
  config: HeaderConfig;
}>();
</script>

<template lang="html">
  <body>
    <header>
      <h2>{{ props.config.pageTitle }}</h2>
      <SearchBox />
    </header>
    <ButtonComponent
      @click="emit('button-click')"
      :buttonText="props.config.buttonText"
      :buttonIconName="props.config.buttonIconName"
      :buttonType="ButtonType.Primary"
    />
  </body>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

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
  z-index: 15;

  header {
    display: flex;
    align-items: center;

    h2 {
      margin: 0;
      padding: 0;
      margin-right: 3rem;
      width: 120px;
    }
  }
}
</style>
