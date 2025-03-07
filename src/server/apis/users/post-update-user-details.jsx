import ServerRequest from "server/utils/server-request";
import { UpdateAdminUser_URL, userUpdateSuccessMsg } from "shared/constants/constants";

const postUpdateUserDetails = (payLoad) => 
    ServerRequest(UpdateAdminUser_URL, "POST", payLoad, userUpdateSuccessMsg);

export { postUpdateUserDetails };
