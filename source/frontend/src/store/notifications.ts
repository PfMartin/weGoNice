import { ActionContext, Store } from 'vuex';

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  getters: {
    notifications: (state: Store.State) => {
      return state.notifications;
    },
  },
  mutations: {
    pushNotification: (
      state: Store.State,
      notification: Store.Notification
    ) => {
      const lastNotification =
        state.notifications[state.notifications.length - 1];

      const newNotification = {
        id: lastNotification?.id ? lastNotification.id + 1 : 1,
        headline: notification.headline,
        body: notification.body,
      };
      state.notifications.push(newNotification);
    },
    popNotification: (state: Store.State) => {
      state.notifications.shift();
    },
    removeNotification: (state: Store.State, notificationId: number) => {
      state.notifications = state.notifications.filter(
        (notification: Store.Notification) => notification.id !== notificationId
      );
    },
  },
  actions: {
    pushNotification: (
      context: ActionContext<Store.State, Store.State>,
      notification: Store.Notification
    ) => {
      context.commit('pushNotification', notification);
    },
    popNotification: (context: ActionContext<Store.State, Store.State>) => {
      context.commit('popNotification');
    },
    removeNotification: (
      context: ActionContext<Store.State, Store.State>,
      notificationId: number
    ) => {
      context.commit('removeNotification', notificationId);
    },
  },
};
