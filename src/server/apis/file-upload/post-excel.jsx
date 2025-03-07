import ServerRequest from "server/utils/server-request"
import { fileUploadSuccess, UploadxlsFile_URL } from "shared/constants/constants";

const postExcel =  (payLoad) => ServerRequest(UploadxlsFile_URL, "POST", payLoad, fileUploadSuccess);
export { postExcel }