<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { loginUser } from '@/apis/weGoNice/auth';
import { loginSuccess } from '@/auth';

const login = async (body: { email: string; password: string }) => {
  const { status, data } = await loginUser(body);
  if (status === 202 && data.sessionToken) {
    loginSuccess(data.id, data.sessionToken);
  } else {
    console.error(data);
  }
};
</script>

<template>
  <div class="login-view">
    <LoginForm :isRegister="false" @on-apply="login" />
  </div>
</template>

<style scoped lang="scss"></style>
