declare namespace Store {
  interface Notification {
    id?: number;
    headline: string;
    body: string;
    type: 'error' | 'warning' | 'success';
  }

  interface State {
    sessionToken: string;
    userId: string;
    notifications: Notification[];
    notificationCounter: number;
    searchInput: string;
  }
}
