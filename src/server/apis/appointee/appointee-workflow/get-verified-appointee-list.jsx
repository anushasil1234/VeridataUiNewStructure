import ServerRequest from "server/utils/server-request";
import { GetProcessedEPFOData_URL } from "shared/constants/constants";

const getVerifiedAppointeeList = (payLoad) => ServerRequest(GetProcessedEPFOData_URL, "POST", payLoad, null, true);

export { getVerifiedAppointeeList };
