<template>
  <div class="register-view">
    <LoginForm :isRegister="true" @on-apply="register" />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { registerUser } from '@/apis/weGoNice/auth';
import { loginSuccess } from '@/auth';

const register = async (body: { email: string; password: string }) => {
  const { status, data } = await registerUser(body);
  if (status === 202 && data.sessionToken) {
    loginSuccess(data.id, data.sessionToken);
  } else {
    console.error(data);
  }
};
</script>
<style scoped lang="scss"></style>
