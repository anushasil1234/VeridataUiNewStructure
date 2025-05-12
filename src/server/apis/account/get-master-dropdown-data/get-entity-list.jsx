import ServerRequest from 'server/utils/server-request';
import { GetEntiyDropdowndata_URL } from 'shared/constants/constants';
const getEntityList = () => ServerRequest(`${GetEntiyDropdowndata_URL}`, 'POST', '', '', '', false);
export { getEntityList };
