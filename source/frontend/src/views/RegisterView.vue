<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { registerUser } from '@/apis/weGoNice/auth';
import { loginSuccess } from '@/auth';
import NotificationService from '@/services/notification.service';

const register = async (body: { email: string; password: string }) => {
  const { status, data } = await registerUser(body);
  if (status === 202 && data.sessionToken) {
    loginSuccess(data.id, data.sessionToken);
  } else {
    NotificationService.addNotification(
      'error',
      `Something went wrong while trying to register: Status ${status}`
    );
  }
};
</script>

<template>
  <div class="register-view">
    <LoginForm :isRegister="true" @on-apply="register" />
  </div>
</template>

<style scoped lang="scss"></style>
