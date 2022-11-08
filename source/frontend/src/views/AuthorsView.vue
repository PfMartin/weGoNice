<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createAuthor"
    />
    <Teleport to="#body">
      <AuthorCreateModal
        v-if="isCreateModalVisible"
        @closeModal="closeModal"
        @success="closeModal"
      />
    </Teleport>
    <button @click="add">Add Notification</button>
  </body>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import AuthorCreateModal from '@/components/AuthorCreateModal.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'add',
  buttonText: 'New Author',
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

const add = (): void => {
  store.dispatch('notifications/pushNotification', {
    headline: 'Success',
    body: 'That worked',
  });
};
</script>

<style scoped lang="scss"></style>
