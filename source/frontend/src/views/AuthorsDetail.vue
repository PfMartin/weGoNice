<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getAuthorById, deleteAuthorById } from '@/apis/weGoNice/authors';
import { ref } from 'vue';
import RecipesList from '@/components/RecipesList.vue';
import AuthorInfo from '@/components/AuthorInfo.vue';
import { OperationMode } from '@/utils/constants';
import ButtonComponent from '@/components/ButtonComponent.vue';
import notificationService from '@/services/notification.service';

const mode = OperationMode.Edit;

const route = useRoute();
const router = useRouter();

const author = ref<Authors.Author | null>(null);

const init = async () => {
  const res = await getAuthorById(route.params.id);
  author.value = res;
};

const recipeData: Recipes.Recipe[] = [
  {
    title: 'First Recipe',
  },
  { title: 'Second Recipe' },
];

init();

const deleteAuthor = async () => {
  const res = await deleteAuthorById(route.params.id);

  if (res.status !== 200) {
    notificationService.addNotification(
      'error',
      'Something went wrong while deleting the author'
    );
    return;
  }

  notificationService.addNotification(
    'success',
    `Successfully deleted ${author.value?.name}`
  );
  router.push({ name: 'AuthorsOverview' });
};
</script>

<template>
  <div class="author-detail">
    <ButtonComponent buttonText="Delete Author" @on-click="deleteAuthor" />
    <AuthorInfo v-if="author" :mode="mode" :initialData="author" />
    <div v-else>spinner</div>
    <RecipesList
      v-if="author"
      :author="author?.name || 'unknown'"
      :data="recipeData"
    />
    <div v-else>spinner</div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.author-detail {
  margin: 1rem;
  margin-left: calc($nav-bar-width + 1rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
