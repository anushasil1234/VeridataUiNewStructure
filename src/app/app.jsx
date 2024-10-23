import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { AppStyle } from "./app-style";
import "./app.css";
import LoadingContextProvider from "store/reducers/loading-context-provider";
import CustomRouter from "shared/routes/custom-router";
import { useDispatch, useSelector } from "react-redux";
import { removeLoggedinData, storeLoggedinData } from "store/slices/login-slice";
import { removeLoggedinTokenData, storeLoggedinTokenData } from "store/slices/login-token-slice";
import { getLocalStorageItem, removeLocalStorageItems } from "shared/utils";
import AppWrapper from "shared/utils/app-wrapper/app-wrapper";
import { storeLoggeoutData } from "store/slices/logout-slice";
import { removeDropdownList } from "store/slices/dropdown-slice";
import { removeApi } from "store/slices/api-slice";
import { removeFunction } from "store/slices/function-slice";
import { removePopUpSetFunction } from "store/slices/popup-slice";
import { removeSideMenuItems } from "store/slices/side-menu-items-slice";

const App = () => {
  const routing = useRoutes(CustomRouter);
  const dispatch = useDispatch();
  const loginData = getLocalStorageItem("pfc-user");
  const tokenData = getLocalStorageItem("pfc-token");
  const handleClickOnLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
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
  const loggedInData = useSelector(state => state.loggedInData);
  const functionSlice = useSelector(state => state.functionSlice);

  const { setDropdownList } = functionSlice[0];
  if (loginData && loggedInData.length === 0) {
    dispatch(storeLoggedinData(loginData));
    dispatch(storeLoggedinTokenData(tokenData));
    dispatch(storeLoggeoutData({ handleClickOnLogout }));
  }
  const { userTypeId, isDefaultPassword } = loggedInData.length > 0 && loggedInData[0];
  useEffect(() => {
    if (userTypeId && isDefaultPassword === false) {
      setDropdownList();
    }
  }, [userTypeId])


  return (
    <ThemeProvider theme={AppStyle}>
      <LoadingContextProvider>
        {routing}
      </LoadingContextProvider>
    </ThemeProvider>
  );
};


export const WrappedApp = AppWrapper(App)