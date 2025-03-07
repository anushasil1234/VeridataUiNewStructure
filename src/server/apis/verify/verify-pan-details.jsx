import ServerRequest from "server/utils/server-request";
import { VerifyPanDetails_URL } from "shared/constants/constants";

const verifyPANDetails = (payLoad) => ServerRequest(VerifyPanDetails_URL, "POST", payLoad);

export { verifyPANDetails };
