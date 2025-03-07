import ServerRequest from "server/utils/server-request";
import { GetTotalWidgetData_URL } from "shared/constants/constants";

const getTotalWidgetData = () => ServerRequest(GetTotalWidgetData_URL, "GET", null, null, true);

export { getTotalWidgetData };
