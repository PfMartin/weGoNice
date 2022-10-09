import { useStore } from 'vuex';

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const token = useStore().getters.sessionToken;
  try {
    const { exp } = parseJwt(token);

    return Date.now() >= exp * 1000 * 60 * 30;
  } catch {
    return true;
  }
};
