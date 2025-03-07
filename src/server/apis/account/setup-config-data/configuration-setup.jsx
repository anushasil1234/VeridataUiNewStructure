import ServerRequest from "server/utils/server-request";
import { configurationSuccessMsg, PostSetupConfigData_URL } from "shared/constants/constants";

const configerationSetUp = (payLoad) => 
    ServerRequest(PostSetupConfigData_URL, "POST", payLoad, configurationSuccessMsg, true);

export { configerationSetUp };
