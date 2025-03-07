import ServerRequest from "server/utils/server-request";
import { GetAppointeeDetails_URL } from "shared/constants/constants";

const getAppointeeDetails = (appointeeId) => ServerRequest(`${GetAppointeeDetails_URL}${appointeeId}`, "GET");

export { getAppointeeDetails };
