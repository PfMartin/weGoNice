<template>
  <Transition name="slide" appear>
    <div class="notification" v-if="isVisible">
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

<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import NotificationService from '@/services/notification.service';
import { computed } from '@vue/reactivity';

const props = defineProps<{
  config: Store.Notification;
}>();

onMounted((): void => {
  setTimeout(() => {
    closeNotification();
  }, 5000);
});

const isVisible = ref(true);

const iconName = computed((): string => {
  let name = '';

  switch (props.config.headline) {
    case 'Success!':
      name = 'checkmark-done';
      break;
    case 'Error!':
      name = 'alert-circle';
      break;
    default:
      name = 'warning';
  }

  return name;
});

const closeNotification = (): void => {
  isVisible.value = false;
  setTimeout(() => {
    NotificationService.removeNotification(props.config.id);
  }, 200);
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
  padding: 0.5rem 1rem;
  max-width: 400px;
  margin-top: 0.5rem;
  font-size: 1rem;

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
