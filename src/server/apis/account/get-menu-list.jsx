
import ServerRequest from "server/utils/server-request"
import { GetMenuListData_URL } from "shared/constants/constants";

const getMenuList = (userId) => ServerRequest(`${GetMenuListData_URL}${userId}`, "POST");
export { getMenuList }