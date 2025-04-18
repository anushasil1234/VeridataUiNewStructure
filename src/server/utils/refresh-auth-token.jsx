import axios from "axios";
import generateApiSecretHeader from "./generate-apisecret-header";
import { decryptedData, getLocalStorageItem } from "shared/utils";
const refreshAuthToken = async () => {
    const { apiSecretHeader } = generateApiSecretHeader();
    const tokenDetails = getLocalStorageItem("pfc-token");
    // const BASE_URL = await decryptedData(process.env.REACT_APP_API_URL);
    const BASE_URL = `http://192.168.1.116:85`;

    // return axios.post(`${BASE_URL}/Account/GenerateRefreshToken`, {
    //     token: tokenDetails.token,
    //     refreshToken: tokenDetails.refreshToken
    // }, apiSecretHeader);
    return axios.post(`${BASE_URL}/GenerateRefreshToken`, {
        token: tokenDetails.token,
        refreshToken: tokenDetails.refreshToken
    }, apiSecretHeader);
};

export default refreshAuthToken