<script setup lang="ts">
import TextInputField from '@/components/TextInputField.vue';
import { computed, onMounted, ref } from 'vue';
import RankingList from '@/components/RankingList.vue';

const props = defineProps<{
  initialSteps: Recipes.PrepStep[];
  hasError: boolean;
}>();

const emit = defineEmits<{
  (e: 'publish-steps', steps: Recipes.PrepStep[]): void;
}>();

const steps = ref<Recipes.PrepStep[]>([]);

const updateTitle = (name: string, idx: number): void => {
  steps.value[idx].name = name;

  publishSteps();
};

const insertStepAt = (idx: number): void => {
  if (idx < 0) {
    steps.value.push(defaultStep.value);
  } else {
    const { name } = defaultStep.value;

    const newStep = {
      rank: idx + 1,
      name,
    };

    steps.value.splice(idx, 0, newStep);
  }

  updateRanks();

  publishSteps();
};

const defaultStep = computed(() => ({
  rank: steps.value.length + 1,
  name: '',
}));

const removeStepAt = (idx: number): void => {
  steps.value.splice(idx, 1);
  updateRanks();

  publishSteps();
};

const updateRanks = (): void => {
  steps.value.map((i, idx) => (i.rank = idx + 1));
};

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
  const step = steps.value.splice(prevIndex, 1);

  if (idx < 0) {
    steps.value.push(step[0]);
  } else {
    steps.value.splice(idx, 0, step[0]);
  }
  isDragActive.value = false;
  updateRanks();

  publishSteps();
};

const publishSteps = (): void => {
  emit('publish-steps', steps.value);
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
  props.hasError ? 'Please provide a description for each step in the list' : ''
);

onMounted(() => {
  steps.value = props.initialSteps;
});
</script>

<template>
  <div class="steps-editor">
    <RankingList
      title="Steps"
      :formError="formError"
      :isDragActive="isDragActive"
      @on-drop="(e) => onDrop(e, -1)"
      @insert="insertStepAt(-1)"
    >
      <template v-slot:elements>
        <div
          v-for="(s, idx) in steps"
          class="step-container"
          :draggable="true"
          @dragstart="startDrag($event, idx)"
          @dragend="hideDropZones"
          :key="idx"
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

            <div v-else class="add-divider" @click="insertStepAt(idx)">
              <div class="divider"></div>
              <ion-icon name="add"></ion-icon>
              <div class="divider"></div>
            </div>
          </Transition>

          <div class="step">
            <div class="reorder">
              <ion-icon name="reorder-four"></ion-icon>
            </div>

            <h4>{{ s.rank }}.</h4>

            <TextInputField
              id="step"
              type="textarea"
              :isArea="true"
              :initialValue="s.name"
              placeholder="Insert a description for the preparation step"
              @changed="(name) => updateTitle(name, idx)"
              width="90%"
            />

            <div class="delete" @click="removeStepAt(idx)">
              <ion-icon name="trash"></ion-icon>
            </div>
          </div>
        </div>
      </template>
    </RankingList>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';
@import '@/styles/drop-zone.scss';
@import '@/styles/add-divider.scss';

.steps-editor {
  padding: 1rem;
  margin-top: 1rem;
  border-radius: $border-radius;
  background-color: $bg-color-dark;

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

  .step-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.5rem;

    .step {
      display: flex;
      gap: 1.5rem;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

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
