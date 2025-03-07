import ServerRequest from "server/utils/server-request";
import { appointeeApproveSuccess, PostAppointeeApproved_URL } from "shared/constants/constants";

const postAppointeeApproved = (payLoad) => 
    ServerRequest(PostAppointeeApproved_URL, "POST", payLoad, appointeeApproveSuccess, true);

export { postAppointeeApproved };
