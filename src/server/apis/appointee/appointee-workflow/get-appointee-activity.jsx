import ServerRequest from "server/utils/server-request";
import { GetAppointeeActivity_URL } from "shared/constants/constants";

const getAppointeeActivity = (appointeeId) => ServerRequest(`${GetAppointeeActivity_URL}${appointeeId}`, "GET");

export { getAppointeeActivity };
