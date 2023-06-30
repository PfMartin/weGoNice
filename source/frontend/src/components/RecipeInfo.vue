<script setup lang="ts">
import TextInputField from '@/components/TextInputField.vue';
import { OperationMode, PrepTimeType } from '@/utils/constants';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  mode: OperationMode;
}>();

const recipeName = ref('');
const recipeNameError = ref('');
const updateRecipeName = (newRecipeName: string) => {
  console.warn(newRecipeName);
};

const prepTimeHours = ref('');
const prepTimeMinutes = ref('');
const prepTimeHoursError = ref('');
const prepTimeMinutesError = ref('');
const updatePrepTime = (prepTimeType: PrepTimeType, value: string) => {
  switch (prepTimeType) {
    case PrepTimeType.Hours:
      console.warn('hours: ', value);
      break;
    case PrepTimeType.Minutes:
      console.warn('minutes: ', value);
      break;
  }
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
      <div class="info-section">
        <TextInputField
          headline="Recipe name"
          iconName="book"
          id="recipeName"
          :initialValue="recipeName"
          placeholder="Insert the recipe's name"
          :inputError="recipeNameError"
          @changed="updateRecipeName"
        />
      </div>
      <div class="info-section">
        <TextInputField
          headline="Hours of preparation"
          iconName="time"
          id="prepTimeHours"
          :initialValue="prepTimeHours"
          placeholder="Insert hours of preparation"
          :inputError="prepTimeHoursError"
          @changed="(value) => updatePrepTime(PrepTimeType.Hours, value)"
        />
        <TextInputField
          headline="Minutes of preparation"
          iconName="time"
          id="prepTimeMinutes"
          :initialValue="prepTimeMinutes"
          placeholder="Insert minutes of preparation"
          :inputError="prepTimeMinutesError"
          @changed="(value) => updatePrepTime(PrepTimeType.Minutes, value)"
        />
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

    .info-section {
      display: flex;
      gap: 2rem;
    }
  }
}
</style>
