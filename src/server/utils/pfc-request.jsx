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
import startLoader from 'shared/utils/associate/start-loader';
import stopLoader from 'shared/utils/associate/stop-loader';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import handleClickOnLogout from './handle-logout';
const PfcRequest = (Component) => {
  const PfcRequestWrapper = () => {
    const userDetails = getLocalStorageItem('app-user');
    const [loading, setLoading] = useState(false);
    const [pendingRequests, setPendingRequests] = useState(0);
    const [severity, setSeverity] = useState();
    const [popUpAlertMessage, setPopUpAlertMessage] = useState();
    const dispatch = useDispatch();
    const timeoutRef = useRef(null);
    const inactivityTime = 100 * 60 * 1000;
    const API_KEY = process.env.REACT_APP_API_API_KEY || '';
    const SECRET_KEY = process.env.REACT_APP_API_API_SECRET || '';
    const PROXY_AUTH = process.env.REACT_APP_API_PROXY_AUTH || '';
    const navigate = useNavigate();
    const startLoaderEvent = () => setPendingRequests((prev) => prev + 1);
    const stopLoaderEvent = () => setPendingRequests((prev) => Math.max(prev - 1, 0));
    useEffect(() => {
      setLoading(pendingRequests > 0);
    }, [pendingRequests]);
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(handleClickOnLogout, inactivityTime);
    };
    const showSuccessMessageEvent = (event) => {
      console.log('event1121', event);
      const { message } = event?.detail || '';
      setSeverity('success');
      console.log('message333', message);
      setPopUpAlertMessage(message);
    };
    const showErrorMessageEvent = (event) => {
      const { message } = event?.detail || '';
      setSeverity('error');
      setPopUpAlertMessage(message);
    };
    const handleClickOnLogoutEvent = () => {
      console.log('handleClickOnLogoutEvent');
      const IsAdminUser = isAdmin();
      localStorage.clear();
      sessionStorage.clear();
      dispatch(removeLoggedinData());
      dispatch(removeLoggedinTokenData());
      removeLocalStorageItems(['app-user', 'app-token']);
      dispatch(removeApi());
      dispatch(removeDropdownList());
      dispatch(removeFunction());
      dispatch(removePopUpSetFunction());
      dispatch(removeSideMenuItems());
      showErrorMessage('Your session has expired due to inactivity. Please login again.');
      if (IsAdminUser) {
        navigate(toLogin);
      }
    };
    const isAdmin = () => {
      return !roleTypeEnums.candidate.includes(userDetails?.userTypeId);
    };
    useEffect(() => {
      console.log('addEventListener');
      if (roleTypeEnums.candidate.includes(userDetails?.userTypeId)) {
        resetTimeout();
      }
      console.log('addEventListener2');
      window.addEventListener('logout', handleClickOnLogoutEvent);
      window.addEventListener('show-error', showErrorMessageEvent);
      window.addEventListener('show-success', showSuccessMessageEvent);
      window.addEventListener('start-loader', startLoaderEvent);
      window.addEventListener('stop-loader', stopLoaderEvent);
      return () => {
        console.log('removeEventListener');
        window.removeEventListener('show-success', showSuccessMessageEvent);
        window.removeEventListener('show-error', showErrorMessageEvent);
        window.removeEventListener('start-loader', startLoaderEvent);
        window.removeEventListener('stop-loader', stopLoaderEvent);
        window.removeEventListener('logout', handleClickOnLogoutEvent);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
    return (
      <>
        {popUpAlertMessage && (
          <ManuallyCloseableSnackBar
            severity={severity}
            setPopUpAlertMessage={setPopUpAlertMessage}
            alertMessage={popUpAlertMessage}
          />
        )}
        {loading && <CircularIndeterminate />} {}
        <Component startLoader={startLoader} stopLoader={stopLoader} />
      </>
    );
  };
  return PfcRequestWrapper;
};
export default PfcRequest;
