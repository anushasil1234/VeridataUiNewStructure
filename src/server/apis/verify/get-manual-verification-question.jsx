import ServerRequest from 'server/utils/server-request';
import { GetManualVerificationQuestion_URL } from 'shared/constants/constants';
const GetManualVerificationQuestion = (verificationType) => ServerRequest(`${GetManualVerificationQuestion_URL}${verificationType}`, 'POST');
export { GetManualVerificationQuestion };
