<template>
  <div class="notification">
    <div @click="closeNotification" class="close-button">
      <ion-icon name="close" />
    </div>
    <header><h4>Success</h4></header>
    <div class="body">
      New author with name 'Nico Rittenau' has been created
    </div>
  </div>
</template>

<script setup lang="ts">
const closeNotification = (): void => {
  console.log('close');
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.notification {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: $bg-color-notification;
  border: 1px solid $border-color-notification;
  border-radius: $border-radius;
  color: $text-color;
  padding: 0.5rem;
  max-width: 400px;

  .close-button {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    transition: color 0.2s;

    &:hover {
      cursor: pointer;
      color: $accent-color;
    }
  }

  h4 {
    padding: 0;
    margin: 0.3rem 0;
  }
}
</style>
