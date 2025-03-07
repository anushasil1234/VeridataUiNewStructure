import ServerRequest from "server/utils/server-request";
import { generateOtpSucces, SubmitOTP_URL } from "shared/constants/constants";

const PostAadharOtp = (payLoad) => 
    ServerRequest(SubmitOTP_URL, "POST", payLoad, generateOtpSucces);

export { PostAadharOtp };
