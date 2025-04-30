import { getLocalStorageItem, removeLocalStorageItems, setLocalStorageItem } from 'shared/utils';
import refreshAuthToken from './refresh-auth-token';
import isAdmin from 'shared/utils/associate/check-is-admin';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import handleOtherErrors from './handle-other-error';
import { removeLoggedinTokenData } from 'store/slices/login-token-slice';
import { removeLoggedinData } from 'store/slices/login-slice';
import handleClickOnLogout from './handle-logout';
const setupAxiosInterceptors = (api) => {
  const userDetails = getLocalStorageItem('app-user');
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          if (isAdmin()) {
            const tokenResponse = await refreshAuthToken();
            if (tokenResponse.status === 200) {
              const newTokenDetails = tokenResponse.data.responseInfo;
              setLocalStorageItem('app-token', newTokenDetails);
              originalRequest.headers['Authorization'] = `Bearer ${newTokenDetails.token}`;
              return api(originalRequest);
            }
          } else {
            handleClickOnLogout();
            showErrorMessage('Your session has expired. Please login again.');
          }
        } catch (e) {
          console.log('An error occurred', e);
          handleClickOnLogout();
          showErrorMessage('Your session has expired. Please login again.');
        }
      } else {
        console.log('error23', error);
        handleOtherErrors(error);
      }
      return Promise.reject(error);
    },
  );
};
export default setupAxiosInterceptors;
