import ServerRequest from "server/utils/server-request";
import { downloadProcessingList_URL } from "shared/constants/constants";

const GetUnderProcessReport = (payLoad) => 
    ServerRequest(downloadProcessingList_URL, "POST", payLoad, null, true);

export { GetUnderProcessReport };
