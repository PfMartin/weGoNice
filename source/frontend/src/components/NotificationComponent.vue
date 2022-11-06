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
import { defineProps } from 'vue';
import { useStore } from 'vuex';

const props = defineProps<{
  config: Store.Notification;
}>();

const store = useStore();
const closeNotification = (): void => {
  store.dispatch('notifications/removeNotification', props.config.id);
};
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.notification {
  position: relative;
  background: $bg-color-notification;
  border: 1px solid $border-color-notification;
  border-radius: $border-radius;
  color: $text-color;
  padding: 0.5rem;
  max-width: 400px;
  margin-top: 0.5rem;

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
