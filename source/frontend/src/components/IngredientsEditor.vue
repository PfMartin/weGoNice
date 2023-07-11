<script setup lang="ts">
import { AmountUnit } from '@/utils/constants';
import { onMounted, ref, computed } from 'vue';
import DropdownInput from '@/components/DropdownInput.vue';
import TextInputField from '@/components/TextInputField.vue';

const props = defineProps<{
  initialIngredients: Recipes.Ingredient[];
}>();

/* Manage Values */

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

/* Adding and Removing*/

// index of ingredient + 1 for inserting after
// index of ingredient for inserting before
// 0 for inserting at beginning
// -1 for pushing to array
const insertIngredientAt = (idx: number): void => {
  if (idx < 0) {
    ingredients.value.push(defaultIngredient.value);
  } else {
    const { title, amount, unit } = defaultIngredient.value;

    const newIngredient = {
      rank: idx + 1,
      title,
      amount,
      unit,
    };

    ingredients.value.splice(idx, 0, newIngredient);
  }

  updateRanks();
};

const removeIngredientAt = (idx: number): void => {
  ingredients.value.splice(idx, 1);
  updateRanks();
};

const updateRanks = (): void => {
  ingredients.value.map((i, idx) => (i.rank = idx + 1));
};

const defaultIngredient = computed(() => ({
  rank: ingredients.value.length + 1,
  title: '',
  amount: 0,
  unit: AmountUnit.G,
}));

/* Drag and Drop */

const isDragActive = ref(false);

const startDrag = (event: DragEvent, idx: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('index', `${idx}`);
  }

  // The dragged element is displayed as the last representation itself before starting to drag
  // setTimeout makes drop zones appear after the drag started. Therefore, the dropzone for the dragged element is not shown
  setTimeout(() => {
    isDragActive.value = true;
  }, 100);
};

const hideDropZones = () => {
  isDragActive.value = false;
};

const onDrop = (event: DragEvent, idx: number) => {
  const prevIndex = Number(event.dataTransfer?.getData('index'));
  const ingredient = ingredients.value.splice(prevIndex, 1);

  if (idx > 0) {
    ingredients.value.push(ingredient[0]);
  } else {
    ingredients.value.splice(idx, 0, ingredient[0]);
  }
  isDragActive.value = false;
  updateRanks();
  console.warn(ingredients.value);
};

const onDragEnter = (event: DragEvent) => {
  event.preventDefault();
};

onMounted(() => {
  ingredients.value = props.initialIngredients;
});
</script>

<template>
  <div class="ingredients-editor">
    <h2>Ingredients</h2>
    <div
      v-for="(i, idx) in ingredients"
      class="ingredient-container"
      :key="idx"
      :draggable="true"
      @dragstart="startDrag($event, idx)"
      @dragend="hideDropZones"
    >
      <div
        v-if="isDragActive"
        class="drop-zone"
        @drop="onDrop($event, idx)"
        @dragover.prevent
        @dragenter="onDragEnter"
      ></div>

      <div v-else class="add-divider" @click="insertIngredientAt(idx)">
        <div class="divider"></div>
        <ion-icon name="add"></ion-icon>
        <div class="divider"></div>
      </div>

      <div class="ingredient">
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
        <div class="delete" @click="removeIngredientAt(idx)">
          <ion-icon name="trash"></ion-icon>
        </div>
      </div>
    </div>
    <div
      v-if="isDragActive"
      class="drop-zone"
      @drop="onDrop($event, -1)"
      @dragover.prevent
      @dragenter="onDragEnter"
    ></div>
    <div class="add-container">
      <div class="add-button" @click="insertIngredientAt(-1)">
        <ion-icon name="add" />
      </div>
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h2 {
    margin: 0 0 0.5rem 0;
    padding: 0;
  }

  .reorder {
    font-size: 1.5rem;
    color: $bg-color-mid;
    transition: color 0.2s;

    &:hover {
      cursor: grab;
      color: $accent-color;
    }
  }

  .delete {
    font-size: 1.2rem;
    color: $bg-color-mid;
    transition: color 0.2s;

    &:hover {
      cursor: pointer;
      color: $error-hover-color;
    }
  }

  .drop-zone {
    width: 100%;
    height: 1.5rem;
    background-color: $accent-color;
    margin-bottom: 0.5rem;

    &:hover {
      background-color: $accent-color;
    }
  }

  .ingredient-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .add-divider {
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .divider {
        height: 1px;
        width: 10rem;
        background-color: $bg-color-mid;
        transition: background-color 0.2s;
      }

      ion-icon {
        padding: 1px;
        color: $bg-color-dark;
        font-size: 1.2rem;
        background-color: $bg-color-mid;
        border-radius: $border-radius;
        margin: 0 0.5rem;
        transition: color 0.2s;
      }

      &:hover {
        cursor: pointer;

        .divider {
          background-color: $accent-color;
        }

        ion-icon {
          color: $accent-color;
        }
      }
    }

    .ingredient {
      display: flex;
      gap: 1.5rem;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .add-container {
    display: flex;
    align-items: center;
    justify-content: center;

    .add-button {
      padding: 0.3rem 0.4rem;
      background-color: $bg-color-mid;
      border: 1px solid $bg-color-mid;
      border-radius: 5px;
      font-size: 1.3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;

      &:hover {
        color: $accent-color;
        border-color: $accent-color;
        cursor: pointer;
      }
    }
  }
}
</style>
