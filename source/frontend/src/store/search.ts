import { ActionContext } from 'vuex';

enum SearchActions {
  SetSearchInput = 'setSearchInput',
}

export default {
  namespaced: true,
  state: {
    searchInput: '',
  },
  getters: {
    searchInput: (state: Store.State) => state.searchInput,
  },
  mutations: {
    [SearchActions.SetSearchInput]: (state: Store.State, input: string) => {
      state.searchInput = input;
    },
  },
  actions: {
    [SearchActions.SetSearchInput]: (
      context: ActionContext<Store.State, Store.State>,
      input: string
    ) => context.commit(SearchActions.SetSearchInput, input),
  },
};
