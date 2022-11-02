<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createAuthor"
    />

    <Teleport to="#body">
      <AuthorCreateModal v-if="isCreateModalVisible" @closeModal="closeModal" />
    </Teleport>
  </body>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import AuthorCreateModal from '@/components/AuthorCreateModal.vue';
import { ref } from 'vue';

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'add',
  buttonText: 'Add Author',
};

const onSearchInput = (searchValue: string): void => {
  console.log(searchValue);
};

const isCreateModalVisible = ref(false);
const createAuthor = (): void => {
  isCreateModalVisible.value = true;
};

const closeModal = (): void => {
  isCreateModalVisible.value = false;
};
</script>

<style scoped lang="scss"></style>
