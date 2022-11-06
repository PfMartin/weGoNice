<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createAuthor"
    />
    <button @click="push">PUSH NEW</button>
    <button @click="remove">REMOVE</button>

    <Teleport to="#body">
      <AuthorCreateModal
        v-if="isCreateModalVisible"
        @closeModal="closeModal"
        @success="closeModal"
      />
    </Teleport>
  </body>
</template>

<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import AuthorCreateModal from '@/components/AuthorCreateModal.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

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

const store = useStore();
const push = () => {
  store.dispatch('notifications/pushNotification', {
    headline: 'Success',
    body: "Successfully added author 'Nico Rittenau'",
  });
  console.log(store.getters['notifications/notifications']);
};

const remove = () => {
  store.dispatch('notifications/popNotification');
  console.log(store.getters['notifications/notifications']);
};
</script>

<style scoped lang="scss"></style>
