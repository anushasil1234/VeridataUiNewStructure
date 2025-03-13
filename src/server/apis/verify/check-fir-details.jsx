import ServerRequest from "server/utils/server-request";
import { CheckFIRDetails_URL } from "shared/constants/constants";

const checkFIRDetails = (payLoad) => ServerRequest(CheckFIRDetails_URL, "POST", payLoad);

export { checkFIRDetails };