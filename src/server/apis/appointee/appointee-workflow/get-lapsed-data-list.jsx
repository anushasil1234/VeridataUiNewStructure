import ServerRequest from "server/utils/server-request";
import { GetExpiredProcessFileData_URL } from "shared/constants/constants";

const getLapsedDataList = (payLoad) => 
    ServerRequest(GetExpiredProcessFileData_URL, "POST", payLoad, null, true);

export { getLapsedDataList };
