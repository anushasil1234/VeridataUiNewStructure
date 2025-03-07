import ServerRequest from "server/utils/server-request";
import { ApiCounterReport_URL } from "shared/constants/constants";

const getApiCounterReport = (fromDate, toDate) => 
    ServerRequest(ApiCounterReport_URL(fromDate, toDate), "POST");

export { getApiCounterReport };
