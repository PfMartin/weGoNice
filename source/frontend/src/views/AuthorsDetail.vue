<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getAuthorById, deleteAuthorById } from '@/apis/weGoNice/authors';
import { ref } from 'vue';
import RecipesList from '@/components/RecipesList.vue';
import AuthorInfo from '@/components/AuthorInfo.vue';
import { OperationMode } from '@/utils/constants';
import ButtonComponent from '@/components/ButtonComponent.vue';
import notificationService from '@/services/notification.service';
import { ButtonType } from '@/utils/constants';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import { getRecipesByAuthorId } from '@/apis/weGoNice/recipes';

const mode = OperationMode.Edit;

const route = useRoute();
const router = useRouter();

const author = ref<Authors.Author | null>(null);
const recipes = ref<Recipes.Recipe[] | null>(null);

const init = async () => {
  const authorRes = await getAuthorById(route.params.id);
  const recipesRes = await getRecipesByAuthorId(route.params.id);

  author.value = authorRes;
  recipes.value = recipesRes.data;
  console.log(recipesRes);
};

init();

const authorHasRecipes = async (): Promise<boolean> => {
  if (!author.value?.id) {
    return true;
  }
  const res = await getRecipesByAuthorId(author.value.id);
  if (res.status !== 200) {
    notificationService.addNotification(
      'error',
      `Attempt to get recipes associated with this author failed. This author can't be deleted at the moment.`
    );
  }

  return res.data !== null;
};

const deleteAuthor = async (): Promise<void> => {
  if (await authorHasRecipes()) {
    notificationService.addNotification(
      'error',
      'There are recipes associated with this author. Please delete associated recipes before deleting the author.'
    );
    return;
  }

  const res = await deleteAuthorById(route.params.id);

  if (res.status !== 200) {
    notificationService.addNotification(
      'error',
      'Something went wrong while deleting the author'
    );
    return;
  }

  const authorName =
    author.value?.name ||
    `${author.value?.firstName} ${author.value?.lastName}`;

  notificationService.addNotification(
    'success',
    `Successfully deleted author '${authorName}'`
  );
  router.push({ name: 'AuthorsOverview' });
};
</script>

<template>
  <div class="author-detail">
    <AuthorInfo v-if="author" :mode="mode" :initialData="author" />
    <SpinnerComponent v-else />
    <div class="buttons">
      <RouterLink
        :to="{
          name: 'AuthorsOverview',
        }"
      >
        <ButtonComponent
          :buttonType="ButtonType.Default"
          buttonText=""
          buttonIconName="arrow-back-outline"
        />
      </RouterLink>
      <ButtonComponent
        :buttonType="ButtonType.Delete"
        buttonText="Delete"
        buttonIconName="close-circle"
        @on-click="deleteAuthor"
      />
    </div>
    <RecipesList v-if="author" :author="author.name" :data="recipes" />
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.author-detail {
  display: flex;
  flex-direction: column;
  margin: 1rem 1rem 1rem calc($nav-bar-width + 1rem);

  .buttons {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
  }
}
</style>
