import ServerRequest from 'server/utils/server-request';
import { GetCurrentPolicyDetails_URL } from 'shared/constants/constants';
const getCurrentPolicyDetails = () =>
  ServerRequest(`${GetCurrentPolicyDetails_URL}`, 'POST', '', '', '', false);
export { getCurrentPolicyDetails };
