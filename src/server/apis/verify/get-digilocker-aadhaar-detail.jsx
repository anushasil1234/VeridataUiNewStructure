import ServerRequest from "server/utils/server-request";
import { GetDigilockerAadhaarDetails_URL } from "shared/constants/constants";

const GetDigilockerAadhaarData = (payLoad) => ServerRequest(GetDigilockerAadhaarDetails_URL, "POST", payLoad, null, true);

export { GetDigilockerAadhaarData };