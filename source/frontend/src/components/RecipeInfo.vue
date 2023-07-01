<script setup lang="ts">
import TextInputField from '@/components/TextInputField.vue';
import {
  OperationMode,
  PrepTimeType,
  PREP_TIME_HOURS_OPTIONS,
  PREP_TIME_MINUTES_OPTIONS,
} from '@/utils/constants';
import { onMounted, ref } from 'vue';
import DropdownInput from '@/components/DropdownInput.vue';

const props = defineProps<{
  mode: OperationMode;
}>();

const recipeName = ref('');
const recipeNameError = ref('');
const updateRecipeName = (newRecipeName: string) => {
  console.warn(newRecipeName);
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
            <p class="label">
              <ion-icon name="time"></ion-icon>&nbsp;Preparation Time
            </p>

            <div class="inputs">
              <DropdownInput
                :options="PREP_TIME_HOURS_OPTIONS"
                :selectedOption="prepTimeHours.toString()"
                @select-option="
                  (val) => selectPrepTime(PrepTimeType.Hours, val)
                "
                id="prepTimeHours"
                label="Hours"
                width="50px"
              />
              <DropdownInput
                :options="PREP_TIME_MINUTES_OPTIONS"
                :selectedOption="prepTimeMinutes.toString()"
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
            <p class="label"><ion-icon name="person"></ion-icon>&nbsp;Author</p>
            <div class="inputs">
              <DropdownInput
                :options="authors"
                :selectedOption="author"
                @select-option="selectAuthor"
                id="author"
                label="Author"
                width="300px"
              />
            </div>
          </div>
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
  padding: 1rem;
  box-shadow: $shadow;
  display: flex;

  .info {
    width: 100%;
    color: $text-color;
    padding: 1rem;

    .recipe-header {
      background: $bg-color-dark;
      border-radius: $border-radius;
      padding: 1rem;

      .info-section {
        display: flex;
        gap: 2rem;

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
}
</style>
