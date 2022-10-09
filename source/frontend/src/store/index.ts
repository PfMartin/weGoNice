import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

export default createStore({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    isAuthenticated: false,
    sessionToken: '',
    userId: '',
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
    sessionToken: (state) => {
      return state.sessionToken;
    },
    userId: (state) => {
      return state.userId;
    },
  },
  mutations: {
    setIsAuthenticated: (state, value) => {
      state.isAuthenticated = value;
    },
    setSessionToken: (state, token) => {
      state.sessionToken = token;
    },
    setUserId: (state, id) => {
      state.userId = id;
    },
  },
  actions: {
    setIsAuthenticated: (context, value) => {
      context.commit('setIsAuthenticated', value);
    },
    setSessionToken: (context, token) => {
      context.commit('setSessionToken', token);
    },
    setUserId: (context, id) => {
      context.commit('setUserId', id);
    },
  },
  modules: {},
});
