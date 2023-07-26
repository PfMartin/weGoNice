<script setup lang="ts">
import { OperationMode } from '@/utils/constants';
import { useRoute } from 'vue-router';
import { getRecipeById, deleteRecipeById } from '@/apis/weGoNice/recipes';
import notificationService from '@/services/notification.service';
import { ref } from 'vue';
import RecipeInfo from '@/components/RecipeInfo.vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

const mode = OperationMode.Edit;
const route = useRoute();

const recipe = ref<Recipes.Recipe | null>(null);
const init = async () => {
  const res = await getRecipeById(route.params.id);
  recipe.value = res;
};

const hasIngredientsError = ref(false);
const hasStepsError = ref(false);

const setData = (data: Recipes.Recipe) => {
  console.log(data);
};

const deleteRecipe = async () => {
  const res = await deleteRecipeById(route.params.id);

  if (res.status !== 200) {
    notificationService.addNotification(
      'error',
      'Something wen wrong while deleting the author'
    );
    return;
  }

  notificationService.addNotification(
    'success',
    `Successfully deleted ${recipe.value?.name}`
  );
};

init();
</script>

<template>
  <div class="recipes-detail">
    <div class="container">
      <RecipeInfo
        v-if="recipe"
        :mode="mode"
        @on-change="setData"
        :hasIngredientsError="hasIngredientsError"
        :hasStepsError="hasStepsError"
        :initialData="recipe"
      />
      <SpinnerComponent v-else />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
.recipes-detail {
  margin: 1rem 1rem 1rem calc($nav-bar-width + 1rem);
  display: flex;
  justify-content: center;
}
</style>
