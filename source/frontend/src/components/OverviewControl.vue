<script setup lang="ts">
import DropdownInput from '@/components/DropdownInput.vue';
import { SortDirections } from '@/utils/constants';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps<{
  sortingKeys: string[];
  selectedSortingKey: string;
  sortingDirection: SortDirections;
}>();

const emit = defineEmits<{
  (e: 'set-sorting-key', key: string): void;
  (e: 'toggle-sorting-direction'): void;
}>();

const sortDirectionIcon = computed((): string =>
  props.sortingDirection === SortDirections.ASC ? 'arrow-down' : 'arrow-up'
);

const searchFilter = computed(() => store.getters['search/searchInput']);

const resetFilter = (): void => {
  store.dispatch('search/setSearchInput', '');
};
</script>

<template>
  <div class="overview-control">
    <div class="controls">
      <div class="sorting">
        <div class="dropdown-container">
          <DropdownInput
            :options="sortingKeys"
            :selectedOption="selectedSortingKey"
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
        <Transition name="fade">
          <div v-if="searchFilter" class="reset-filter" @click="resetFilter">
            <ion-icon name="funnel" /><span>Filter active</span>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';
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
      gap: 0.5rem;
      .sort-direction {
        background: $bg-color-mid;
        padding: 0.5rem;
        border-radius: $border-radius;
        font-size: 1.4rem;
        color: $text-color;
        display: flex;
        align-items: center;
        transition:
          color 0.2s,
          background-color 0.2s;

        &:hover {
          cursor: pointer;
          color: $accent-color;
          background-color: $bg-color-dark;
        }
      }
    }

    .reset-filter {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: $bg-color-mid;
      padding: 0.5rem;
      border-radius: $border-radius;
      color: $text-color;
      transition:
        color 0.2s,
        background-color 0.2s,
        opacity 0.2s ease-in;

      &:hover {
        background-color: $bg-color-dark;
        color: $accent-color;
        cursor: pointer;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
