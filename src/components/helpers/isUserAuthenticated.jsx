import { getAccessToken } from './tokens';

export const isUserAuthenticated = () => {
  const accessToken = getAccessToken();
  if (!accessToken) return false;

  try {
    const { exp } = JSON.parse(atob(accessToken.split('.')[1]));
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (error) {
    return false;
  }

  return true;
};
