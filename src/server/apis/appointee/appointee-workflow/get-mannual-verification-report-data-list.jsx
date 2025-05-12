import ServerRequest from 'server/utils/server-request';
import { GetMannualVerificationDataReport_URL } from 'shared/constants/constants';
const getMannualVerificationReportDataList = (payLoad) =>
  ServerRequest(GetMannualVerificationDataReport_URL, 'POST', payLoad, null, true);
export { getMannualVerificationReportDataList };
