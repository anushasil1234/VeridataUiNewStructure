import React, { useEffect, useState } from 'react';
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';
import {
    AuthHeader,
    ManuallyCloseableSnackBar,
    decryptedData,
    getLocalStorageItem,
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


const PfcRequest = (Component) => {
    const PfcRequestWrapper = () => {
        const userDetails = getLocalStorageItem("pfc-user");
        const [loading, setLoading] = useState(false);
        const [severity, setSeverity] = useState();
        const [popUpAlertMessage, setPopUpAlertMessage] = useState();
        const dispatch = useDispatch();

        const showSuccessMessage = (message) => {
            setSeverity("success");
            setPopUpAlertMessage(message);
        }

        const showErrorMessage = (message) => {
            setSeverity("error");
            setPopUpAlertMessage(message);
        }

        const handleClickOnLogout = () => {
            dispatch(removeLoggedinData());
            dispatch(removeLoggedinTokenData());
            removeLocalStorageItems(["pfc-user", "pfc-token"]);
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
                                if (tokenResponse.status === 200) {
                                    const newTokenDetails = tokenResponse.data.responseInfo;
                                    setLocalStorageItem("pfc-token", newTokenDetails);
                                    originalRequest.headers['Authorization'] = `Bearer ${userDetails.userCode}|~|${userDetails.userId}|~|${newTokenDetails.token}`;
                                    return api(originalRequest);
                                }
                            } else {
                                handleClickOnLogout();
                                showErrorMessage("Your session has expired. Please login again.");
                            }
                        } catch (e) {
                            handleClickOnLogout();
                            showErrorMessage("Your session has expired. Please login again.");
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
                const { data } = error.response;

                if (status === 500) {
                    message = data.ErrorResponse?.UserMessage || "Internal Server Error";
                } else {
                    message = data.title || data.errorResponse?.userMessage || statusText;
                    if (data.errorResponse?.internalMessages?.length) {
                        message = data.errorResponse.internalMessages.map((element, index) => (
                            <Typography key={index}>{element}</Typography>
                        ));
                    }
                }
            }
            message && showErrorMessage(message);
        };

        const refreshAuthToken = async () => {
            const tokenDetails = getLocalStorageItem("pfc-token");
            const BASE_URL = await decryptedData(process.env.REACT_APP_API_URL);
            return axios.post(`${BASE_URL}api/Account/GenerateRefreshToken`, {
                token: tokenDetails.token,
                refreshToken: tokenDetails.refreshToken
            });
        };

        const PfcRequest = async (url, type, payload, successMessage) => {
            const methodHeader = { headers: AuthHeader() };
            const BASE_URL = await decryptedData(process.env.REACT_APP_API_URL);
            const api = axios.create({ baseURL: BASE_URL });
            setupAxiosInterceptors(api);

            try {
                setLoading(true);
                const response = type === "POST"
                    ? await api.post(url, payload, methodHeader)
                    : await api.get(url, methodHeader);

                const { errorResponse, responseInfo, responseInfos, statusCode } = response.data;
                if (statusCode === 200) {
                    successMessage && showSuccessMessage(successMessage);
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

        useEffect(() => {
            dispatch(storePopUpSetFunction({ showErrorMessage, showSuccessMessage }));
        }, [dispatch]);

        return (
            <>
                {popUpAlertMessage && (
                    <ManuallyCloseableSnackBar
                        severity={severity}
                        setPopUpAlertMessage={setPopUpAlertMessage}
                        alertMessage={popUpAlertMessage}
                    />
                )}
                {loading && <CircularIndeterminate />}
                <Component PfcRequest={PfcRequest} />
            </>
        )
    }

    return PfcRequestWrapper;
}

export default PfcRequest;
