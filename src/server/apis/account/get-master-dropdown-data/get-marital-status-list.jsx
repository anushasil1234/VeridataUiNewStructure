import ServerRequest from "server/utils/server-request";
import { GetMaritalStatusDropdowndata_URL, GetMastarDropdowndata_URL, MAR } from "shared/constants/constants";

const getMaritalStatusList = () => ServerRequest(`${GetMaritalStatusDropdowndata_URL}`, "POST", "", "", "", false);

export { getMaritalStatusList };
