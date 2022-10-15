<template>
  <div class="login-view">
    <main class="main-content">
      <h2>{{ headline }}</h2>
      <section class="card">
        <form action="apply">
          <TextInput
            label="Email"
            :initialValue="email"
            :inputError="emailError"
            @on-input="updateEmail"
          />
          <TextInput
            label="Password"
            isPassword
            :initialValue="password"
            :inputError="passwordError"
            @on-input="updatePassword"
          />
          <TextInput
            v-if="isRegister"
            label="Confirm Password"
            isPassword
            :initialValue="confirmPassword"
            :inputError="confirmPasswordError"
            @on-input="updateConfirmPassword"
          />
          <div class="control">
            <button
              @click.prevent="apply"
              :class="buttonClass"
              :disabled="!isValid"
            >
              {{ headline }}
            </button>
          </div>
        </form>
      </section>
      <footer>
        <small>
          {{ forwardText }}
          <router-link @click="clearInputs" :to="{ name: nextRouteName }"
            >{{ nextRouteName }} here</router-link
          >
        </small>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed } from 'vue';
import { useStore } from 'vuex';
import TextInput from '@/components/TextInput.vue';
import ValidationService from '@/services/validation.service';
import { registerUser, loginUser } from '@/apis/weGoNice';
import { useRouter } from 'vue-router';

const props = defineProps<{
  isRegister: boolean;
}>();

const store = useStore();
const router = useRouter();

const headline = computed(() => (props.isRegister ? 'Register' : 'Login'));
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

// Routing
const nextRouteName = computed(() => (props.isRegister ? 'Login' : 'Register'));

// Input handling
const validationService = new ValidationService();
const emailError = ref<string>('');
const updateEmail = (newValue: string) => {
  email.value = newValue;
  emailError.value = validationService.validateEmail(email.value);
};

const passwordError = ref<string>('');
const updatePassword = (newValue: string) => {
  password.value = newValue;
  passwordError.value = validationService.validatePassword(password.value);
  confirmPasswordError.value =
    confirmPassword.value &&
    validationService.validateConfirmPassword(confirmPassword.value);
};

const confirmPasswordError = ref<string>('');
const updateConfirmPassword = (newValue: string) => {
  confirmPassword.value = newValue;
  confirmPasswordError.value = validationService.validateConfirmPassword(
    confirmPassword.value
  );
};

const clearInputs = () => {
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
};

// Error Handling
const isValid = computed(() => {
  const isEmailValid = !emailError.value && email.value !== '';
  const isPasswordValid = !passwordError.value && password.value !== '';
  const isConfirmPasswordValid =
    !confirmPasswordError.value && confirmPassword.value !== '';

  return props.isRegister
    ? isEmailValid && isPasswordValid && isConfirmPasswordValid
    : isEmailValid && isPasswordValid;
});

// Styling
const buttonClass = computed(() => ({ disabled: !isValid.value }));

// Content
const forwardText = computed(() =>
  props.isRegister ? 'Already have an account?' : 'Not registered yet?'
);

// Login/Register
const register = async (body: { email: string; password: string }) => {
  const { status, data } = await registerUser(body);
  if (status === 202 && data.sessionToken) {
    loginSuccess(data.id, data.sessionToken);
  }
};

const login = async (body: { email: string; password: string }) => {
  const { status, data } = await loginUser(body);
  if (status === 202 && data.sessionToken) {
    loginSuccess(data.id, data.sessionToken);
  }
};

const loginSuccess = (id: string, sessionToken: string) => {
  store.dispatch('auth/setUserId', id);
  store.dispatch('auth/setSessionToken', sessionToken);

  router.push({ name: 'Home' });
};

const apply = async () => {
  if (isValid.value) {
    const body = {
      email: email.value,
      password: password.value,
    };

    if (props.isRegister) {
      await register(body);
    } else {
      await login(body);
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';

.login-view {
  display: flex;
  justify-content: center;
  .main-content {
    padding: 1rem;
    background: #000;
    border-radius: 10px;
    width: 500px;

    .card {
      background: $bg-color;
      padding: 1rem;
      border-radius: 7px;

      form {
        display: flex;
        flex-direction: column;

        .control {
          display: flex;
          justify-content: flex-end;

          button {
            background: $accent-color;
            border: none;
            outline: none;
            border-radius: 3px;
            padding: 0.5rem 1rem;
            font-size: inherit;

            &.disabled {
              opacity: 0.5;
              color: #000;
            }

            &.disabled:hover {
              cursor: not-allowed;
            }

            &:hover:not(.disabled) {
              cursor: pointer;
              color: $accent-hover-color;
            }
          }
        }
      }
    }

    footer {
      padding: 0.5rem 0.5rem 0 0.3rem;
      display: flex;
      justify-content: flex-end;

      a {
        text-decoration: none;
        color: $accent-color;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
