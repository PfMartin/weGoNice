import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: false,
  },
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated;
    },
  },
  mutations: {
    setIsAuthenticated: (state, value) => {
      state.isAuthenticated = value;
    },
  },
  actions: {
    setIsAuthenticated: (context, value) => {
      context.commit('setIsAuthenticated', value);
    },
  },
  modules: {},
});
