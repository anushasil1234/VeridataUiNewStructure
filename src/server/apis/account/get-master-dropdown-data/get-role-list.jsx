import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, RLE } from "shared/constants/constants";

const getRoleList = () => 
    ServerRequest(`${GetMastarDropdowndata_URL}${RLE}`, "GET");

export { getRoleList };
