import { createSlice } from '@reduxjs/toolkit';

// Import all slices
import { default as loginSlice } from './login-slice';
import { default as logoutSlice } from './logout-slice';
import { default as loginTokenSlice } from './login-token-slice';
import { default as apiSlice } from './api-slice';
import { default as popupSliceImport } from './popup-slice';
import { default as commonHooksFunctionSliceImport } from './common-hook-function-slice';
import { default as dropdownSliceImport } from './dropdown-slice';
import { default as functionSliceImport } from './function-slice';
import { default as actionRouteSliceImport } from './action-route-slice';
import { default as sideMenuItemsSliceImport } from './side-menu-items-slice';
import { default as setTableRowsSliceImport } from './set-table-rows-slice';
import { default as dataSliceImport } from './data-slice';
import { default as manualValidationResponseStatusSlice } from './manual-validation-response-status-slice';
import { default as setDropDownFunctionSlice } from './set-dropdown-functions-slice';
import { default as setRemarksFunctionSlice } from './set-remarks-functions-slice';
import { default as candidatePageSlice } from './candidate-page-slice';
import { default as appointeeStatusDetailsSlice } from './appointee-status-details-slice';

// Export all slices
export const LoggedinData = loginSlice;
export const LoggeoutData = logoutSlice;
export const LoggedinTokenData = loginTokenSlice;
export const ApiSlice = apiSlice;
export const popupSlice = popupSliceImport;
export const commonHooksFunctionSlice = commonHooksFunctionSliceImport;
export const dropdownSlice = dropdownSliceImport;
export const functionSlice = functionSliceImport;
export const actionRouteSlice = actionRouteSliceImport;
export const sideMenuItemsSlice = sideMenuItemsSliceImport;
export const setTableRowsSlice = setTableRowsSliceImport;
export const dataSlice = dataSliceImport;
export const ManualValidationResponseStatusSlice = manualValidationResponseStatusSlice;
export const SetDropDownFunctionSlice = setDropDownFunctionSlice;
export const SetRemarksFunctionSlice = setRemarksFunctionSlice;
export const CandidatePageSlice = candidatePageSlice;
export const AppointeeStatusDetailsData = appointeeStatusDetailsSlice; 