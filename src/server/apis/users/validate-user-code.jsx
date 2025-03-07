import ServerRequest from "server/utils/server-request";
import { ValidateUserCode_URL } from "shared/constants/constants";

const validateUserCode = (userCode) => 
    ServerRequest(`${ValidateUserCode_URL}${userCode}`, "POST");

export { validateUserCode };
