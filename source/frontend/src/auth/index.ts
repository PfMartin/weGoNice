import store from '../store';
import router from '../router';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const token = store.getters['auth/sessionToken'];
  try {
    const { exp } = parseJwt(token);

    const second = 1000;
    const minute = second * 60;

    const refreshLimit = exp * second - 10 * minute;

    return Date.now() >= refreshLimit;
  } catch {
    return true;
  }
};

export const isAuthenticated = (): boolean => {
  return !!store.getters['auth/sessionToken'] && !isTokenExpired();
};

export const loginSuccess = (id: string, sessionToken: string) => {
  store.dispatch('auth/setUserId', id);
  store.dispatch('auth/setSessionToken', sessionToken);

  router.push({ name: 'Home' });
};
