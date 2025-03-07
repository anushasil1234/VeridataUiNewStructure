import ServerRequest from "server/utils/server-request";
import { downloadLapsedList_URL } from "shared/constants/constants";

const GetLapsedDataReport = (payLoad) => 
    ServerRequest(downloadLapsedList_URL, "POST", payLoad, null, true);

export { GetLapsedDataReport };
