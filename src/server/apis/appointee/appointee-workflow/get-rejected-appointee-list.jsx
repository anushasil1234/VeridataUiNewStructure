import ServerRequest from "server/utils/server-request";
import { GetRejectedFileData_URL } from "shared/constants/constants";

const getRejectedAppointeeList = (payLoad) => ServerRequest(GetRejectedFileData_URL, "POST", payLoad, null, true);

export { getRejectedAppointeeList };
