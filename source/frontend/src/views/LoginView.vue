<template>
  <div class="login-view">
    <main class="main-content">
      <h2>Login</h2>
      <section class="card">
        <form action="apply">
          <div class="input">
            <label for="email">Email</label>
            <input id="email" v-model="email" />
          </div>
          <div class="input">
            <label for="password">Password</label>
            <input id="password" type="password" v-model="password" />
          </div>
        </form>
      </section>
      <footer>
        <small>
          Not registered yet? <router-link to="/about">Register</router-link>
        </small>
      </footer>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const store = useStore();
    console.log('LoginView: ' + store.getters.isAuthenticated);

    const email = ref<string>('');
    const password = ref<string>('password');

    return {
      email,
      password,
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
    border-radius: 5px;
    width: 500px;

    .card {
      background: $card-bg-color;
      padding: 1rem;
      border-radius: 5px;

      form {
        display: flex;
        flex-direction: column;

        .input {
          display: flex;
          flex-direction: column;

          input {
            border-radius: 3px;
            box-shadow: none;
            border: none;
            outline: 2px solid #333;
            margin: 0.5rem 0;
            padding: 0.5rem;

            &:focus {
              outline: 2px solid $accent-color;
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
      }
    }
  }
}
</style>
