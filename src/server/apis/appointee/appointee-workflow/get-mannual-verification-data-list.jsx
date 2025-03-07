import ServerRequest from "server/utils/server-request";
import { GetMannualVerificationData_URL } from "shared/constants/constants";

const getMannualVerificationDataList = (payLoad) => 
    ServerRequest(GetMannualVerificationData_URL, "POST", payLoad, null, true);

export { getMannualVerificationDataList };
