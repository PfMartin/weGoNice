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
import { onMounted, ref, watch } from 'vue';
import DropdownInput from '@/components/DropdownInput.vue';
import PrepStepsEditor from '@/components/PrepStepsEditor.vue';
import { getAllAuthors } from '@/apis/weGoNice/authors';
import ValidationService from '@/services/validation.service';
import { checkFileTypeValid } from '@/utils/validation';
import NotificationService from '@/services/notification.service';
import {
  getImage,
  getImageTmp,
  uploadFile,
  uploadFileTmp,
} from '@/apis/weGoNice/files';
import { dateToString } from '@/utils/utility-functions';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const validationService = new ValidationService();

const props = defineProps<{
  mode: OperationMode;
  initialData?: Recipes.Recipe;
}>();

const emit = defineEmits<{
  (e: 'on-change', body: Recipes.Recipe): void;
}>();

const recipeTitle = ref('');
const recipeTitleError = ref('');
const updateRecipeTitle = (newrecipeTitle: string) => {
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
const recipeCategory = ref(categories[0]);
const selectCategory = (val: string): void => {
  recipeCategory.value = val;

  publishBody();
};

const ingredients = ref<Recipes.Ingredient[]>([]);
const updateIngredients = (recipeIngredients: Recipes.Ingredient[]) => {
  ingredients.value = recipeIngredients;

  publishBody();
};

const prepSteps = ref<Recipes.PrepStep[]>([]);
const updatePrepSteps = (recipeSteps: Recipes.PrepStep[]): void => {
  prepSteps.value = recipeSteps;

  publishBody();
};

const imageName = ref('');
/* Handle File Input */
const fileInput = ref<HTMLInputElement | null>(null);
const openUploadWindow = (): void => {
  fileInput.value?.click();
};

const updateImage = async () => {
  let url!: string | WeGoNiceApi.RequestResponse;

  const id = props.initialData?.id;
  const file = fileInput.value?.files?.length
    ? fileInput.value?.files[0]
    : null;

  let f = '';

  if (props.mode === OperationMode.Edit && id) {
    if (file) {
      const [fName, typeExtension] = fileName.value.split('.');
      const fType = typeExtension.toLowerCase();

      f = `${dateToString(new Date())}-${
        props.initialData.id
      }-${fName}.${fType}`;
    }

    url = await getImage(f);
  } else if (props.mode === OperationMode.Create && file) {
    const [fName, typeExtension] = fileName.value.split('.');
    const fType = typeExtension.toLowerCase();

    f = `${fName}.${fType}`;
    url = await getImageTmp(f);
  }

  imageName.value = f;
  img.value = url as string;
  isFileLoading.value = false;
};

const fileName = ref('');
watch(fileName, async () => {
  await timeout(200);
  await updateImage();
});

const isFileLoading = ref(false);
const executeUpload = async () => {
  isFileLoading.value = true;

  const pathArray = fileInput.value?.value.split('\\') || [];
  const fileNameArray = pathArray[pathArray.length - 1].split('.');
  const fName = fileNameArray[0];
  const fType = fileNameArray[1].toLowerCase();

  const validationErr = checkFileTypeValid(fType);
  if (validationErr) {
    NotificationService.addNotification('error', validationErr);
    return;
  }

  fileName.value = `${fName}.${fType}`;

  const file =
    fileInput.value && fileInput.value.files ? fileInput.value?.files[0] : null;

  if (props.mode === OperationMode.Edit && file) {
    const id = props.initialData?.id;
    if (!id) {
      return;
    }

    const res = await uploadFile(id, file);
    if (res.status !== 200) {
      NotificationService.addNotification(
        'error',
        'Something went wrong while uploading the picture.'
      );
    }

    console.warn(fileName.value);

    publishBody();
    return;
  } else if (props.mode === OperationMode.Create && file) {
    console.log('upload', fileName.value);
    const res = await uploadFileTmp(file);
    if (res.status !== 200) {
      NotificationService.addNotification(
        'error',
        `Something went wrong while uploading the picture: Status ${res.status}`
      );
      return;
    }

    publishBody();
  }
};

const hasPictureOverlay = ref(false);
const togglePictureOverlay = () => {
  hasPictureOverlay.value = !hasPictureOverlay.value;
};

const img = ref('');

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
    category: recipeCategory.value,
    ingredients: ingredients.value,
    steps: prepSteps.value,
    imageName: fileName.value,
  };

  emit('on-change', body);
};

const getAuthors = async (): Promise<void> => {
  authors.value = (await getAllAuthors()) || [];

  authorOptions.value = authors.value.map(
    (a) => a.name || `${a.firstName} ${a.lastName}`
  );
};

const populateWithInitialData = (): void => {
  if (props.initialData) {
    console.warn(props.initialData);
    recipeTitle.value = props.initialData.name;
    prepTimeHours.value = props.initialData.timeHours;
    prepTimeMinutes.value = props.initialData.timeMinutes;
    recipeCategory.value = props.initialData.category;

    const recipeAuthor = props.initialData.author;
    if (recipeAuthor) {
      selectedAuthor.value =
        authorOptions.value.find(
          (a) =>
            a === recipeAuthor.name ||
            a === `${recipeAuthor.firstName} ${recipeAuthor.lastName}`
        ) || 'n/a';
    }

    props.initialData.ingredients.forEach((i) => {
      ingredients.value.push(i);
    });

    props.initialData.steps.forEach((s) => {
      prepSteps.value.push(s);
    });

    fileName.value = props.initialData.imageName;
  }
};

onMounted(async () => {
  await getAuthors();

  if (props.mode === OperationMode.Create) {
    document.getElementById('recipeTitle')?.focus();
    selectedAuthor.value = authorOptions.value[0];
  } else {
    populateWithInitialData();
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
  await updateImage();
});
</script>

<template>
  <div class="recipe-info">
    <div
      class="picture"
      @click="openUploadWindow"
      @mouseenter="togglePictureOverlay"
      @mouseleave="togglePictureOverlay"
    >
      <Transition name="fade">
        <div v-show="hasPictureOverlay" class="picture-overlay">
          <input
            type="file"
            name="picture"
            id="fileInput"
            ref="fileInput"
            @change="executeUpload"
          />
          <ion-icon name="create"></ion-icon>
          <p>
            {{
              fileName.length > 30
                ? `${fileName.slice(0, 30)}...`
                : fileName || 'No file chosen...'
            }}
          </p>
        </div>
      </Transition>
      <SpinnerComponent v-if="isFileLoading" />
      <ion-icon v-else-if="!fileName && !img" name="image" />
      <img v-else-if="fileName && img" :src="img" alt="Recipe Picture" />
    </div>
    <div class="info">
      <div class="recipe-header">
        <div class="info-section">
          <TextInputField
            headline="Recipe name"
            type="text"
            iconName="book"
            id="recipeTitle"
            :initialValue="recipeTitle"
            placeholder="Insert the recipe's name"
            :inputError="recipeTitleError"
            @changed="updateRecipeTitle"
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
                :selectedOption="recipeCategory"
                @select-option="selectCategory"
                id="category"
                width="300px"
                :isDark="recipeCategory !== ''"
              />
            </div>
          </div>
        </div>
      </div>

      <IngredientsEditor
        :initialIngredients="ingredients"
        @publish-ingredients="updateIngredients"
        :hasError="false"
      />

      <PrepStepsEditor
        :initialSteps="prepSteps"
        @publish-steps="updatePrepSteps"
        :hasError="false"
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1200px;

  .picture {
    position: relative;
    border-radius: $border-radius;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    min-height: 400px;
    max-height: 400px;
    width: 600px;
    margin: 1rem 1rem 0 1rem;
    background-color: $bg-color-dark;

    img {
      max-height: 400px;
      border-radius: $border-radius;
    }

    .picture-overlay {
      position: absolute;
      z-index: 5;
      background: rgba($bg-color-lighter, 0.6);
      height: 100%;
      width: 100%;
      border-radius: $border-radius;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;

      input {
        position: fixed;
        left: 100vw;
      }

      ion-icon {
        opacity: 1;
        font-size: 3rem;
        color: $bg-color-mid;
      }
    }

    ion-icon {
      font-size: 6rem;
      color: $text-color;
      z-index: 1;
    }
  }

  .info {
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
