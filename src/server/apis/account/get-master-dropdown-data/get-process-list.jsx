import ServerRequest from "server/utils/server-request";
import { GetProcessDropdowndata_URL } from "shared/constants/constants";

const getProcessList = () => ServerRequest(`${GetProcessDropdowndata_URL}`, "POST", "", "", "", false);

export { getProcessList };