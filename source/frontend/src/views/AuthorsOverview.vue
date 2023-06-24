<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { getAllAuthors } from '@/apis/weGoNice/authors';
import AuthorCard from '@/components/AuthorCard.vue';
import DropdownInput from '@/components/DropdownInput.vue';
import { AUTHOR_SORTING_OPTIONS } from '@/utils/constants';
import { sortDirections } from '@/utils/constants';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

// Searching, sorting and filtering
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
  const sortKey: string =
    selectedOption.value.charAt(0).toLowerCase() +
    selectedOption.value.slice(1);

  authors.value = authors.value.sort((a: Authors.Author, b: Authors.Author) => {
    if (a[sortKey] < b[sortKey]) {
      return sortDirection.value === sortDirections.ASC ? -1 : 1;
    }
    return sortDirection.value === sortDirections.ASC ? 1 : -1;
  });
};
const visibleAuthors = ref<Authors.Author[]>([]);

const listHeight = ref(0);
const computeListHeight = () => (listHeight.value = window.innerHeight - 180);

const authors = ref<Authors.Author[]>([]);
// Get All Authors
onMounted(async (): Promise<void> => {
  authors.value = (await getAllAuthors()) || [];
  visibleAuthors.value = authors.value;
  computeListHeight();
  addEventListener('resize', computeListHeight);
});

const isReady = computed((): boolean => !!authors.value.length);
</script>

<template>
  <div class="author-overview">
    <div class="list-control">
      <div class="controls">
        <div class="sorting">
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
        </div>
      </div>
    </div>

    <div
      class="authors"
      v-if="isReady && authors.length"
      :style="`max-height: ${listHeight}px`"
    >
      <template v-for="author in visibleAuthors" :key="author.name">
        <RouterLink
          :to="{
            name: 'AuthorDetail',
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
      justify-content: flex-start;

      .sorting {
        display: flex;
        margin-right: 1rem;
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

      .filter-switches {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
  .authors {
    margin-left: $nav-bar-width;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    overflow: auto;
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
