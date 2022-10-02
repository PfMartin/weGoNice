<template>
  <div class="login-view">
    <main class="main-content">
      <h2>{{ headline }}</h2>
      <section class="card">
        <form action="apply">
          <TextInput
            label="Email"
            :inputError="emailError"
            @on-input="updateEmail"
          />
          <TextInput
            label="Password"
            isPassword
            :inputError="passwordError"
            @on-input="updatePassword"
          />
          <TextInput
            v-if="isRegister"
            label="Confirm Password"
            isPassword
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
          Not registered yet?
          <router-link :to="{ name: nextRouteName }"
            >{{ nextRouteName }} here</router-link
          >
        </small>
      </footer>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import TextInput from '@/components/TextInput.vue';
import ValidationService from '@/services/validation.service';

export default defineComponent({
  name: 'LoginView',
  components: {
    TextInput,
  },
  props: {
    isRegister: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const store = useStore();
    console.log('Authenticated: ' + store.getters.isAuthenticated);
    console.log('isRegister: ' + props.isRegister);

    const headline = computed(() => (props.isRegister ? 'Register' : 'Login'));
    const email = ref<string>('');
    const password = ref<string>('');
    const confirmPassword = ref<string>('');

    // Routing
    const nextRouteName = computed(() =>
      props.isRegister ? 'Login' : 'Register'
    );

    // Login/Register
    const apply = () => {
      const body = {
        email: email.value,
        password: password.value,
      };

      console.log(body);
    };

    // Input
    const updateEmail = (newValue: string) => {
      email.value = newValue;
    };
    const updatePassword = (newValue: string) => {
      password.value = newValue;
    };
    const updateConfirmPassword = (newValue: string) => {
      confirmPassword.value = newValue;
    };

    // Error Handling
    const emailError = ref<string>('');
    const passwordError = ref<string>('');
    const confirmPasswordError = ref<string>('');
    const isValid = computed(
      () =>
        !emailError.value && !passwordError.value && !confirmPasswordError.value
    );
    const validationService = new ValidationService();

    // Styling
    const buttonClass = computed(() => ({ disabled: !isValid.value }));

    return {
      headline,
      email,
      password,
      confirmPassword,
      nextRouteName,

      updateEmail,
      updatePassword,
      updateConfirmPassword,

      apply,

      emailError,
      passwordError,
      confirmPasswordError,
      isValid,

      buttonClass,
    };
  },
});
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
      background: $card-bg-color;
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
              opacity: 0.8;
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
