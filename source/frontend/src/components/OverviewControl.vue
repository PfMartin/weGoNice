<script setup lang="ts">
import DropdownInput from '@/components/DropdownInput.vue';
import { SortDirections } from '@/utils/constants';
import { computed } from 'vue';

const props = defineProps<{
  sortingOptions: string[];
  selectedOption: string;
  sortingDirection: SortDirections;
}>();

const emit = defineEmits<{
  (e: 'set-sorting-key', key: string): void;
  (e: 'toggle-sorting-direction'): void;
}>();

const sortDirectionIcon = computed((): string =>
  props.sortingDirection === SortDirections.ASC ? 'arrow-down' : 'arrow-up'
);
</script>

<template>
  <div class="overview-control">
    <div class="controls">
      <div class="sorting">
        <div class="dropdown-container">
          <DropdownInput
            :options="sortingOptions"
            :selectedOption="selectedOption"
            @select-option="(key) => emit('set-sorting-key', key)"
            id="recipeSortBy"
            label="Sort By"
            iconName="list"
            width="300px"
          />
        </div>
        <span @click="emit('toggle-sorting-direction')" class="sort-direction"
          ><ion-icon :name="sortDirectionIcon"
        /></span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
.overview-control {
  padding: 0 1rem;
  h1 {
    padding: 0;
    margin: 0;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    .sorting {
      display: flex;
      margin-right: 1rem;
      .sort-direction {
        margin-left: 0.2rem;
        font-size: 1.5rem;
        color: $bg-color-mid;
        display: flex;
        align-items: center;

        &:hover {
          cursor: pointer;
          color: $bg-color-dark;
        }
      }
    }

    .filter-switches {
      display: flex;
      gap: 0.5rem;
    }
  }
}
</style>
