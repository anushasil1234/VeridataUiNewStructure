import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, DIS } from "shared/constants/constants";

const getDisabilityList = () => ServerRequest(`${GetMastarDropdowndata_URL}${DIS}`, "GET");

export { getDisabilityList };
