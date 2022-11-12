<template>
  <div class="dropdown-input">
    <label for="dropdown" @click="toggleDropdown"
      ><div class="label-text">
        <ion-icon name="list" /> &nbsp; <span>Sort By</span>
      </div>
    </label>
    <div id="dropdown" class="dropdown">
      <div class="selected" @click="toggleDropdown">
        <span class="selected-item">{{ selectedOption }}</span>
        <ion-icon name="chevron-down" />
      </div>
      <Transition name="expand">
        <ul
          v-if="isDropdownVisible"
          class="dropdown-content"
          ref="dropdownContent"
          :tabindex="-1"
          @blur="toggleDropdown"
        >
          <li
            v-for="option in selectOptions"
            :key="option"
            @click="selectOption(option)"
          >
            {{ option }}
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
const props = defineProps<{
  options: string[];
  selectedOption: string;
}>();
const emit = defineEmits<{
  (e: 'select-option', option: string): void;
}>();

// Dropdown Content Visibility
const isDropdownVisible = ref(false);
const dropdownContent = ref<HTMLInputElement | null>(null);
const toggleDropdown = (): void => {
  isDropdownVisible.value = !isDropdownVisible.value;

  if (isDropdownVisible.value) {
    nextTick(() => {
      dropdownContent.value?.focus();
    });
  }
};

// Option selection
const selectOptions = computed((): string[] =>
  props.options.filter((option) => option !== props.selectedOption)
);
const selectOption = (option: string): void => {
  emit('select-option', option);
  isDropdownVisible.value = false;
};
</script>

<style scoped lang="scss">
@import '../styles/outline.scss';
@import '../styles/colors.scss';

.dropdown-input {
  display: flex;

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 0.5rem;

    .label-text {
      display: flex;
      align-items: center;
    }
  }

  .dropdown {
    position: relative;
    margin: 0.5rem 0;

    .selected {
      background: $bg-color-mid;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $text-color;
      min-width: 300px;
      padding: 0.5rem;
      border-radius: $border-radius;
      transition: background-color 0.2s;

      ion-icon {
        color: $text-color;
      }

      &:hover {
        cursor: pointer;
        background: $bg-color-dark;
      }
    }

    ul.dropdown-content {
      width: 100%;
      position: absolute;
      z-index: 5;
      top: 20px;
      list-style: none;
      text-decoration: none;
      padding: 0;
      background: $bg-color-mid;
      color: $text-color;
      border-radius: $border-radius;
      overflow: hidden;

      &:focus {
        border: none;
        outline: none;
      }

      li {
        padding: 0.5rem 1rem;

        &:hover {
          background-color: $bg-color-dark;
          color: $accent-color;
          border-radius: $border-radius;
          cursor: pointer;
        }
      }
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s;
  max-height: 200px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0px;
}
</style>
