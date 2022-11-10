<template>
  <div class="notifications">
    <NotificationComponent
      v-for="notification in notifications"
      :config="notification"
      :key="notification.id"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import NotificationComponent from '@/components/NotificationComponent.vue';

defineProps<{
  notifications: Store.Notification[];
}>();
</script>

<style lang="scss" scoped>
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.notifications {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 20;
}
</style>
