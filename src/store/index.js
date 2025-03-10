import { configureStore  } from "@reduxjs/toolkit";
import LoggedinData from "./slices/login-slice";
import LoggeoutData from "./slices/logout-slice";
import LoggedinTokenData from "./slices/login-token-slice";
import ApiSlice from "./slices/api-slice";
import popupSlice from "./slices/popup-slice";
import commonHooksFunctionSlice from "./slices/common-hook-function-slice";
import dropdownSlice from "./slices/dropdown-slice";
import functionSlice from "./slices/function-slice";
import actionRouteSlice from "./slices/action-route-slice";
import sideMenuItemsSlice from "./slices/side-menu-items-slice";
import setTableRowsSlice from "./slices/set-table-rows-slice";
import dataSlice from "./slices/data-slice";
import ManualValidationResponseStatusSlice from "./slices/manual-validation-response-status-slice";
import SetDropDownFunctionSlice from "./slices/set-dropdown-functions-slice"; 
import SetRemarksFunctionSlice from "./slices/set-remarks-functions-slice"; 
import CandidatePageSlice from "./slices/candidate-page-slice"; 

const store = configureStore(
    {
        reducer: {
            loggedInData: LoggedinData,
            loggedinTokenData:LoggedinTokenData,
            manualValidationResponseStatusSlice:ManualValidationResponseStatusSlice,
            loggeoutData: LoggeoutData,
            apiSlice: ApiSlice,
            popUpSlice: popupSlice,
            commonHooksFunctionSlice: commonHooksFunctionSlice,         
            dropdownList: dropdownSlice,
            functionSlice: functionSlice,     
            actionRouteSlice: actionRouteSlice,    
            sideMenuItemsSlice : sideMenuItemsSlice,
            setTableRowsSlice : setTableRowsSlice,
            DataSlice: dataSlice,
            SetDropDownFunctionSlice: SetDropDownFunctionSlice,
            SetRemarksFunctionSlice: SetRemarksFunctionSlice,
            CandidatePageSlice: CandidatePageSlice
        }       
    }
);

export default store;