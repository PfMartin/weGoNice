<script setup lang="ts">
import TextInputField from '@/components/TextInputField.vue';
import IngredientsEditor from '@/components/IngredientsEditor.vue';
import {
  OperationMode,
  PrepTimeType,
  PREP_TIME_HOURS_OPTIONS,
  PREP_TIME_MINUTES_OPTIONS,
  CATEGORY_OPTIONS,
  AmountUnit,
  ButtonType,
} from '@/utils/constants';
import { onMounted, ref, computed } from 'vue';
import DropdownInput from '@/components/DropdownInput.vue';
import PrepStepsEditor from '@/components/PrepStepsEditor.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import { useRouter } from 'vue-router';
import { createRecipe } from '@/apis/weGoNice/recipes';
import { getAllAuthors } from '@/apis/weGoNice/authors';

const router = useRouter();

const props = defineProps<{
  mode: OperationMode;
}>();

const recipeName = ref('');
const recipeNameError = ref('');
const updateRecipeName = (newRecipeName: string) => {
  recipeName.value = newRecipeName;
};

const prepTimeHours = ref(0);
const prepTimeMinutes = ref(0);
const selectPrepTime = (prepTimeType: PrepTimeType, value: string) => {
  switch (prepTimeType) {
    case PrepTimeType.Hours:
      prepTimeHours.value = Number(value);
      break;
    case PrepTimeType.Minutes:
      prepTimeMinutes.value = Number(value);
      break;
  }
};

const authors = ref<Authors.Author[]>([]);
const authorOptions = ref<string[]>([]);
const selectedAuthor = ref('');
const selectAuthor = (val: string) => {
  selectedAuthor.value = val;
};

const categories = CATEGORY_OPTIONS;
const category = ref(categories[0]);
const selectCategory = (val: string): void => {
  category.value = val;
};

const ingredients = ref<Recipes.Ingredient[]>([]);

const prepSteps = ref<Recipes.PrepStep[]>([]);

const cancel = (): void => {
  router.push({ name: 'RecipesOverview' });
};

const submit = async (): Promise<void> => {
  const authorToSave = authors.value.find(
    (a) =>
      a.name === selectedAuthor.value ||
      `${a.firstName} ${a.lastName}` === selectedAuthor.value
  );

  //TODO: Validate inputs
  // - No authorID
  // - No Title
  // - No Category
  // - No Time

  if (authorToSave) {
    const body = {
      name: recipeName.value,
      authorId: authorToSave.id,
      timeHours: prepTimeHours.value,
      timeMinutes: prepTimeMinutes.value,
      category: category.value,
      ingredients: ingredients.value,
      steps: prepSteps.value,
    };

    const res = await createRecipe(body);
  }
};

const getAuthors = async (): Promise<void> => {
  authors.value = (await getAllAuthors()) || [];

  authorOptions.value = authors.value.map(
    (a) => a.name || `${a.firstName} ${a.lastName}`
  );
};

onMounted(async () => {
  if (props.mode === OperationMode.Create) {
    document.getElementById('recipeName')?.focus();
  } else {
    // TODO: Get Recipe
    // TODO: Load recipe values to refs
  }

  await getAuthors();

  if (!ingredients.value.length) {
    ingredients.value.push({
      rank: 1,
      title: '',
      amount: 0,
      unit: AmountUnit.G,
    });
  }

  if (!prepSteps.value.length) {
    prepSteps.value.push({
      rank: 1,
      title: '',
    });
  }
});
</script>

<template>
  <div class="recipe-info">
    <div class="info">
      <div class="recipe-header">
        <div class="info-section">
          <h2>Recipe Details</h2>
          <TextInputField
            headline="Recipe name"
            iconName="book"
            id="recipeName"
            :initialValue="recipeName"
            placeholder="Insert the recipe's name"
            :inputError="recipeNameError"
            @changed="updateRecipeName"
            :isDark="recipeName !== ''"
          />
          <div class="prep-time">
            <p class="label"><ion-icon name="time" />&nbsp;Preparation Time</p>

            <div class="inputs">
              <DropdownInput
                :options="PREP_TIME_HOURS_OPTIONS"
                :selectedOption="`${prepTimeHours}`"
                @select-option="
                  (val) => selectPrepTime(PrepTimeType.Hours, val)
                "
                id="prepTimeHours"
                label="Hours"
                width="50px"
                :isDark="prepTimeHours !== 0"
              />
              <DropdownInput
                :options="PREP_TIME_MINUTES_OPTIONS"
                :selectedOption="`${prepTimeMinutes}`"
                @select-option="
                  (val) => selectPrepTime(PrepTimeType.Minutes, val)
                "
                id="prepTimeMinutes"
                label="Minutes"
                width="50px"
                :isDark="prepTimeHours !== 0"
              />
            </div>
          </div>
          <div class="author">
            <p class="label"><ion-icon name="person" />&nbsp;Author</p>
            <div class="inputs">
              <DropdownInput
                :options="authorOptions"
                :selectedOption="selectedAuthor || 'Select an author...'"
                @select-option="selectAuthor"
                id="author"
                width="400px"
                :isDark="selectedAuthor !== ''"
              />
            </div>
          </div>
          <div class="category">
            <p class="label"><ion-icon name="color-filter" />&nbsp;Category</p>
            <div class="inputs">
              <DropdownInput
                :options="categories"
                :selectedOption="category"
                @select-option="selectCategory"
                id="category"
                width="300px"
                :isDark="category !== ''"
              />
            </div>
          </div>
        </div>
      </div>

      <IngredientsEditor :initialIngredients="ingredients" />

      <PrepStepsEditor :initialSteps="prepSteps" />

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
@import '@/styles/colors.scss';

.recipe-info {
  background: $bg-color-mid;
  border-radius: $border-radius;
  box-shadow: $shadow;
  display: flex;
  max-width: 1200px;

  h2 {
    padding: 0;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .info {
    width: 100%;
    color: $text-color;
    padding: 1rem;

    .recipe-header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .info-section {
      background: $bg-color-dark;
      border-radius: $border-radius;
      padding: 1rem;
      display: flex;
      gap: 1rem;
      padding-right: 2rem;
      flex-wrap: wrap;
      justify-content: space-between;

      p.label {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .inputs {
        display: flex;
      }
    }

    .buttons {
      margin: 1rem 0;
      display: flex;
      justify-content: space-between;

      .control-buttons {
        display: flex;
        justify-content: 'flex-end';
        gap: 1rem;
      }
    }
  }
}
</style>
