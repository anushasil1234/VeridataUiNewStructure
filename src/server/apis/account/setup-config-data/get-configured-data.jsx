import ServerRequest from "server/utils/server-request";
import { GetSetupConfigData_URL } from "shared/constants/constants";

const getConfigedData = () => ServerRequest(GetSetupConfigData_URL, "GET", null, null, true);

export { getConfigedData };
