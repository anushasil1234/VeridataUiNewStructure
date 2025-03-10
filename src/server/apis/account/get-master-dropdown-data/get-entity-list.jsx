import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, ENTITY } from "shared/constants/constants";

const getEntityList = () => ServerRequest(`${GetMastarDropdowndata_URL}${ENTITY}`, "GET", "", "", "", false);

export { getEntityList };
