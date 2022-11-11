<template>
  <div class="dropdown-input">
    <label for="dropdown"
      ><div class="label-text">
        <ion-icon name="list" /> &nbsp; <span>Sort By</span>
      </div>
    </label>
    <div id="dropdown" class="dropdown">
      <div class="selected">
        <span class="selected-item">None</span>
        <ion-icon name="chevron-down" />
      </div>
      <ul class="dropdown-content">
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
        <li>Option 4</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@import '../styles/outline.scss';
@import '../styles/colors.scss';

.dropdown-input {
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
      color: $bg-color-light;
      min-width: 300px;

      padding: 0.5rem;
      border-radius: $border-radius;

      ion-icon {
        color: $text-color;
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

      li {
        padding: 0.5rem 1rem;
        transition: all 0.1s;

        &:hover {
          background-color: $accent-color;
          color: $bg-color-mid;
          border-radius: $border-radius;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
