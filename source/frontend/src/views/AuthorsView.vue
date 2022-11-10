<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createAuthor"
    />

    <ListControl />

    <div class="authors" v-if="isReady">
      <AuthorCard v-for="author in authors" :data="author" :key="author.name" />
    </div>

    <Teleport to="#modals">
      <AuthorCreateModal
        v-if="isCreateModalVisible"
        @closeModal="closeModal"
        @success="closeModal(true)"
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
import ListControl from '@/components/ListControl.vue';

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

const closeModal = async (isSuccess = false): Promise<void> => {
  isCreateModalVisible.value = false;
  authors.value = (await getAllAuthors()) || [];
};

// Get All Authors
const authors = ref<any>([]);
onMounted(async (): Promise<void> => {
  authors.value = (await getAllAuthors()) || [];
});

const isReady = computed((): boolean => !!authors.value.length);
</script>

<style scoped lang="scss">
@import '../styles/outline.scss';
.authors {
  margin-left: $nav-bar-width;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
}
</style>
