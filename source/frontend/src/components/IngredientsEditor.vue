<script setup lang="ts">
import { AmountUnit } from '@/utils/constants';
import { onMounted, ref } from 'vue';
import DropdownInput from '@/components/DropdownInput.vue';
import TextInputField from '@/components/TextInputField.vue';

const props = defineProps<{
  initialIngredients: Recipes.Ingredient[];
}>();

const ingredients = ref<Recipes.Ingredient[]>([]);

const updateTitle = (title: string, idx: number): void => {
  ingredients.value[idx].title = title;
};

const updateAmount = (amount: string, idx: number): void => {
  // TODO: Validation for number
  ingredients.value[idx].amount = Number(amount);
};

const selectUnit = (unit: string, idx: number): void => {
  ingredients.value[idx].unit = unit;
};

onMounted(() => {
  if (props.initialIngredients.length < 1) {
    ingredients.value = [
      {
        rank: 1,
        title: '',
        amount: 0,
        unit: AmountUnit.G,
      },
    ];
    return;
  }
  ingredients.value = props.initialIngredients;
});
</script>

<template>
  <div class="ingredients-editor">
    <h2>Ingredients</h2>
    <div v-for="(i, idx) in ingredients" class="ingredient" :key="idx">
      <div class="reorder">
        <ion-icon name="reorder-four"></ion-icon>
      </div>

      <TextInputField
        id="ingredient"
        :initialValue="i.title"
        placeholder="Insert the ingredient's title"
        @changed="(title) => updateTitle(title, idx)"
        width="300px"
      />
      <TextInputField
        id="amount"
        :initialValue="`${i.amount}`"
        placeholder="Insert the ingredient's amount"
        @changed="(amount) => updateAmount(amount, idx)"
        width="50px"
      />
      <DropdownInput
        :options="Object.values(AmountUnit)"
        :selectedOption="i.unit"
        @select-option="(unit) => selectUnit(unit, idx)"
        id="amountUnit"
        width="50px"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.ingredients-editor {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: $border-radius;
  background-color: $bg-color-dark;

  .reorder {
    font-size: 1.5rem;
    color: $text-color;
    transition: color 0.2s;

    &:hover {
      cursor: grab;
      color: $accent-color;
    }
  }

  .ingredient {
    display: flex;
    gap: 1.5rem;
    justify-content: flex-start;
    align-items: center;
  }

  .prep-step {
    display: flex;
    align-items: center;
    gap: 1rem;

    h4 {
      padding: 0;
      margin: 0;
    }
  }
}
</style>
