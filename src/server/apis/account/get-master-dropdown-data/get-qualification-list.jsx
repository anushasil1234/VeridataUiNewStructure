import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, QUA } from "shared/constants/constants";

const getQualificationList = () => ServerRequest(`${GetMastarDropdowndata_URL}${QUA}`, "GET");

export { getQualificationList };
