import ServerRequest from "server/utils/server-request";
import { ValidateUserByOtpForgetPassword_URL } from "shared/constants/constants";

const ValidateForgetPassweordUsrByOtp = (payLoad) => 
    ServerRequest(ValidateUserByOtpForgetPassword_URL, "POST", payLoad);

export { ValidateForgetPassweordUsrByOtp };
