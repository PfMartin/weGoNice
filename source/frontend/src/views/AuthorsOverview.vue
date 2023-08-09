<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getAllAuthors } from '@/apis/weGoNice/authors';
import AuthorCard from '@/components/AuthorCard.vue';
import { AUTHOR_SORTING_OPTIONS, SortDirections } from '@/utils/constants';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import OverviewControl from '@/components/OverviewControl.vue';
import { useStore } from 'vuex';

const store = useStore();

// Searching, sorting and filtering
const selectedSortingKey = ref('Name');
const setSortingKey = (option: string): void => {
  selectedSortingKey.value = option;
  sortAuthors();
};
const sortDirection = ref(SortDirections.ASC);
const toggleSortDirection = (): void => {
  sortDirection.value =
    sortDirection.value === SortDirections.ASC
      ? SortDirections.DESC
      : SortDirections.ASC;
  sortAuthors();
};

const sortAuthors = (): void => {
  const sortKey: string =
    selectedSortingKey.value.charAt(0).toLowerCase() +
    selectedSortingKey.value.slice(1);

  authors.value = authors.value.sort((a: Authors.Author, b: Authors.Author) => {
    if (a[sortKey] < b[sortKey]) {
      return sortDirection.value === SortDirections.ASC ? -1 : 1;
    }
    return sortDirection.value === SortDirections.ASC ? 1 : -1;
  });
};
const visibleAuthors = computed(() => {
  const searchInput = store.getters['search/searchInput'].toLowerCase();

  return authors.value.filter((a) => {
    const name = a.name.toLowerCase();
    const authorFirstName = a.firstName.toLowerCase();
    const authorLastName = a.lastName.toLowerCase();

    return (
      name.includes(searchInput) ||
      authorFirstName?.includes(searchInput) ||
      authorLastName?.includes(searchInput)
    );
  });
});

const listHeight = ref(0);
const computeListHeight = () => (listHeight.value = window.innerHeight - 180);

const isLoading = ref(true);
const authors = ref<Authors.Author[]>([]);
// Get All Authors
onMounted(async (): Promise<void> => {
  isLoading.value = true;
  authors.value = (await getAllAuthors()) || [];
  computeListHeight();
  addEventListener('resize', computeListHeight);
  isLoading.value = false;
});
</script>

<template>
  <div class="author-overview">
    <OverviewControl
      :sortingKeys="AUTHOR_SORTING_OPTIONS"
      :selectedSortingKey="selectedSortingKey"
      :sortingDirection="sortDirection"
      @set-sorting-key="setSortingKey"
      @toggle-sorting-direction="toggleSortDirection"
    />

    <div
      class="authors"
      v-if="!isLoading"
      :style="`max-height: ${listHeight}px`"
    >
      <template v-for="author in visibleAuthors" :key="author.name">
        <RouterLink
          :to="{
            name: 'AuthorsDetail',
            params: {
              id: author.id,
            },
          }"
        >
          <AuthorCard :data="author" />
        </RouterLink>
      </template>
    </div>
    <div class="spinner-container" v-else>
      <SpinnerComponent size="large" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.author-overview {
  margin-left: $nav-bar-width;
  padding: 1rem 1rem;
  .authors {
    margin: 2rem 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-right: 5px;
  }

  .spinner-container {
    margin-top: 5rem;
    display: flex;
    justify-content: center;
  }
}

::-webkit-scrollbar {
  width: 10px;
  border-radius: $border-radius;
  padding: 3px;
}

::-webkit-scrollbar-track {
  background: #555;
  border-radius: $border-radius;
  padding: 5px;
  margin: 5px;
}

::-webkit-scrollbar-thumb {
  border: 2px solid #555;
  background: $bg-color-mid;
  border-radius: $border-radius;
}
</style>
