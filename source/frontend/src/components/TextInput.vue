<template>
  <div class="input">
    <label :for="label"
      ><div>{{ label }}</div>
      <small v-if="inputError">Error</small></label
    >
    <input :id="label" :type="isPassword ? 'password' : 'text'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginView',
  props: {
    label: {
      type: String,
      required: true,
    },
    isPassword: {
      type: Boolean,
      required: false,
      default: false,
    },
    inputError: {
      type: String,
      required: false,
      default: '',
    },
  },
});
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.input {
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;

  input {
    // border-radius: 3px;
    box-shadow: none;
    border: none;
    border-bottom: 1px solid #fff;
    outline: none;
    background: $card-bg-color;
    // outline: 2px solid #333;
    margin: 0.5rem 0;
    padding: 0.5rem;
    transition: outline 0.2s;
    color: white;

    &:focus {
      border-bottom: 1px solid $accent-color;
    }
  }

  &.active {
    color: red;
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;

    small {
      display: block;
      margin-right: 0.5rem;
    }
  }
}
</style>
