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
} from '@/utils/constants';
import { onMounted, ref } from 'vue';
import DropdownInput from '@/components/DropdownInput.vue';
import PrepStepsEditor from '@/components/PrepStepsEditor.vue';
import { useRouter } from 'vue-router';
import { getAllAuthors } from '@/apis/weGoNice/authors';
import ValidationService from '@/services/validation.service';

const validationService = new ValidationService();

const props = defineProps<{
  mode: OperationMode;
  hasIngredientsError: boolean;
  hasStepsError: boolean;
}>();

const emit = defineEmits<{
  (e: 'on-change', body: Recipes.Recipe): void;
}>();

const recipeTitle = ref('');
const recipeTitleError = ref('');
const updaterecipeTitle = (newrecipeTitle: string) => {
  recipeTitle.value = newrecipeTitle;
  recipeTitleError.value = validationService.validateRecipeTitle(
    recipeTitle.value
  );

  publishBody();
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

  publishBody();
};

const authors = ref<Authors.Author[]>([]);
const authorOptions = ref<string[]>([]);
const selectedAuthor = ref('');
const selectAuthor = (val: string) => {
  selectedAuthor.value = val;

  publishBody();
};

const categories = CATEGORY_OPTIONS;
const category = ref(categories[0]);
const selectCategory = (val: string): void => {
  category.value = val;

  publishBody();
};

const ingredients = ref<Recipes.Ingredient[]>([]);

const prepSteps = ref<Recipes.PrepStep[]>([]);

const publishBody = (): void => {
  const authorToSave = authors.value.find(
    (a) =>
      a.name === selectedAuthor.value ||
      `${a.firstName} ${a.lastName}` === selectedAuthor.value
  );

  const body = {
    name: recipeTitle.value,
    authorId: authorToSave?.id || '',
    timeHours: prepTimeHours.value,
    timeMinutes: prepTimeMinutes.value,
    category: category.value,
    ingredients: ingredients.value,
    steps: prepSteps.value,
  };

  emit('on-change', body);
};

const getAuthors = async (): Promise<void> => {
  authors.value = (await getAllAuthors()) || [];

  authorOptions.value = authors.value.map(
    (a) => a.name || `${a.firstName} ${a.lastName}`
  );
};

onMounted(async () => {
  await getAuthors();

  if (props.mode === OperationMode.Create) {
    document.getElementById('recipeTitle')?.focus();
    selectedAuthor.value = authorOptions.value[0];
  } else {
    // TODO: Get Recipe
    // TODO: Load recipe values to refs
  }

  if (!ingredients.value.length) {
    ingredients.value.push({
      rank: 1,
      name: '',
      amount: 0,
      unit: AmountUnit.G,
    });
  }

  if (!prepSteps.value.length) {
    prepSteps.value.push({
      rank: 1,
      name: '',
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
            type="text"
            iconName="book"
            id="recipeTitle"
            :initialValue="recipeTitle"
            placeholder="Insert the recipe's name"
            :inputError="recipeTitleError"
            @changed="updaterecipeTitle"
            :isDark="recipeTitle !== ''"
            :withErrorHandling="true"
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
                :selectedOption="selectedAuthor"
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

      <IngredientsEditor
        :initialIngredients="ingredients"
        @publish-ingredients="publishBody"
        :hasError="hasIngredientsError"
      />

      <PrepStepsEditor
        :initialSteps="prepSteps"
        @publish-steps="publishBody"
        :hasError="hasStepsError"
      />
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
  }
}
</style>
