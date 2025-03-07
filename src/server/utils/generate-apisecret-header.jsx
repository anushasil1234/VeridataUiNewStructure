import { hasValue } from "shared/utils";

 const generateApiSecretHeader = () => {
    let apiSecretHeader = {};
    const PROXY_AUTH = (process.env.REACT_APP_API_PROXY_AUTH || '');
    const API_KEY = (process.env.REACT_APP_API_API_KEY || '');
    const SECRET_KEY = (process.env.REACT_APP_API_API_SECRET || '');
    if (hasValue(API_KEY) && hasValue(SECRET_KEY) && hasValue(PROXY_AUTH)) {
        apiSecretHeader = {
            headers: {
                'proxyauthorization': PROXY_AUTH,
                'apikey': API_KEY,
                'apikeysecret': SECRET_KEY,
            }
        };
    }
    return { apiSecretHeader };
}
export default generateApiSecretHeader