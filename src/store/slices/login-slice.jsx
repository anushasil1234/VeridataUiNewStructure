import { createSlice } from "@reduxjs/toolkit"
const loginBase = {
    "userId": Number,
    "userCode": String,
    "userName": String,
    "password": String,
    "emailId": String,
    "phone": String,
    "roleId": Number,
    "roleName": String,
    "userTypeId": Number,
    "companyId": Number,
    "companyName": String,
    "consentStatus": Number,
    "isConsentProcessed": Boolean || null,
    "isPrerequisiteDataAvailable": Boolean || null,
    "isProcessed": Boolean || null,
    "isSubmit": Boolean || null,
    "appointeeId": Number || null,
    "status": String,
    "isSetProfilePassword": Boolean || null,
    "isDefaultPassword": Boolean || null,
    "isPasswordExpire": Boolean || null
};
const LoggedinData = createSlice({
    name: "loggedinData",
    initialState: [],
    reducers: {
        storeLoggedinData(state, action) {
            state.push(action.payload);
        },
        removeLoggedinData(state, action) {
            state.pop();
        },
    }
})

export default LoggedinData.reducer
export const { storeLoggedinData, removeLoggedinData } = LoggedinData.actions;