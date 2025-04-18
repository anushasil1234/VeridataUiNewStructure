import ServerRequest from "server/utils/server-request";
import { GetRawFileData_URL } from "shared/constants/constants";

const getRawFileData = (companyId, fileId) => ServerRequest(GetRawFileData_URL(companyId, fileId), "POST");

export { getRawFileData };
