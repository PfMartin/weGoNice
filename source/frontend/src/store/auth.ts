import { ActionContext } from 'vuex';

interface State {
  sessionToken: string;
  userId: string;
}

export default {
  namespaced: true,
  state: {
    sessionToken: '',
    userId: '',
  },
  getters: {
    sessionToken: (state: State) => {
      return state.sessionToken;
    },
    userId: (state: State) => {
      return state.userId;
    },
  },
  mutations: {
    setSessionToken: (state: State, token: string) => {
      state.sessionToken = token;
    },
    setUserId: (state: State, id: string) => {
      state.userId = id;
    },
  },
  actions: {
    setSessionToken: (context: ActionContext<State, State>, token: string) => {
      context.commit('setSessionToken', token);
    },
    setUserId: (context: ActionContext<State, State>, id: string) => {
      context.commit('setUserId', id);
    },
  },
};
