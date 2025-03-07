import ServerRequest from "server/utils/server-request";
import { formSubmitionSuccess, PostAppointeeFileDetails_URL } from "shared/constants/constants";

const postAppointeeFileDetails = (payLoad) => 
    ServerRequest(PostAppointeeFileDetails_URL, "POST", payLoad, formSubmitionSuccess);

export { postAppointeeFileDetails };
