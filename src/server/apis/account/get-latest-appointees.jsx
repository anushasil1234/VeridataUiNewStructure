import ServerRequest from "server/utils/server-request";
import { GetAppointeeStatusDetails_URL } from "shared/constants/constants";

const getLatestAppointees = (type) => ServerRequest(`${GetAppointeeStatusDetails_URL}${type}`, "GET", null, null, true);

export { getLatestAppointees };
