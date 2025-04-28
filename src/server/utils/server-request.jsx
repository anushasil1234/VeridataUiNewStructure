import React, { useEffect, useState, useRef } from 'react';
import CircularIndeterminate from 'shared/utils/loader/circularIndeterminate';
import {
  AuthHeader,
  ManuallyCloseableSnackBar,
  decryptedData,
  getLocalStorageItem,
  hasValue,
  removeLocalStorageItems,
  setLocalStorageItem,
} from 'shared/utils';
import { removePopUpSetFunction, storePopUpSetFunction } from 'store/slices/popup-slice';
import { useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { removeFunction } from 'store/slices/function-slice';
import { removeDropdownList } from 'store/slices/dropdown-slice';
import { removeApi } from 'store/slices/api-slice';
import { removeLoggedinData } from 'store/slices/login-slice';
import { removeLoggedinTokenData } from 'store/slices/login-token-slice';
import { removeSideMenuItems } from 'store/slices/side-menu-items-slice';
import axios from 'axios';
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
const ServerRequest = async (
  url,
  type,
  payload,
  successMessage,
  isInternal = false,
  isStopLoaderEnabled = true,
) => {
  const { apiSecretHeader } = generateApiSecretHeader();
  const methodHeader = {
    headers: {
      ...AuthHeader(),
      ...apiSecretHeader,
    },
  };
     const BASE_URL = 'http://192.168.1.116:85';
  const api = axios.create({ baseURL: BASE_URL });
  setupAxiosInterceptors(api);
  try {
    isStopLoaderEnabled && startLoader();
    const response =
      type === 'POST'
        ? await api.post(url, payload, methodHeader)
        : await api.get(url, methodHeader);
    const { errorResponse, responseInfo, responseInfos, statusCode } = response.data;
    if (statusCode === 200) {
      console.log('successMessage', successMessage);
      successMessage && showSuccessMessage(successMessage);
      console.log('response.data', response.data);
      return { responseInfo, responseInfos, errorResponse };
    } else {
      console.log('errorResponse', errorResponse);
      errorResponse?.internalMessages && showErrorMessage(errorResponse.internalMessages);
      errorResponse?.internalMessage && showErrorMessage(errorResponse.internalMessage);
    }
  } catch (error) {
    console.log('catch errorResponse', error);
    handleOtherErrors(error);
  } finally {
    isStopLoaderEnabled && stopLoader();
  }
};
export default ServerRequest;
