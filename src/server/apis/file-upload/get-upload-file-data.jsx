import ServerRequest from 'server/utils/server-request';
import { getUploadFileData_URL } from 'shared/constants/constants';
const getUploadFileData = (appointeeId) =>
  ServerRequest(`${getUploadFileData_URL}${appointeeId}`, 'POST');
export { getUploadFileData };
