declare namespace Store {
  interface Notification {
    id?: number;
    headline: string;
    body: string;
  }

  interface State {
    sessionToken: string;
    userId: string;
    notifications: Notification[];
  }
}
