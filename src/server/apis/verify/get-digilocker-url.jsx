import ServerRequest from "server/utils/server-request";
import { GetDigilocker_URL } from "shared/constants/constants";

const GetDigilockerUrl = (payLoad) => ServerRequest(GetDigilocker_URL, "POST", payLoad, null, true);

export { GetDigilockerUrl };