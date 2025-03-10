import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, NAT } from "shared/constants/constants";

const getNationalityList = () => ServerRequest(`${GetMastarDropdowndata_URL}${NAT}`, "GET", "", "", "", false);

export { getNationalityList };
