import { ActionContext } from 'vuex';

enum AuthActions {
  SetSessionToken = 'setSessionToken',
  SetUserId = 'setUserId',
}

export default {
  namespaced: true,
  state: {
    sessionToken: '',
    userId: '',
  },
  getters: {
    sessionToken: (state: Store.State) => state.sessionToken,
    userId: (state: Store.State) => state.userId,
  },
  mutations: {
    [AuthActions.SetSessionToken]: (state: Store.State, token: string) => {
      state.sessionToken = token;
    },
    [AuthActions.SetUserId]: (state: Store.State, id: string) => {
      state.userId = id;
    },
  },
  actions: {
    [AuthActions.SetSessionToken]: (
      context: ActionContext<Store.State, Store.State>,
      token: string
    ) => context.commit(AuthActions.SetSessionToken, token),
    [AuthActions.SetUserId]: (
      context: ActionContext<Store.State, Store.State>,
      id: string
    ) => context.commit(AuthActions.SetUserId, id),
  },
};
