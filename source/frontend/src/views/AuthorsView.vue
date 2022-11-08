<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createAuthor"
    />

    <div class="authors" v-if="isReady">
      <AuthorCard :data="authors[10]" />
    </div>

    <Teleport to="#modals">
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
import { onMounted, ref, computed } from 'vue';
import { getAllAuthors } from '@/apis/weGoNice/authors';
import AuthorCard from '@/components/AuthorCard.vue';

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

// Get All Authors
const authors = ref<any>([]);
onMounted(async () => {
  authors.value = await getAllAuthors();
});

const isReady = computed(() => authors.value.length);
</script>

<style scoped lang="scss"></style>
