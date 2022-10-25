import { useStore } from 'vuex';
import store from '../store';

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
