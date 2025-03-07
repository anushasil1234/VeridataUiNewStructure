import ServerRequest from "server/utils/server-request";
import { GetUnderProcessFileData_URL } from "shared/constants/constants";

const getProessingDataList = (payLoad) => 
    ServerRequest(GetUnderProcessFileData_URL, "POST", payLoad, null, true);

export { getProessingDataList };
