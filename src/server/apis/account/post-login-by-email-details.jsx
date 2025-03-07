import ServerRequest from "server/utils/server-request";
import { UserSignInDetailsByEmail_URL } from "shared/constants/constants";

const postLoginByEmailDetails = (email) => ServerRequest(`${UserSignInDetailsByEmail_URL}${email}`, "POST", null, null, true);

export { postLoginByEmailDetails };
