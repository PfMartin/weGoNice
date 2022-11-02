<template lang="html">
  <div class="author-create-modal">
    <ModalComponent :config="config" @close="emit('closeModal')">
      <template v-slot:header>
        <h1>Create Author</h1>
      </template>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import ModalComponent, { ModalConfig } from '@/components/ModalComponent.vue';
import { defineEmits } from 'vue';

const emit = defineEmits<{
  (e: 'closeModal'): void;
}>();

const config: ModalConfig = {
  size: 'l',
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';
</style>
