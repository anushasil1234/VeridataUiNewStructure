import ServerRequest from "server/utils/server-request";
import { EditUserProfile_URL, passwordCreationSuccessMsg } from "shared/constants/constants";

const editUserProfileDetails = (payLoad) => 
    ServerRequest(EditUserProfile_URL, "POST", payLoad, passwordCreationSuccessMsg);

export { editUserProfileDetails };
