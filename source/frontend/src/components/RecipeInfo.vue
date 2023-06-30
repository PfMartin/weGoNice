<script setup lang="ts">
import TextInputField from '@/components/TextInputField.vue';
import { OperationMode } from '@/utils/constants';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  mode: OperationMode;
}>();

const recipeName = ref('');
const recipeNameError = ref('');

const updateRecipeName = (newRecipeName: string) => {
  console.warn(newRecipeName);
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
  }
}
</style>
