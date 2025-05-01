import { configureStore } from '@reduxjs/toolkit';
import {
  LoggedinData,
  LoggeoutData,
  LoggedinTokenData,
  ApiSlice,
  popupSlice,
  commonHooksFunctionSlice,
  dropdownSlice,
  functionSlice,
  actionRouteSlice,
  sideMenuItemsSlice,
  setTableRowsSlice,
  dataSlice,
  ManualValidationResponseStatusSlice,
  SetDropDownFunctionSlice,
  SetRemarksFunctionSlice,
  CandidatePageSlice,
  AppointeeStatusDetailsData
} from './slices';

// Combine related slices into feature slices
const authSlice = {
  loggedInData: LoggedinData,
  loggedinTokenData: LoggedinTokenData,
  loggeoutData: LoggeoutData,
};

const appointeeSlice = {
  appointeeStatusDetailsData: AppointeeStatusDetailsData,
  manualValidationResponseStatusSlice: ManualValidationResponseStatusSlice,
};

const uiSlice = {
  popUpSlice: popupSlice,
  sideMenuItemsSlice: sideMenuItemsSlice,
  setTableRowsSlice: setTableRowsSlice,
};

const apiDataSlice = {
  apiSlice: ApiSlice,
  DataSlice: dataSlice,
  dropdownList: dropdownSlice,
};

const functionSlices = {
  functionSlice: functionSlice,
  commonHooksFunctionSlice: commonHooksFunctionSlice,
  SetDropDownFunctionSlice: SetDropDownFunctionSlice,
  SetRemarksFunctionSlice: SetRemarksFunctionSlice,
};

const store = configureStore({
  reducer: {
    ...authSlice,
    ...appointeeSlice,
    ...uiSlice,
    ...apiDataSlice,
    ...functionSlices,
    actionRouteSlice: actionRouteSlice,
    CandidatePageSlice: CandidatePageSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
