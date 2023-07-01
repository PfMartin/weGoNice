<script setup lang="ts">
import TextInputField from '@/components/TextInputField.vue';
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

const authors = ['Hello', 'There'];
const author = ref(authors[0]);
const selectAuthor = (val: string) => {
  author.value = val;
};

const categories = CATEGORY_OPTIONS;
const category = ref(categories[0]);
const selectCategory = (val: string) => {
  category.value = val;
};

const ingredients = ref<Recipes.Ingredient[]>([]);

onMounted(() => {
  if (props.mode === OperationMode.Create) {
    document.getElementById('recipeName')?.focus();
  }
});
</script>

<template>
  <div class="recipe-info">
    <div class="info">
      <div class="recipe-header">
        <div class="info-section">
          <TextInputField
            headline="Recipe name"
            iconName="book"
            id="recipeName"
            :initialValue="recipeName"
            placeholder="Insert the recipe's name"
            :inputError="recipeNameError"
            @changed="updateRecipeName"
            isDark
          />
        </div>
        <div class="info-section">
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
              />
            </div>
          </div>
          <div class="author">
            <p class="label"><ion-icon name="person" />&nbsp;Author</p>
            <div class="inputs">
              <DropdownInput
                :options="authors"
                :selectedOption="author"
                @select-option="selectAuthor"
                id="author"
                width="400px"
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
              />
            </div>
          </div>
        </div>
      </div>

      <div class="ingredients">
        <TextInputField
          id="ingredient"
          :initialValue="recipeName"
          placeholder="Insert the ingredient's title"
          @changed="updateRecipeName"
          width="300px"
          isDark
        />
        <TextInputField
          id="amount"
          :initialValue="recipeName"
          placeholder="Insert the ingredient's amount"
          @changed="updateRecipeName"
          width="50px"
          isDark
        />
        <DropdownInput
          :options="Object.values(AmountUnit)"
          :selectedOption="category"
          @select-option="selectCategory"
          id="amountUnit"
          width="50px"
        />
      </div>

      <div class="steps"></div>
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

  .info {
    width: 100%;
    color: $text-color;
    padding: 1rem;

    .recipe-header {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .info-section {
        background: $bg-color-dark;
        border-radius: $border-radius;
        padding: 1rem;
        display: flex;
        gap: 3rem;
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

    .ingredients {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
  }
}
</style>
