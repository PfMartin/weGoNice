<script setup lang="ts">
import TextInputField from '@/components/TextInputField.vue';
import { onMounted, ref } from 'vue';

const props = defineProps<{
  initialSteps: Recipes.PrepStep[];
}>();

const steps = ref<Recipes.PrepStep[]>([]);

const updateTitle = (title: string, idx: number): void => {
  steps.value[idx].title = title;
};

onMounted(() => {
  if (props.initialSteps.length < 1) {
    steps.value = [
      {
        rank: 1,
        title: '',
      },
    ];
    return;
  }
  steps.value = props.initialSteps;
});
</script>

<template>
  <div class="steps-editor">
    <h2>Steps</h2>
    <div v-for="(s, idx) in steps" class="prep-step" :key="idx">
      <div class="reorder">
        <ion-icon name="reorder-four"></ion-icon>
      </div>
      <h4>1.</h4>
      <TextInputField
        id="ingredient"
        :initialValue="s.title"
        placeholder="Insert a description for the preparation step"
        @changed="(title) => updateTitle(title, idx)"
        width="90%"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.steps-editor {
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
