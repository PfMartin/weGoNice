import { ActionContext } from 'vuex';

export default {
  namespaced: true,
  state: {
    sessionToken: '',
    userId: '',
  },
  getters: {
    sessionToken: (state: Store.State) => {
      return state.sessionToken;
    },
    userId: (state: Store.State) => {
      return state.userId;
    },
  },
  mutations: {
    setSessionToken: (state: Store.State, token: string) => {
      state.sessionToken = token;
    },
    setUserId: (state: Store.State, id: string) => {
      state.userId = id;
    },
  },
  actions: {
    setSessionToken: (
      context: ActionContext<Store.State, Store.State>,
      token: string
    ) => {
      context.commit('setSessionToken', token);
    },
    setUserId: (
      context: ActionContext<Store.State, Store.State>,
      id: string
    ) => {
      context.commit('setUserId', id);
    },
  },
};
