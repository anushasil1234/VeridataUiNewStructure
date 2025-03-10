import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, CON } from "shared/constants/constants";

const getCountryList = () => ServerRequest(`${GetMastarDropdowndata_URL}${CON}`, "GET", "", "", "", false);

export { getCountryList };
