import ServerRequest from "server/utils/server-request";
import { GetUnProcessedFileData_URL } from "shared/constants/constants";

const getLinkNotSentList = (payLoad) => 
    ServerRequest(GetUnProcessedFileData_URL, "POST", payLoad, null, true);

export { getLinkNotSentList };
