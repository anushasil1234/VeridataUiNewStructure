import { getLocalStorageItem } from '..';
export const AuthHeader = () => {
  const userDetails = getLocalStorageItem('app-user');
  const tokenDetails = getLocalStorageItem('app-token');
  return tokenDetails && tokenDetails.token
    ? 
      { Authorization: 'Bearer ' + tokenDetails.token }
    : {};
};
