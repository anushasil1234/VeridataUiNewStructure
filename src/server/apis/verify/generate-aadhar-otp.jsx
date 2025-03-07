import ServerRequest from "server/utils/server-request";
import { GenerateOTP_URL, generateOtpSucces } from "shared/constants/constants";

const GenerateAadharOtp = (payLoad) => 
    ServerRequest(GenerateOTP_URL, "POST", payLoad, generateOtpSucces);

export { GenerateAadharOtp };
