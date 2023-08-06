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

const mode = OperationMode.Edit;

const route = useRoute();
const router = useRouter();

const author = ref<Authors.Author | null>(null);

const init = async () => {
  const res = await getAuthorById(route.params.id);
  author.value = res;
};

// const recipeData: Recipes.Recipe[] = [
//   {
//     title: 'First Recipe',
//   },
//   { title: 'Second Recipe' },
// ];

init();

const deleteAuthor = async () => {
  /**
   TODO: Check if author has recipes
   - return before deleting Author
   - show notifiation
  */
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
    <!-- <RecipesList
      v-if="author"
      :author="author?.name || 'unknown'"
      :data="recipeData"
    />
    <div v-else>spinner</div> -->
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
