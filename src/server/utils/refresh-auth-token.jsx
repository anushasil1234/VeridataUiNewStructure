import axios from 'axios';
import generateApiSecretHeader from './generate-apisecret-header';
import { getLocalStorageItem } from 'shared/utils';
const refreshAuthToken = async () => {
  const { apiSecretHeader } = generateApiSecretHeader();
  const tokenDetails = getLocalStorageItem('pfc-token');
  const BASE_URL = `http://192.168.1.116:85`;
  return axios.post(
    `${BASE_URL}/GenerateRefreshToken`,
    {
      token: tokenDetails.token,
      refreshToken: tokenDetails.refreshToken,
    },
    apiSecretHeader,
  );
};
export default refreshAuthToken;
