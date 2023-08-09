import { ActionContext, Store } from 'vuex';

enum NotificationActions {
  PushNotification = 'pushNotification',
  RemoveNotification = 'removeNotification',
}

export default {
  namespaced: true,
  state: {
    notifications: [],
    notificationCounter: 0,
  },
  getters: {
    notifications: (state: Store.State) => state.notifications,
  },
  mutations: {
    [NotificationActions.PushNotification]: (
      state: Store.State,
      notification: Store.Notification
    ) => {
      state.notificationCounter++;
      const newNotification = {
        id: state.notificationCounter,
        headline: notification.headline,
        body: notification.body,
        type: notification.type,
      };
      state.notifications.push(newNotification);
    },
    [NotificationActions.RemoveNotification]: (
      state: Store.State,
      notificationId: number
    ) => {
      state.notifications = state.notifications.filter(
        (notification: Store.Notification) => notification.id !== notificationId
      );
    },
  },
  actions: {
    [NotificationActions.PushNotification]: (
      context: ActionContext<Store.State, Store.State>,
      notification: Store.Notification
    ) => context.commit(NotificationActions.PushNotification, notification),
    [NotificationActions.RemoveNotification]: (
      context: ActionContext<Store.State, Store.State>,
      notificationId: number
    ) => context.commit(NotificationActions.RemoveNotification, notificationId),
  },
};
