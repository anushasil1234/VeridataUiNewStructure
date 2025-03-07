import React, { useEffect, useState, useRef } from 'react';
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';
import {
    AuthHeader,
    ManuallyCloseableSnackBar,
    decryptedData,
    getLocalStorageItem,
    hasValue,
    removeLocalStorageItems,
    setLocalStorageItem
} from 'shared/utils';
import {
    removePopUpSetFunction,
    storePopUpSetFunction
} from 'store/slices/popup-slice';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { removeFunction } from 'store/slices/function-slice';
import { removeDropdownList } from 'store/slices/dropdown-slice';
import { removeApi } from 'store/slices/api-slice';
import { removeLoggedinData } from 'store/slices/login-slice';
import { removeLoggedinTokenData } from 'store/slices/login-token-slice';
import { removeSideMenuItems } from 'store/slices/side-menu-items-slice';
import axios from "axios";
import { toLogin } from 'shared/constants/constants';
import { useNavigate } from 'react-router-dom';
import { roleTypeEnums } from 'shared/constants/constants';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import startLoader from 'shared/utils/associate/start-loader';
import stopLoader from 'shared/utils/associate/stop-loader';
import generateApiSecretHeader from './generate-apisecret-header';
import refreshAuthToken from './refresh-auth-token';
import setupAxiosInterceptors from './setup-axios-inerceptors';
import handleOtherErrors from './handle-other-error';

// const PfcRequest = (Component) => {
//     const PfcRequestWrapper = () => {
//         const userDetails = getLocalStorageItem("pfc-user");
//         const [loading, setLoading] = useState(false);
//         const [pendingRequests, setPendingRequests] = useState(0);
//         const [severity, setSeverity] = useState();
//         const [popUpAlertMessage, setPopUpAlertMessage] = useState();
//         const dispatch = useDispatch();
//         const timeoutRef = useRef(null);
//         const inactivityTime = 10 * 60 * 1000; // 10 minutes in milliseconds
//         const API_KEY = (process.env.REACT_APP_API_API_KEY || '');
//         const SECRET_KEY = (process.env.REACT_APP_API_API_SECRET || '');
//         const PROXY_AUTH = (process.env.REACT_APP_API_PROXY_AUTH || '');
//         const navigate = useNavigate();

//         // Manual loader control
//         // Start loader if there are pending requests
//         const startLoader = () => setPendingRequests(prev => prev + 1);
//         // Stop loader only when all requests are finished
//         const stopLoader = () => setPendingRequests(prev => Math.max(prev - 1, 0));

//         useEffect(() => {
//             // Show the loader only if there are pending requests
//             setLoading(pendingRequests > 0);
//         }, [pendingRequests]);


//         const resetTimeout = () => {
//             if (timeoutRef.current) {
//                 clearTimeout(timeoutRef.current);
//             }
//             timeoutRef.current = setTimeout(handleClickOnLogout, inactivityTime);
//         };

//         const showSuccessMessage = (message) => {
//             setSeverity("success");
//             setPopUpAlertMessage(message);
//         };

//         const showErrorMessage = (message) => {
//             setSeverity("error");
//             setPopUpAlertMessage(message);
//         };

//         const handleClickOnLogout = () => {
//             const IsAdminUser = isAdmin();
//             localStorage.clear();
//             sessionStorage.clear();
//             dispatch(removeLoggedinData());
//             dispatch(removeLoggedinTokenData());
//             removeLocalStorageItems(["pfc-user", "pfc-token"]);
//             dispatch(removeApi());
//             dispatch(removeDropdownList());
//             dispatch(removeFunction());
//             dispatch(removePopUpSetFunction());
//             dispatch(removeSideMenuItems());
//             showErrorMessage("Your session has expired due to inactivity. Please login again.");
//             if (IsAdminUser) {
//                 navigate(toLogin);
//             }
//         };

//         // const isAdmin = () => {
//         //     return userDetails.userTypeId !== 3;
//         // };

//         const isAdmin = () => {
//             return !roleTypeEnums.candidate.includes(userDetails.userTypeId);
//         };

//         const setupAxiosInterceptors = (api) => {
//             api.interceptors.response.use(
//                 response => response,
//                 async error => {
//                     const originalRequest = error.config;
//                     if (error.response.status === 401 && !originalRequest._retry) {
//                         originalRequest._retry = true;
//                         try {
//                             if (isAdmin()) {
//                                 const tokenResponse = await refreshAuthToken();
//                                 if (tokenResponse.status === 200) {
//                                     const newTokenDetails = tokenResponse.data.responseInfo;
//                                     setLocalStorageItem("pfc-token", newTokenDetails);
//                                     originalRequest.headers['Authorization'] = `Bearer ${userDetails.userCode}|~|${userDetails.userId}|~|${newTokenDetails.token}`;
//                                     return api(originalRequest);
//                                 }
//                             } else {
//                                 handleClickOnLogout();
//                                 showErrorMessage("Your session has expired. Please login again.");
//                             }
//                         } catch (e) {
//                             handleClickOnLogout();
//                             showErrorMessage("Your session has expired. Please login again.");
//                         }
//                     } else {
//                         handleOtherErrors(error);
//                     }
//                     return Promise.reject(error);
//                 }
//             );
//         };

//         const handleOtherErrors = (error) => {
//             let message;
//             if (error.response) {
//                 const { status, statusText } = error.response;
//                 const { data } = error.response;

//                 if (status === 500) {
//                     message = data.ErrorResponse?.UserMessage || "Internal Server Error";
//                 } else {
//                     message = data.title || data.errorResponse?.userMessage || statusText;
//                     if (data.errorResponse?.internalMessages?.length) {
//                         message = data.errorResponse.internalMessages.map((element, index) => (
//                             <Typography key={index}>{element}</Typography>
//                         ));
//                     }
//                 }
//             }
//             message && showErrorMessage(message);
//         };

//         const refreshAuthToken = async () => {
//             let methodHeader = {};
//             if (hasValue(API_KEY) && hasValue(SECRET_KEY) && hasValue(PROXY_AUTH)) {
//                 methodHeader = {
//                     headers: {
//                         'proxyauthorization': PROXY_AUTH,
//                         'apikey': API_KEY,
//                         'apikeysecret': SECRET_KEY,
//                     }
//                 };
//             }
//             const tokenDetails = getLocalStorageItem("pfc-token");
//             const BASE_URL = await decryptedData(process.env.REACT_APP_API_URL);

//             return axios.post(`${BASE_URL}/Account/GenerateRefreshToken`, {
//                 token: tokenDetails.token,
//                 refreshToken: tokenDetails.refreshToken
//             }, methodHeader);
//         };

//         const PfcRequest = async (url, type, payload, successMessage, isInternal = false) => {
//             let APiSecretHeader = {};
//             console.log("payload2222", payload);
//             if (hasValue(API_KEY) && hasValue(SECRET_KEY) && hasValue(PROXY_AUTH)) {
//                 APiSecretHeader = {
//                     'proxyauthorization': PROXY_AUTH,
//                     'apikey': API_KEY,
//                     'apikeysecret': SECRET_KEY,
//                 };
//             }
//             const methodHeader = {
//                 headers: {
//                     ...AuthHeader(),
//                     ...APiSecretHeader
//                 }
//             };
//             const BASE_URL = isInternal ? await decryptedData(process.env.REACT_APP_API_INTERNAL_URL) : await decryptedData(process.env.REACT_APP_API_URL);
//             const api = axios.create({ baseURL: BASE_URL });
//             setupAxiosInterceptors(api);

//             try {
//                 startLoader();
//                 const response = type === "POST"
//                     ? await api.post(url, payload, methodHeader)
//                     : await api.get(url, methodHeader);

//                 const { errorResponse, responseInfo, responseInfos, statusCode } = response.data;
//                 if (statusCode === 200) {
//                     successMessage && showSuccessMessage(successMessage);
//                     return { responseInfo, responseInfos, errorResponse };
//                 } else {
//                     errorResponse?.userMessage && showErrorMessage(errorResponse.userMessage);
//                 }
//             } catch (error) {
//                 handleOtherErrors(error);
//             } finally {
//                 stopLoader();
//             }
//         };


//         // Pass the loader control methods along with the PfcRequest function
//         dispatch(storePopUpSetFunction({ showErrorMessage, showSuccessMessage }));

//         useEffect(() => {
//             if (roleTypeEnums.candidate.includes(userDetails?.userTypeId)) {
//                 resetTimeout();
//                 return () => {
//                     if (timeoutRef.current) {
//                         clearTimeout(timeoutRef.current);
//                     }
//                 };
//             }
//         }, []);

//         return (
//             <>
//                 {popUpAlertMessage && (
//                     <ManuallyCloseableSnackBar
//                         severity={severity}
//                         setPopUpAlertMessage={setPopUpAlertMessage}
//                         alertMessage={popUpAlertMessage}
//                     />
//                 )}
//                 {loading && <CircularIndeterminate />} {/* Loader is now controlled by the pendingRequests */}
//                 {/* <Component PfcRequest={PfcRequest} startLoader={startLoader} stopLoader={stopLoader} /> */}
//             </>
//         );
//     };

//     return PfcRequestWrapper;
// };

// export default PfcRequest;

// const generateApiSecretHeader = () => {
//     let apiSecretHeader = {};
//     const PROXY_AUTH = (process.env.REACT_APP_API_PROXY_AUTH || '');
//     const API_KEY = (process.env.REACT_APP_API_API_KEY || '');
//     const SECRET_KEY = (process.env.REACT_APP_API_API_SECRET || '');
//     if (hasValue(API_KEY) && hasValue(SECRET_KEY) && hasValue(PROXY_AUTH)) {
//         apiSecretHeader = {
//             headers: {
//                 'proxyauthorization': PROXY_AUTH,
//                 'apikey': API_KEY,
//                 'apikeysecret': SECRET_KEY,
//             }
//         };
//     }
//     return { apiSecretHeader };
// }

// const refreshAuthToken = async () => {
//     const { apiSecretHeader } = generateApiSecretHeader();
//     const tokenDetails = getLocalStorageItem("pfc-token");
//     const BASE_URL = await decryptedData(process.env.REACT_APP_API_URL);

//     return axios.post(`${BASE_URL}/Account/GenerateRefreshToken`, {
//         token: tokenDetails.token,
//         refreshToken: tokenDetails.refreshToken
//     }, apiSecretHeader);
// };
const handleClickOnLogout = () => {
    // const IsAdminUser = isAdmin();
    // localStorage.clear();
    // sessionStorage.clear();
    // dispatch(removeLoggedinData());
    // dispatch(removeLoggedinTokenData());
    // removeLocalStorageItems(["pfc-user", "pfc-token"]);
    // dispatch(removeApi());
    // dispatch(removeDropdownList());
    // dispatch(removeFunction());
    // dispatch(removePopUpSetFunction());
    // dispatch(removeSideMenuItems());
    // showErrorMessage("Your session has expired due to inactivity. Please login again.");
    // if (IsAdminUser) {
    //     navigate(toLogin);
    // }
};
const isAdmin = () => {
    const userDetails = getLocalStorageItem("pfc-user");
    return !roleTypeEnums.candidate.includes(userDetails.userTypeId);
};
// const handleOtherErrors = (error) => {
//     let message;
//     if (error.response) {
//         const { status, statusText } = error.response;
//         const { data } = error.response;

//         if (status === 500) {
//             message = data.ErrorResponse?.UserMessage || "Internal Server Error";
//         } else {
//             message = data.title || data.errorResponse?.userMessage || statusText;
//             if (data.errorResponse?.internalMessages?.length) {
//                 message = data.errorResponse.internalMessages.map((element, index) => (
//                     <Typography key={index}>{element}</Typography>
//                 ));
//             }
//         }
//     }
//     message && showErrorMessage(message);
// };
// const setupAxiosInterceptors = (api) => {
//     const userDetails = getLocalStorageItem("pfc-user");
//     api.interceptors.response.use(
//         response => response,
//         async error => {
//             const originalRequest = error.config;
//             if (error.response.status === 401 && !originalRequest._retry) {
//                 originalRequest._retry = true;
//                 try {
//                     if (isAdmin()) {
//                         const tokenResponse = await refreshAuthToken();
//                         if (tokenResponse.status === 200) {
//                             const newTokenDetails = tokenResponse.data.responseInfo;
//                             setLocalStorageItem("pfc-token", newTokenDetails);
//                             originalRequest.headers['Authorization'] = `Bearer ${userDetails.userCode}|~|${userDetails.userId}|~|${newTokenDetails.token}`;
//                             return api(originalRequest);
//                         }
//                     } else {
//                         handleClickOnLogout();
//                         showErrorMessage("Your session has expired. Please login again.");
//                     }
//                 } catch (e) {
//                     handleClickOnLogout();
//                     showErrorMessage("Your session has expired. Please login again.");
//                 }
//             } else {
//                 handleOtherErrors(error);
//             }
//             return Promise.reject(error);
//         }
//     );
// };
const ServerRequest = async (url, type, payload, successMessage, isInternal = false) => {
    const { apiSecretHeader } = generateApiSecretHeader();

    const methodHeader = {
        headers: {
            ...AuthHeader(),
            ...apiSecretHeader
        }
    };
    const BASE_URL = isInternal ? await decryptedData(process.env.REACT_APP_API_INTERNAL_URL) : await decryptedData(process.env.REACT_APP_API_URL);
    const api = axios.create({ baseURL: BASE_URL });
    setupAxiosInterceptors(api);
    try {
    
        startLoader();
        const response = type === "POST"
            ? await api.post(url, payload, methodHeader)
            : await api.get(url, methodHeader);

        const { errorResponse, responseInfo, responseInfos, statusCode } = response.data;
        if (statusCode === 200) {
            console.log('successMessage', successMessage);
            
            successMessage && showSuccessMessage(successMessage);
            console.log('response.data', response.data);
            
            return { responseInfo, responseInfos, errorResponse };
        } else {
            errorResponse?.userMessage && showErrorMessage(errorResponse.userMessage);
        }
    } catch (error) {
        handleOtherErrors(error);
    } finally {
        stopLoader();
    }
};
export default ServerRequest;