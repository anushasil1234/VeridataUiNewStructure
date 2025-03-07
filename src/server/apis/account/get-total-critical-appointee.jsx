import ServerRequest from "server/utils/server-request";
import { GetTotalCriticalAppointee_URL } from "shared/constants/constants";

const getTotalCriticalAppointee = () => ServerRequest(GetTotalCriticalAppointee_URL, "GET", null, null, true);

export { getTotalCriticalAppointee };
