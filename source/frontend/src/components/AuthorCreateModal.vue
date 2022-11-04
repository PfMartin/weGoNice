<template lang="html">
  <div class="author-create-modal">
    <ModalComponent :config="config" @close="emit('closeModal')">
      <template v-slot:header>
        <h2>Add Author</h2>
      </template>

      <template v-slot:default> bla bla </template>

      <template v-slot:footer>
        <div class="save-button">
          <ButtonComponent buttonText="Add Author" buttonIconName="add" />
        </div>
      </template>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import ModalComponent, { ModalConfig } from '@/components/ModalComponent.vue';
import { defineEmits } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const emit = defineEmits<{
  (e: 'closeModal'): void;
}>();

const config: ModalConfig = {
  size: 's',
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.save-button {
  display: flex;
  justify-content: flex-end;
}
</style>
