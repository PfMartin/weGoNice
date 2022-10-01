<template>
  <div class="login-view">
    <main class="main-content">
      <h2>{{ headline }}</h2>
      <section class="card">
        <form action="apply">
          <TextInput label="Email" :inputError="emailError" />
          <TextInput label="Password" isPassword :inputError="passwordError" />
          <TextInput
            v-if="isRegister"
            label="Confirm Password"
            isPassword
            :inputError="confirmPasswordError"
          />
          <div class="control">
            <button @click.prevent="">
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

    // Error Handling
    const emailError = ref<string>('error');
    const passwordError = ref<string>('error');
    const confirmPasswordError = ref<string>('error');

    return {
      headline,
      email,
      password,
      confirmPassword,
      nextRouteName,

      emailError,
      passwordError,
      confirmPasswordError,
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

            &:hover {
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
