<script setup lang="ts">
import HeaderBar from '@/components/HeaderBar.vue';
import { onMounted, ref, computed } from 'vue';
import { getAllAuthors } from '@/apis/weGoNice/authors';
import { useRouter } from 'vue-router';

const router = useRouter();

const headerConfig = {
  pageTitle: 'Authors',
  buttonIconName: 'add',
  buttonText: 'New Author',
};

// Searching, sorting and filtering
const onSearchInput = (searchValue: string): void => {
  console.log(searchValue);
};
const createAuthor = (): void => {
  router.push({ name: 'AuthorsCreate' });
};
</script>

<template>
  <div class="authors-overview">
    <body>
      <HeaderBar
        :config="headerConfig"
        @search-input="onSearchInput"
        @button-click="createAuthor"
      />

      <RouterView />
    </body>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

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
  }
}
</style>
