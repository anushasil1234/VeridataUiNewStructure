import ServerRequest from "server/utils/server-request";
import { AppointeePrerequisiteUpdate_URL } from "shared/constants/constants";

const postAppointeePrerequisiteStatus = (payLoad) => 
    ServerRequest(AppointeePrerequisiteUpdate_URL, "POST", payLoad);

export { postAppointeePrerequisiteStatus };
