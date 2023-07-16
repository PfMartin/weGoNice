<script setup lang="ts">
import RecipeInfo from '@/components/RecipeInfo.vue';
import { OperationMode } from '@/utils/constants';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ButtonType } from '@/utils/constants';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { createRecipe } from '@/apis/weGoNice/recipes';
import notificationService from '@/services/notification.service';

const router = useRouter();

const recipe = ref<Recipes.Recipe>({
  name: '',
  authorId: '',
  timeHours: 0,
  timeMinutes: 0,
  category: '',
  ingredients: [],
  steps: [],
});

const setData = (r: Recipes.Recipe): void => {
  recipe.value = r;
};

const submit = async (): Promise<void> => {
  if (!hasTitle.value || hasStepsError.value || hasIngredientsError.value) {
    notificationService.addNotification(
      'error',
      'Please provide all the information required for creating a recipe'
    );

    return;
  }

  const res = await createRecipe(recipe.value);

  router.push({ name: 'RecipesOverview' });
};

const hasIngredientsError = computed(() =>
  recipe.value.ingredients.some((i) => !i.title)
);

const hasStepsError = computed(() => recipe.value.steps.some((s) => !s.title));

const hasTitle = computed(() => recipe.value.name);

const cancel = (): void => {
  router.push({ name: 'RecipesOverview' });
};
</script>

<template>
  <div class="recipes-create">
    <div class="container">
      <RecipeInfo
        :mode="OperationMode.Create"
        @on-change="setData"
        :hasIngredientsError="hasIngredientsError"
        :hasStepsError="hasStepsError"
      />
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
        <div class="control-buttons">
          <ButtonComponent
            :buttonType="ButtonType.Delete"
            buttonText="Cancel"
            buttonIconName="close-circle"
            @on-click="cancel"
          />
          <ButtonComponent
            :buttonType="ButtonType.Primary"
            buttonText="Save"
            buttonIconName="checkmark-done"
            @on-click="submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
.recipes-create {
  margin: 1rem 1rem 1rem calc($nav-bar-width + 1rem);
  display: flex;
  justify-content: center;

  .container {
    .buttons {
      display: flex;
      justify-content: space-between;
      padding: 1rem 0;

      .control-buttons {
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
    }
  }
}
</style>
