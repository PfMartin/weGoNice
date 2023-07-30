<script setup lang="ts">
import { OperationMode } from '@/utils/constants';
import { useRoute } from 'vue-router';
import {
  getRecipeById,
  deleteRecipeById,
  updateRecipeById,
} from '@/apis/weGoNice/recipes';
import NotificationService from '@/services/notification.service';
import { ref } from 'vue';
import RecipeInfo from '@/components/RecipeInfo.vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { ButtonType } from '@/utils/constants';
import router from '@/router';

const mode = OperationMode.Edit;
const route = useRoute();

const recipe = ref<Recipes.Recipe | null>(null);
const init = async () => {
  const res = await getRecipeById(route.params.id);
  recipe.value = res;
};

const hasIngredientsError = ref(false);
const hasStepsError = ref(false);

const updateRecipe = async (data: Recipes.Recipe) => {
  validateIngredients(data);
  validateSteps(data);

  const id = recipe.value?.id;

  if (hasIngredientsError.value || hasStepsError.value || !id) {
    return;
  }

  const res = await updateRecipeById(id, data);

  if (res.status !== 200) {
    NotificationService.addNotification(
      'error',
      `Something went wrong while updating the recipe: Status ${res.status}`
    );
  }
};

const deleteRecipe = async () => {
  const res = await deleteRecipeById(route.params.id);

  if (res.status !== 200) {
    NotificationService.addNotification(
      'error',
      `Something went wrong while deleting the recipe: Status ${res.status}`
    );
    return;
  }

  NotificationService.addNotification(
    'success',
    `Successfully deleted ${recipe.value?.name}`
  );
  router.push({ name: 'RecipesOverview' });
};

const validateIngredients = (data: Recipes.Recipe) => {
  hasIngredientsError.value = data.ingredients.some((i) => i.name === '');
};

const validateSteps = (data: Recipes.Recipe) => {
  hasStepsError.value = data.steps.some((s) => s.name === '');
};

init();
</script>

<template>
  <div class="recipes-detail">
    <div class="container">
      <RecipeInfo
        v-if="recipe"
        :mode="mode"
        @on-change="updateRecipe"
        :hasIngredientsError="hasIngredientsError"
        :hasStepsError="hasStepsError"
        :initialData="recipe"
      />
      <SpinnerComponent v-else />
      <div class="buttons">
        <RouterLink
          :to="{
            name: 'RecipesOverview',
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
          @on-click="deleteRecipe"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
.recipes-detail {
  margin: 1rem 1rem 1rem calc($nav-bar-width + 1rem);
  display: flex;
  justify-content: center;

  .buttons {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
  }
}
</style>
