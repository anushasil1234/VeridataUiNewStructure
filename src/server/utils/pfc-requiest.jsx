import React, { useEffect, useState } from 'react';
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';
import { AuthHeader, ManuallyCloseableSnackBar, decryptedData, getLocalStorageItem, removeLocalStorageItems, setLocalStorageItem } from 'shared/utils';
import { removePopUpSetFunction, storePopUpSetFunction } from 'store/slices/popup-slice';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { removeFunction } from 'store/slices/function-slice';
import { removeDropdownList } from 'store/slices/dropdown-slice';
import { removeApi } from 'store/slices/api-slice';
import { removeLoggedinData } from 'store/slices/login-slice';
import axios from "axios";
import { removeLoggedinTokenData } from 'store/slices/login-token-slice';
import { removeSideMenuItems } from 'store/slices/side-menu-items-slice';

const PfcRequiest = (Component) => {
    const PfcRequiestAdded = () => {
        const userDetails = getLocalStorageItem("pfc-user");
        const [loading, setLoading] = useState(false);
        const [severity, setSeverty] = useState();
        const [popUpAlertMessage, setPopUpAlertMessage] = useState();
        const showSuccessMessage = (message) => {
            setSeverty("success");
            setPopUpAlertMessage(message);
        }
        const showErrorMessage = (message) => {
            setSeverty("error");
            setPopUpAlertMessage(message);
        }
        const dispatch = useDispatch();

        const handleClickOnLogout = () => {
            dispatch(removeLoggedinData());
            dispatch(removeLoggedinTokenData());
            removeLocalStorageItems(["pfc-user"]);
            removeLocalStorageItems(["pfc-token"]);
            dispatch(removeApi());
            dispatch(removeDropdownList());
            dispatch(removeFunction());
            dispatch(removePopUpSetFunction());
            dispatch(removeSideMenuItems());
        }
        const isAdmin = () => {
            return userDetails.userTypeId === 1 || userDetails.userTypeId === 2;
        }

        const setupAxiosInterceptors = (api) => {
            api.interceptors.response.use(
                response => response,
                async error => {
                    const originalRequest = error.config;
                    if (error.response.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;
                        try {
                            if (isAdmin()) {
                                const tokenResponse = await refreshAuthToken();
                                const { responseInfo } = tokenResponse.data;
                                if (tokenResponse.status === 200) {
                                    const newTokenDetails = responseInfo;
                                    setLocalStorageItem("pfc-token", newTokenDetails);

                                    const customDetails = `${userDetails?.userCode}|~|${userDetails?.userId}|~|`;
                                    originalRequest.headers['Authorization'] = `Bearer ${customDetails + newTokenDetails.token}`;
                                    return api(originalRequest);
                                }
                            } else {
                                handleClickOnLogout();
                                showErrorMessage("Your session has expired. Please login again.");
                                return Promise.reject(error);
                            }
                        } catch (e) {
                            handleClickOnLogout();
                            showErrorMessage("Your session has expired. Please login again.");
                            return Promise.reject(error);
                        }
                    } else {
                        handleOtherErrors(error);
                    }
                    return Promise.reject(error);
                }
            );
        };

        const handleOtherErrors = (error) => {
            let message;
            if (error.response) {
                const { status, statusText } = error.response;
                if (error.response.data) {
                    const { data } = error.response;
                    if (status === 500) {
                        message = data.ErrorResponse?.UserMessage || "Internal Server Error";
                    } else {
                        message = data.title || data.errorResponse?.userMessage || statusText;
                        if (data.errorResponse?.internalMessages?.length > 0) {
                            message = (
                                <>
                                    {data.errorResponse.internalMessages.map((element, index) => (
                                        <Typography key={index}>{element}</Typography>
                                    ))}
                                </>
                            );
                        }
                    }
                } else {
                    message = statusText;
                }
            }
            message && showErrorMessage(message);
        };

        const refreshAuthToken = async () => {
            const tokenDetails = getLocalStorageItem("pfc-token");
            const token = tokenDetails.token;
            const refreshToken = tokenDetails.refreshToken;
            const BASE_URL = await decryptedData(process.env.REACT_APP_API_URL);
            return axios.post(`${BASE_URL}api/Account/GenerateRefreshToken`, { token, refreshToken });
        };

        const PfcRequest = async (url, type, payLoad, successsMessage) => {
            const methodHeader = { headers: AuthHeader() };
            const BASE_URL = await decryptedData(process.env.REACT_APP_API_URL);
            const api = axios.create({ baseURL: BASE_URL });
            setupAxiosInterceptors(api);
            let response;
            try {
                setLoading(true);
                if (type === "POST") {
                    response = await api.post(url, payLoad, methodHeader);
                }
                if (type === "GET") {
                    response = await api.get(url, methodHeader);
                }
                const { errorResponse, responseInfo, responseInfos, statusCode } = response.data;
                if (statusCode === 200) {
                    successsMessage && showSuccessMessage(successsMessage);
                    return { responseInfo, responseInfos, errorResponse };
                } else {
                    errorResponse?.userMessage && showErrorMessage(errorResponse.userMessage);
                }
            } catch (error) {
                handleOtherErrors(error);
            } finally {
                setLoading(false);
            }
        };

        dispatch(storePopUpSetFunction({ showErrorMessage, showSuccessMessage }));

        return (
            <>
                {popUpAlertMessage &&
                    <ManuallyCloseableSnackBar
                        severity={severity}
                        setPopUpAlertMessage={setPopUpAlertMessage}
                        alertMessage={popUpAlertMessage}
                    />}
                {loading && <CircularIndeterminate />}
                <Component PfcRequest={PfcRequest} />
            </>
        )
    }
    return PfcRequiestAdded;
}

export default PfcRequiest;
