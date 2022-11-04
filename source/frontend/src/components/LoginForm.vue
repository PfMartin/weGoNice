<template>
  <div class="login-form">
    <main class="main-content">
      <h2>{{ headline }}</h2>
      <div class="card">
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
            <button @click.prevent="apply">
              {{ headline }}
            </button>
          </div>
        </form>
      </div>
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
import { defineProps, ref, computed, defineEmits } from 'vue';
import TextInput from '@/components/TextInput.vue';
import ValidationService from '@/services/validation.service';

interface LoginBody {
  email: string;
  password: string;
}

const props = defineProps<{
  isRegister: boolean;
}>();

const emit = defineEmits<{
  (e: 'on-apply', value: LoginBody): void;
}>();

const headline = computed(() => (props.isRegister ? 'Register' : 'Login'));
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isFirstTry = ref(true);

// Routing
const nextRouteName = computed(() => (props.isRegister ? 'Login' : 'Register'));

// Input handling
const validationService = new ValidationService();
const emailError = ref('');
const updateEmail = (newValue: string): void => {
  email.value = newValue;
  if (!isFirstTry.value) {
    validateEmail();
  }
};
const validateEmail = (): void => {
  emailError.value = validationService.validateEmail(email.value);
};

const passwordError = ref('');
const updatePassword = (newValue: string): void => {
  password.value = newValue;
  if (!isFirstTry.value) {
    validatePassword();
  }
};
const validatePassword = (): void => {
  passwordError.value = validationService.validatePassword(
    password.value,
    props.isRegister
  );
};

const confirmPasswordError = ref('');
const updateConfirmPassword = (newValue: string): void => {
  confirmPassword.value = newValue;
  confirmPasswordError.value = '';
};
const validateConfirmPassword = (): void => {
  confirmPasswordError.value = validationService.validateConfirmPassword(
    confirmPassword.value
  );
};

const clearInputs = (): void => {
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
};

// Error Handling
const isValid = computed(() => {
  validateEmail();
  validatePassword();
  validateConfirmPassword();

  const isEmailValid = !emailError.value;
  const isPasswordValid = !passwordError.value;
  const isConfirmPasswordValid = !confirmPasswordError.value;

  return props.isRegister
    ? isEmailValid && isPasswordValid && isConfirmPasswordValid
    : isEmailValid && isPasswordValid;
});

// Content
const forwardText = computed(() =>
  props.isRegister ? 'Already have an account?' : 'Not registered yet?'
);

const apply = () => {
  isFirstTry.value = false;

  if (isValid.value) {
    const body = {
      email: email.value,
      password: password.value,
    };

    emit('on-apply', body);
  }
};
</script>

<style scoped lang="scss">
@import '../styles/colors.scss';
@import '../styles/outline.scss';

.login-form {
  display: flex;
  justify-content: center;

  .image {
    max-height: 100vh;
  }
  .main-content {
    margin: 5rem;
    padding: 1rem;
    background: $bg-color-dark;
    width: 500px;
    color: $text-color;
    border-radius: $border-radius;

    .card {
      background: $bg-color-mid;
      padding: 1rem;
      border-radius: $border-radius;

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
            transition: background-color 0.2s;

            &:hover {
              cursor: pointer;
              background: $accent-hover-color;
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
