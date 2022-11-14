<template>
  <body>
    <HeaderBar
      :config="headerConfig"
      @search-input="onSearchInput"
      @button-click="createAuthor"
    />

    <div class="list-control">
      <div class="controls">
        <div class="dropdown-container">
          <DropdownInput
            :options="AUTHOR_SORTING_OPTIONS"
            :selectedOption="selectedOption"
            @select-option="setSelectedOption"
          />
        </div>
        <span @click="toggleSortDirection" class="sort-direction"
          ><ion-icon :name="sortDirectionIcon"
        /></span>
        <div class="filter-switches">
          <SwitchComponent @toggle-switch="applyFilter" />
        </div>
        <!-- <p>Name Ascending Descending</p>
          <p>Amount Recipes Ascending Descending</p>
          <p>Toggle show authors with 0 Recipes</p>
          <p>Creation Date Ascending Descending</p>
          <p>Modification Date Ascending Descending</p>
          <p>Toggle for youtube, instagram, website</p> -->
      </div>
    </div>

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
import DropdownInput from '@/components/DropdownInput.vue';
import { AUTHOR_SORTING_OPTIONS } from '@/utils/constants';
import SwitchComponent from '@/components/SwitchComponent.vue';

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'add',
  buttonText: 'New Author',
};

enum sortDirections {
  ASC,
  DESC,
}

// Searching, sorting and filtering
const onSearchInput = (searchValue: string): void => {
  console.log(searchValue);
};
const selectedOption = ref('Name');
const setSelectedOption = (option: string): void => {
  selectedOption.value = option;
  sortAuthors();
};
const sortDirection = ref(sortDirections.ASC);
const toggleSortDirection = (): void => {
  sortDirection.value =
    sortDirection.value === sortDirections.ASC
      ? sortDirections.DESC
      : sortDirections.ASC;
  sortAuthors();
};
const sortDirectionIcon = computed((): string =>
  sortDirection.value === sortDirections.ASC ? 'arrow-down' : 'arrow-up'
);
const sortAuthors = (): void => {
  const sortKey =
    selectedOption.value.charAt(0).toLowerCase() +
    selectedOption.value.slice(1);

  authors.value = authors.value.sort((a: any, b: any) => {
    if (a[sortKey] < b[sortKey]) {
      return sortDirection.value === sortDirections.ASC ? -1 : 1;
    }
    return sortDirection.value === sortDirections.ASC ? 1 : -1;
  });
};
const applyFilter = (filterState: boolean) => {
  console.log(filterState);
};

// Create Modal
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
  console.log(authors.value);
});

const isReady = computed((): boolean => !!authors.value.length);
</script>

<style scoped lang="scss">
@import '../styles/outline.scss';
@import '../styles/colors.scss';

body {
  .list-control {
    margin-left: $nav-bar-width;
    padding: 1rem 2rem;

    h1 {
      padding: 0;
      margin: 0;
    }

    .controls {
      display: flex;
      align-items: center;

      .sort-direction {
        margin-left: 0.2rem;
        font-size: 1.5rem;
        color: $bg-color-mid;
        display: flex;
        align-items: center;

        &:hover {
          cursor: pointer;
          color: $bg-color-dark;
        }
      }
    }
  }
  .authors {
    margin-left: $nav-bar-width;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
}
</style>
