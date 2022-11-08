import { Store } from 'vuex';
import store from '@/store';

class NotificationService {
  public addNotification = (
    type: 'success' | 'error' | 'warning',
    body: string
  ) => {
    let headline: string;
    switch (type) {
      case 'success':
        headline = 'Success!';
        break;
      case 'error':
        headline = 'Error!';
        break;
      default:
        headline = 'Warning!';
    }

    store.dispatch('notifications/pushNotification', {
      headline,
      body,
    });
  };

  public removeNotification = (id: number | undefined) => {
    if (id) {
      store.dispatch('notifications/removeNotification', id);
    }
  };
}

export default new NotificationService();
