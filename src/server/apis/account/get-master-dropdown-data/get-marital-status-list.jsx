import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, MAR } from "shared/constants/constants";

const getMaritalStatusList = () => ServerRequest(`${GetMastarDropdowndata_URL}${MAR}`, "GET", "", "", "", false);

export { getMaritalStatusList };
