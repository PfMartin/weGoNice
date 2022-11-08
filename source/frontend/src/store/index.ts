import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import auth from '@/store/auth';
import notifications from '@/store/notifications';

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  modules: {
    auth,
    notifications,
  },
});
