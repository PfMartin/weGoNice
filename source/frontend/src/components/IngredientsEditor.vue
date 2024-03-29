<script setup lang="ts">
import { AmountUnit } from '@/utils/constants';
import { onMounted, ref, computed } from 'vue';
import DropdownInput from '@/components/DropdownInput.vue';
import TextInputField from '@/components/TextInputField.vue';
import RankingList from '@/components/RankingList.vue';

const props = defineProps<{
  initialIngredients: Recipes.Ingredient[];
  hasError: boolean;
}>();

const emit = defineEmits<{
  (e: 'publish-ingredients', ingredients: Recipes.Ingredient[]): void;
}>();

/* Manage Values */
const ingredients = ref<Recipes.Ingredient[]>([]);

const updateTitle = (name: string, idx: number): void => {
  ingredients.value[idx].name = name;

  publishIngredients();
};

const updateAmount = (amount: string, idx: number): void => {
  ingredients.value[idx].amount = Number(amount);

  publishIngredients();
};

const selectUnit = (unit: string, idx: number): void => {
  ingredients.value[idx].unit = unit;

  publishIngredients();
};

const publishIngredients = (): void => {
  emit('publish-ingredients', ingredients.value);
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
    const { name, amount, unit } = defaultIngredient.value;

    const newIngredient = {
      rank: idx + 1,
      name,
      amount,
      unit,
    };

    ingredients.value.splice(idx, 0, newIngredient);
  }

  updateRanks();

  publishIngredients();
};

const removeIngredientAt = (idx: number): void => {
  ingredients.value.splice(idx, 1);
  updateRanks();

  publishIngredients();
};

const updateRanks = (): void => {
  ingredients.value.map((i, idx) => (i.rank = idx + 1));
};

const defaultIngredient = computed(() => ({
  rank: ingredients.value.length + 1,
  name: '',
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

  if (idx < 0) {
    ingredients.value.push(ingredient[0]);
  } else {
    ingredients.value.splice(idx, 0, ingredient[0]);
  }
  isDragActive.value = false;
  updateRanks();

  publishIngredients();
};

const hoveredDropZone = ref<number | null>(null);

const onDragEnter = (event: any) => {
  event.preventDefault();

  const dropZoneId = event.toElement.id.split('zone').reverse()[0];
  hoveredDropZone.value = Number(dropZoneId);
};

const onDragLeave = () => {
  hoveredDropZone.value = null;
};

const getHoveredClass = (idx: number): string =>
  hoveredDropZone.value === idx ? 'drop-zone-active' : '';

const formError = computed(() =>
  props.hasError ? 'Please provide a name for each ingredient in the list' : ''
);

onMounted(() => {
  ingredients.value = props.initialIngredients;
});
</script>

<template>
  <div class="ingredients-editor">
    <RankingList
      title="Ingredients"
      :formError="formError"
      :isDragActive="isDragActive"
      @on-drop="(e) => onDrop(e, -1)"
      @insert="insertIngredientAt(-1)"
    >
      <template v-slot:elements>
        <div
          v-for="(i, idx) in ingredients"
          class="ingredient-container"
          :key="idx"
          :draggable="true"
          @dragstart="startDrag($event, idx)"
          @dragend="hideDropZones"
        >
          <Transition name="fade" mode="out-in">
            <div
              v-if="isDragActive"
              class="drop-zone"
              :class="getHoveredClass(idx)"
              @drop="onDrop($event, idx)"
              @dragover.prevent
              @dragenter="onDragEnter"
              @drageleave="onDragLeave"
              :id="`drop-zone${idx}`"
            ></div>

            <div v-else class="add-divider" @click="insertIngredientAt(idx)">
              <div class="divider"></div>
              <ion-icon name="add"></ion-icon>
              <div class="divider"></div>
            </div>
          </Transition>

          <div class="ingredient">
            <div class="reorder">
              <ion-icon name="reorder-four"></ion-icon>
            </div>
            <TextInputField
              id="amount"
              type="number"
              :initialValue="`${i.amount}`"
              placeholder="Insert the ingredient's amount"
              @changed="(amount) => updateAmount(amount, idx)"
              width="3rem"
              :isDark="i.amount !== 0"
            />

            <DropdownInput
              :options="Object.values(AmountUnit)"
              :selectedOption="i.unit"
              @select-option="(unit) => selectUnit(unit, idx)"
              id="amountUnit"
              width="3.5rem"
              isDark
            />

            <TextInputField
              id="ingredient"
              type="text"
              :initialValue="i.name"
              placeholder="Insert the ingredient's name"
              @changed="(name) => updateTitle(name, idx)"
              width="300px"
              :isDark="i.name !== ''"
            />
            <div class="delete" @click="removeIngredientAt(idx)">
              <ion-icon name="trash"></ion-icon>
            </div>
          </div>
        </div>
      </template>
    </RankingList>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';
@import '@/styles/add-divider.scss';
@import '@/styles/drop-zone.scss';

.ingredients-editor {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: $border-radius;
  background-color: $bg-color-dark;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      margin: 0 0 0.5rem 0;
      padding: 0;
    }

    p {
      padding: 0;
      margin: 0;
      display: flex;
      gap: 0.5rem;
      color: $error-color;
    }
  }

  .ingredient-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .ingredient {
      display: flex;
      gap: 1.5rem;
      justify-content: flex-start;
      align-items: center;

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
    }
  }

  .end-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
