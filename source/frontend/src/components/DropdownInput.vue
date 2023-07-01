<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
const props = defineProps<{
  options: string[];
  selectedOption: string;
  iconName?: string;
  label: string;
  id: string;
  width: string;
}>();
const emit = defineEmits<{
  (e: 'select-option', option: string): void;
}>();

// Dropdown Content Visibility
const isDropdownVisible = ref(false);
const dropdown = ref<HTMLInputElement | null>(null);
const toggleDropdown = (): void => {
  isDropdownVisible.value = !isDropdownVisible.value;

  if (isDropdownVisible.value) {
    nextTick(() => {
      dropdown.value?.focus();
    });
  }
};
const collapseDropdown = (): void => {
  isDropdownVisible.value = false;
};

const selectedClass = computed(() => ({
  selected: true,
  active: isDropdownVisible.value,
}));

const widthStyle = computed(() => `width: ${props.width}`);

// Option selection
const selectOptions = computed((): string[] =>
  props.options.filter((option) => option !== props.selectedOption)
);
const selectOption = (option: string): void => {
  emit('select-option', option);
  collapseDropdown();
};
</script>

<template>
  <div class="dropdown-input" @blur="collapseDropdown" :ref="id" :tabindex="-1">
    <label :for="id" @click="toggleDropdown"
      ><div class="label-text">
        <ion-icon v-if="iconName" :name="iconName" /> &nbsp;
        <span>{{ label }}:</span>
      </div>
    </label>
    <div :id="id" class="dropdown">
      <div :class="selectedClass" :style="widthStyle" @click="toggleDropdown">
        <span class="selected-item">{{ selectedOption }}</span>
        <ion-icon name="chevron-down" />
      </div>
      <Transition name="expand">
        <ul v-if="isDropdownVisible" class="dropdown-content">
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

<style scoped lang="scss">
@import '@/styles/outline.scss';
@import '@/styles/colors.scss';

.dropdown-input {
  display: flex;

  &:focus {
    border: none;
    outline: none;
  }

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
      background: $bg-color-dark;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $text-color;
      padding: 0.5rem;
      border: 1px solid $bg-color-dark;
      border-radius: $border-radius;
      transition: all 0.2s;

      ion-icon {
        color: $text-color;
        transition: all 0.2s;
      }

      &:hover,
      &.active {
        cursor: pointer;
        background: $bg-color-mid;
        border-color: $accent-color;

        ion-icon {
          color: $accent-color;
        }
      }
      &.active {
        ion-icon {
          transform: rotate(180deg);
        }
      }
    }

    ul.dropdown-content {
      width: 100%;
      position: absolute;
      z-index: 5;
      top: 25px;
      list-style: none;
      text-decoration: none;
      padding: 0;
      background: $bg-color-mid;
      color: $text-color;
      border-radius: $border-radius;
      overflow: auto;
      max-height: 200px;

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
