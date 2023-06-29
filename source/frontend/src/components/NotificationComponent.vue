<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import NotificationService from '@/services/notification.service';

const props = defineProps<{
  config: Store.Notification;
}>();

const isVisible = ref(true);

const iconName = computed((): string => {
  let name = '';

  switch (props.config.type) {
    case 'success':
      name = 'checkmark-done';
      break;
    case 'error':
      name = 'alert-circle';
      break;
    default:
      name = 'warning';
  }

  return name;
});

const notificationClass = computed(() => ['notification', props.config.type]);

const closeNotification = (): void => {
  isVisible.value = false;
  setTimeout(() => {
    NotificationService.removeNotification(props.config.id);
  }, 200);
};

onMounted((): void => {
  setTimeout(() => {
    closeNotification();
  }, 5000);
});
</script>

<template>
  <Transition name="slide" appear>
    <div :class="notificationClass" v-if="isVisible">
      <div @click="closeNotification" class="close-button">
        <ion-icon name="close" />
      </div>
      <header>
        <h4><ion-icon :name="iconName" /> &nbsp;{{ config.headline }}</h4>
      </header>
      <div class="body">
        {{ config.body }}
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@import '@/styles/colors.scss';
@import '@/styles/outline.scss';

.notification {
  position: relative;
  border: 1px solid $bg-color-mid;
  border-radius: $border-radius;
  padding: 0.5rem 1rem;
  max-width: 400px;
  margin-top: 0.5rem;
  color: $bg-color-mid;
  font-size: 1rem;

  &.error {
    background: rgba($error-color, 0.8);
    color: $text-color;
  }

  &.warning {
    background: rgba($warning-color, 0.8);
  }

  &.success {
    background: rgba($accent-color, 0.8);
  }

  .close-button {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    transition: color 0.2s;
    color: $bg-color-mid;

    &:hover {
      cursor: pointer;
      color: $bg-color-dark;
    }
  }

  h4 {
    padding: 0;
    margin: 0.3rem 0;
    display: flex;
    align-items: center;
  }
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100vw);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
}
</style>
