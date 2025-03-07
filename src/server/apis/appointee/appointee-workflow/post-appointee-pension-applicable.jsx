import ServerRequest from "server/utils/server-request";
import { appointeePensionUpdateSuccess, PostAppointeePensionAvailable_URL } from "shared/constants/constants";

const postAppointeePensionApplicable = (payLoad) => 
    ServerRequest(PostAppointeePensionAvailable_URL, "POST", payLoad, appointeePensionUpdateSuccess, true);

export { postAppointeePensionApplicable };
