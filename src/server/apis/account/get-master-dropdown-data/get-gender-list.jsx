import ServerRequest from "server/utils/server-request";
import { GetMastarDropdowndata_URL, GEN } from "shared/constants/constants";

const getGenderList = () => ServerRequest(`${GetMastarDropdowndata_URL}${GEN}`, "GET");

export { getGenderList };
