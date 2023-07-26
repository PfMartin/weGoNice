<script setup lang="ts">
import { OperationMode } from '@/utils/constants';
import { useRoute } from 'vue-router';
import { getRecipeById, deleteRecipeById } from '@/apis/weGoNice/recipes';
import notificationService from '@/services/notification.service';
import { ref } from 'vue';

const mode = OperationMode.Edit;
const route = useRoute();

const recipe = ref<Recipes.Recipe | null>(null);
const init = async () => {
  const res = await getRecipeById(route.params.id);
  recipe.value = res;

  console.log(recipe.value);
};

init();

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
</script>

<template>
  <div class="recipes-detail">Recipes Detail</div>
</template>
