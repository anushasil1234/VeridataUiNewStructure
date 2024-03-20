import React, { useEffect, useState } from 'react'
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';
import { AuthHeader, ManuallyCloseableSnackBar, decryptedData, removeLocalStorageItems } from 'shared/utils';
import { removePopUpSetFunction, storePopUpSetFunction } from 'store/slices/popup-slice';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { removeFunction } from 'store/slices/function-slice';
import { removeDropdownList } from 'store/slices/dropdown-slice';
import { removeApi } from 'store/slices/api-slice';
import { removeLoggedinData } from 'store/slices/login-slice';
import axios from "axios";


const PfcRequiest = (Component) => {
    const PfcRequiestAdded = () => {

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
            removeLocalStorageItems(["pfc-user"]);
            removeLocalStorageItems(["pfc-token"]);
            dispatch(removeApi());
            dispatch(removeDropdownList());
            dispatch(removeFunction());
            dispatch(removePopUpSetFunction());
        }
        const PfcRequest = async (url, type, payLoad, successsMessage) => {
            const methodHeader = { headers: AuthHeader() };
            try {
                const BASE_URL = await decryptedData(process.env.REACT_APP_API_URL);

                const api = axios.create({
                    baseURL: BASE_URL
                });
                let response;
                if (type === "POST") {
                    setLoading(true);
                    response = await api.post(url, payLoad, methodHeader);
                }
                if (type === "GET") {
                    response = await api.get(url, methodHeader);
                }
                const { errorResponse, responseInfo, responseInfos, statusCode } = response.data;
                if (statusCode === 200) {
                    successsMessage && showSuccessMessage(successsMessage);
                    return {
                        responseInfo,
                        responseInfos,
                        errorResponse
                    };
                } else {
                    errorResponse.userMessage && showErrorMessage(errorResponse.userMessage);
                }
            } catch (error) {

                let message;
                if (error.response) {
                    const { status, statusText } = error.response;
                    if (status === 401) {
                        handleClickOnLogout();
                        message = "Your session has expired. Please login again";
                    } else {
                        if (error.response.data) {
                            const { data } = error.response;
                            if (status === 500) {
                                message = data.ErrorResponse.UserMessage;
                            }
                            else {
                                if (data.title) {
                                    message = data.title;
                                } else {
                                    if (data.errorResponse) {

                                        const { internalMessages, userMessage } = data.errorResponse;
                                        if (internalMessages && internalMessages.length > 0) {
                                            message =
                                                <>
                                                    {internalMessages.map((element, index) => {
                                                        return (
                                                            <Typography key={index}>{element}</Typography>
                                                        )
                                                    })}
                                                </>
                                        } else {
                                            message = userMessage;
                                        }
                                    }
                                }
                            }
                        } else {
                            message = statusText;
                        }
                    }
                }
                message && showErrorMessage(message);
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
    return PfcRequiestAdded
}

export default PfcRequiest
