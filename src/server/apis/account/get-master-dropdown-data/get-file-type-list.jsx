import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, FLT } from "shared/constants/constants";

const getFileTypeList = () => ServerRequest(`${GetMastarDropdowndata_URL}${FLT}`, "GET", "", "", "", false);

export { getFileTypeList };
