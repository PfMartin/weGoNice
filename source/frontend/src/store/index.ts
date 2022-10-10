import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from '@/store/auth';

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    auth,
  },
});
