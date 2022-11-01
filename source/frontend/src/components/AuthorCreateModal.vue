<template lang="html">
  <div class="author-create-modal">
    <ModalComponent :config="config">
      <template v-slot:header>
        <h1>Create Author</h1>
      </template>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import ModalComponent, { ModalConfig } from '@/components/ModalComponent.vue';
const config: ModalConfig = {
  size: 'l',
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';
</style>
