import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeApi } from "store/slices/api-slice";
import PfcRequiest from "server/utils/pfc-request";
import CommonHookFunctionWrapper from "shared/components/shared-hooks";
import {
  CON,
  DIS,
  FLT,
  GEN,
  ENTITY,
  GenerateUANOTP_URL,
  GetAppointeeActivity_URL,
  GetAppointeeDetails_URL,
  GetAppointeeStatusDetails_URL,
  GetCriticalAppointeeData_URL,
  GetDashboardWidgetCardData_URL,
  GetExpiredProcessFileData_URL,
  downloadLapsedList_URL,
  GetMastarDropdowndata_URL,
  GetMenuListData_URL,
  VerifyPassportDetails_URL,
  GetPfCreationApponteeReport_URL,
  GetProcessedEPFOData_URL,
  GetRawFileData_URL,
  GetRejectedFileData_URL,
  GetRemarks_URL,
  GetSetupConfigData_URL,
  GetUANNumber_URL,
  GetUnProcessedFileData_URL,
  GetUnderProcessFileData_URL,
  MAR,
  NAT,
  PostAppointeeApproved_URL,
  PostAppointeePensionAvailable_URL,
  PostAppointeeDetailsSave_URL,
  PostAppointeeFileDetails_URL,
  PostUpdatePfUanDetails_URL,
  PostAppointeeRejected_URL,
  PostAppointeeReprocess_URL,
  PostSetupConfigData_URL,
  QUA,
  RawDataProcess_URL,
  UANSubmitOTP_URL,
  UploadxlsFile_URL,
  VerifyPanDetails_URL,
  fileUploadSuccess,
  processStarted,
  toLinknotsent,
  toProcessing,
  toVerified,
  toCancelled,
  toLapseddata,
  GetTotalWidgetData_URL,
  GetTotalCriticalAppointee_URL,
  DownloadPassbookFile_URL,
  PostAppointeeClose_URL,
  appointteTerminationSuccess,
  PostRemainderMail_URL,
  remiderSuccessMsg,
  appointeeApproveSuccess,
  appointeePensionUpdateSuccess,
  appointeeRejectionSuccess,
  formSubmitionSuccess,
  AppointeeDetailsUpdate_URL,
  editSuccess,
  PostAppointeeSearch_URL,
  GetRemarksRemedyData_URL,
  configurationSuccessMsg,
  toLogin,
  GetAdminUserList_URL,
  RLE,
  CreateUser_URL,
  userCreationSuccessMsg,
  GetUserByUserId_URL,
  ValidateUserCode_URL,
  userUpdateSuccessMsg,
  UpdateAdminUser_URL,
  userDeletedSuccessMsg,
  RemoveAdminUser_URL,
  UploadUpdatexlsFile_URL,
  AppointeeCounterReport_URL,
  AppointeecounterBillingreport_URL,
  ValidateProfilePassword_URL,
  EditUserProfile_URL,
  passwordCreationSuccessMsg,
  ValidateUserLogIn_URL,
  UserSignInDetails_URL,
  ApiCounterReport_URL,
  GetReportFilterStatus_URL,
  PassbookDetails_URL,
  EmployementDetails_URL,
  AppointeeConsentUpdate_URL,
  AppointeePrerequisiteUpdate_URL,
  VerifyAadharViaXml_URL,
  GetFaqData_URL,
  PasswordChange_URL,
  AppointeeAgingFilterReport_URL,
  AppointeeNationalityReport_URL,
  ValidateUserByOtpForgetPassword_URL,
  ChangePasswordGenerateOTP_URL,
  AppointeeDataReport_URL,
  UserSignInDetailsByEmail_URL,
  PostCandidateMailResend_URL,
  downloadProcessingList_URL,
  downloadpfReport_URL,
  Postfileupload_URL,
  getUploadFileData_URL,
  UpdateAppointeeManualVerification_URL,
  dataSubmitionMsg,
  GetMannualVerificationData_URL,
  PostReuploadDocuments_URL,
  generateOtpSucces,
  SubmitOTP_URL,
  GenerateOTP_URL
} from "shared/constants/constants";
import { storeDropdownList } from "store/slices/dropdown-slice";
import downloadFile from "../associate/download-file";
// import { encryptedData, decryptedData } from "../associate/custom-encryption";
import { useLocation } from "react-router-dom";
import Modals from "shared/utils/app-wrapper/modal";
import { storeSetDropDownFunction } from "store/slices/set-dropdown-functions-slice";
import { getDropdownList } from "server/data-services/get-dropdown-list";
import showErrorMessage from "../associate/show-error-message";


const AppWrapper = (App) => {
  const Api = (props) => {
    const { PfcRequest, startLoader, stopLoader } = props;
    const apiSlice = useSelector((state) => state.apiSlice);
    const SetDropDownFunctionSlice = useSelector((state) => state.SetDropDownFunctionSlice);

    // API FUNCTOINS STARTS
    // const postExcel = async (payLoad) => {
    //   return await PfcRequest(
    //     UploadxlsFile_URL,
    //     "POST",
    //     payLoad,
    //     fileUploadSuccess
    //   );
    // };
    // const postUpdateExcel = async (payLoad) => {
    //   return await PfcRequest(
    //     UploadUpdatexlsFile_URL,
    //     "POST",
    //     payLoad,
    //     fileUploadSuccess
    //   );
    // }; // file created 
    // const getRawFileData = async (companyId, fileId) => {
    //   const url = GetRawFileData_URL(companyId, fileId);
    //   return await PfcRequest(url, "GET");
    // }; // file created
    // const postRawFileData = async (payLoad) => {
    //   return await PfcRequest(
    //     RawDataProcess_URL,
    //     "POST",
    //     payLoad,
    //     processStarted
    //   );
    // };// file created
    // const getDashboardWidgetCardData = async (_filterday, _isfilterd) => {
    //   const url = GetDashboardWidgetCardData_URL(_filterday, _isfilterd);
    //   return await PfcRequest(url, "GET");
    // };// file created
    // const getTotalWidgetData = async () => {
    //   return await PfcRequest(GetTotalWidgetData_URL, "GET", null, null, true);
    // };// file created
    // const getMenuList = async (userId) => {
    //   const url = `${GetMenuListData_URL}${userId}`;
    //   return await PfcRequest(url, "GET");
    // // };
    // const getLatestAppointees = async (type) => {
    //   const url = `${GetAppointeeStatusDetails_URL}${type}`;
    //   return await PfcRequest(url, "GET", null, null, true);
    // };// file created
    // const postLoginCredDetails = async (payLoad) => {
    //   return await PfcRequest(ValidateUserLogIn_URL, "POST", payLoad);
    // };
    // const postLoginByEmailDetails = async (email) => {
    //   return await PfcRequest(`${UserSignInDetailsByEmail_URL}${email}`, "POST", null, null, true);
    // };// file created
    // const postLoginDetails = async (payLoad) => {
    //   return await PfcRequest(UserSignInDetails_URL, "POST", payLoad);
    // };
    // const getVerifiedAppointeeList = async (payLoad) => {
    //   return await PfcRequest(GetProcessedEPFOData_URL, "POST", payLoad, null, true);
    // };// file created

    // const AppointeeDataPfFilteRList = async (payLoad) => {
    //   return await PfcRequest(downloadpfReport_URL, "POST", payLoad, null, true);
    // };// file created
    // const getRejectedAppointeeList = async (payLoad) => {
    //   const responseInfo = await PfcRequest(GetRejectedFileData_URL, "POST", payLoad, null, true);
    //   return responseInfo;
    // };// file created
    // const getCriticalAppointeeList = async (payLoad) => {
    //   const responseInfo = await PfcRequest(GetCriticalAppointeeData_URL, "POST", payLoad, null, true);
    //   return responseInfo;
    // };// file created
    // const getPfCreationAppointeeReportList = async (payLoad) => {
    //   const responseInfo = await PfcRequest(GetPfCreationApponteeReport_URL, "POST", payLoad, null, true);
    //   return responseInfo;
    // // };// file created
    // const getLinkNotSentList = async (payLoad) => {
    //   const responseInfo = await PfcRequest(GetUnProcessedFileData_URL, "POST", payLoad, null, true);
    //   return responseInfo;
    // };// file created
    // const getProessingDataList = async (payLoad) => {
    //   const responseInfo = await PfcRequest(GetUnderProcessFileData_URL, "POST", payLoad, null, true);
    //   return responseInfo;
    // };// file created
    // const getMannualVerificationDataList = async (payLoad) => {
    //   const responseInfo = await PfcRequest(GetMannualVerificationData_URL, "POST", payLoad, null, true);
    //   return responseInfo;
    // };// file created
    // const getLapsedDataList = async (payLoad) => {
    //   const responseInfo = await PfcRequest(GetExpiredProcessFileData_URL, "POST", payLoad, null, true);
    //   return responseInfo;
    // };// file created
    // const GetLapsedDataReport = async (payLoad) => {
    //   const responseInfo = await PfcRequest(downloadLapsedList_URL, "POST", payLoad, null, true);
    //   return responseInfo;
    // };// file created
    // const downloadReport = async (_url, payLoad) => {
    //   const response = await PfcRequest(_url, "POST", payLoad);
    //   if (response) {
    //     const { fileData, fileName } = response.responseInfo;
    //     const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileData}`;
    //     downloadFile(linkSource, fileName);
    //   }
    // };// file created
    // const downloadAgingExelReport = async (_url, payLoad) => {
    //   const response = await PfcRequest(_url, "POST", payLoad, null, true);
    //   if (response) {
    //     const { filedata } = response.responseInfo;
    //     const { fileData, fileName } = fileData;
    //     const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileData}`;
    //     downloadFile(linkSource, fileName);
    //   }
    // };// file created
    // const configerationSetUp = async (payLoad) => {
    //   return await PfcRequest(PostSetupConfigData_URL, "POST", payLoad, configurationSuccessMsg, true);
    // };// file created
    // const getConfigedData = async () => {
    //   return await PfcRequest(GetSetupConfigData_URL, "GET", null, null, true);
    // };// file created
    // const getGenderList = async () => {
    //   return await PfcRequest(`${GetMastarDropdowndata_URL}${GEN}`, "GET");
    // };// file created
    // const getNationalityList = async () => {
    //   return await PfcRequest(`${GetMastarDropdowndata_URL}${NAT}`, "GET");
    // };// file created
    // const getCountryList = async () => {
    //   return await PfcRequest(`${GetMastarDropdowndata_URL}${CON}`, "GET");
    // };// file created
    // const getMaritalStatusList = async () => {
    //   return await PfcRequest(`${GetMastarDropdowndata_URL}${MAR}`, "GET");
    // };// file created
    // const getDisabilityList = async () => {
    //   return await PfcRequest(`${GetMastarDropdowndata_URL}${DIS}`, "GET");
    // };// file created 
    // const getQualificationList = async () => {
    //   return await PfcRequest(`${GetMastarDropdowndata_URL}${QUA}`, "GET");
    // };// file created
    // const getFileTypeList = async () => {
    //   return await PfcRequest(`${GetMastarDropdowndata_URL}${FLT}`, "GET");
    // };// file created
    // const getEntityList = async () => {
    //   return await PfcRequest(`${GetMastarDropdowndata_URL}${ENTITY}`, "GET");
    // };// file created
    // const postAppointeeDetails = async (payLoad, successMsg) => {
    //   return await PfcRequest(PostAppointeeDetailsSave_URL, "POST", payLoad, successMsg);
    // };// file created
    // const getPassportDetails = async (payLoad) => {
    //   return await PfcRequest(VerifyPassportDetails_URL, "POST", payLoad);
    // };// file created
    // const verifyPANDetails = async (payLoad) => {
    //   return await PfcRequest(VerifyPanDetails_URL, "POST", payLoad);
    // // };// file created
    // const getRemarks = async (appointeeId) => {
    //   return await PfcRequest(`${GetRemarks_URL}${appointeeId}`, "GET");
    // };// file created
    // const postAppointeeFileDetails = async (payLoad) => {
    //   return await PfcRequest(PostAppointeeFileDetails_URL, "POST", payLoad, formSubmitionSuccess);
    // };// file created

    // const PostUpdatePfUanDetails = async (payLoad, successMsg) => {
    //   return await PfcRequest(PostUpdatePfUanDetails_URL, "POST", payLoad, successMsg);
    // };// file created


    // const getAppointeeDetails = async (appointeeId) => {
    //   return await PfcRequest(`${GetAppointeeDetails_URL}${appointeeId}`, "GET");
    // };// file created

    // const GetUploadedFileDetailsById = async (payLoad) => {
    //   return await PfcRequest(Postfileupload_URL, "POST", payLoad);
    // };// file created
    // const getAppointeeActivity = async (appointeeId) => {
    //   return await PfcRequest(`${GetAppointeeActivity_URL}${appointeeId}`, "GET");
    // };// file created
    // const postAppointeeReprocess = async (payLoad) => {
    //   return await PfcRequest(PostAppointeeReprocess_URL, "POST", payLoad);
    // };// file created
    // const postAppointeeRejected = async (payLoad) => {
    //   return await PfcRequest(PostAppointeeRejected_URL, "POST", payLoad, appointeeRejectionSuccess, true);
    // };// file created
    // const postAppointeeApproved = async (payLoad) => {
    //   return await PfcRequest(PostAppointeeApproved_URL, "POST", payLoad, appointeeApproveSuccess, true);
    // };// file created
    // const postAppointeePensionApplicable = async (payLoad) => {
    //   return await PfcRequest(PostAppointeePensionAvailable_URL, "POST", payLoad, appointeePensionUpdateSuccess, true);
    // };// file created
    // const getUANNumber = async (payLoad) => {
    //   return await PfcRequest(GetUANNumber_URL, "POST", payLoad);
    // };// file created
    // const verifyAadharDetails = async (payLoad) => {
    //   return await PfcRequest(VerifyAadharViaXml_URL, "POST", payLoad);
    // };// file created
    // const generateUANOtp = async (payLoad) => {
    //   return await PfcRequest(GenerateUANOTP_URL, "POST", payLoad);
    // };// file created
    // const getTotalCriticalAppointee = async () => {
    //   return await PfcRequest(GetTotalCriticalAppointee_URL, "GET", null, null, true);
    // };// file created
    // const submitUANOTP = async (payLoad) => {
    //   return await PfcRequest(UANSubmitOTP_URL, "POST", payLoad);
    // };// file created
    // const getPassbookFileData = async (payLoad) => {
    //   return await PfcRequest(DownloadPassbookFile_URL, "POST", payLoad);
    // };// file created
    // const postAppointeeClose = async (payLoad) => {
    //   return await PfcRequest(PostAppointeeClose_URL, "POST", payLoad, appointteTerminationSuccess, true);
    // };// file created
    // const postRemainderMail = async (appointeeId, userId) => {
    //   return await PfcRequest(PostRemainderMail_URL(appointeeId, userId), "POST", {}, remiderSuccessMsg, true);
    // };// file created
    // const postResendCredMail = async (appointeeId, userId) => {
    //   return await PfcRequest(PostCandidateMailResend_URL(appointeeId, userId), "POST", {}, remiderSuccessMsg, true);
    // };// file created
    // const appointeeDetailsUpdate = async (payLoad) => {
    //   return await PfcRequest(AppointeeDetailsUpdate_URL, "POST", payLoad, editSuccess);
    // };// file created
    // const postAppointeeSearch = async (searchInput) => {
    //   return await PfcRequest(`${PostAppointeeSearch_URL}${searchInput}`, "POST");
    // // };// file created
    // const getRemarksRemedyData = async (payLoad) => {
    //   return await PfcRequest(GetRemarksRemedyData_URL, "POST", payLoad);
    // };// file created
    // const getAdminUserDetails = async () => {
    //   return await PfcRequest(GetAdminUserList_URL, "GET", null, null, true);
    // };// file created
    // const postUserDetails = async (payLoad) => {
    //   return await PfcRequest(CreateUser_URL, "POST", payLoad, userCreationSuccessMsg);
    // };// file created
    const postUpdateUserDetails = async (payLoad) => {
      return await PfcRequest(UpdateAdminUser_URL, "POST", payLoad, userUpdateSuccessMsg);
    };// file created
    // const deleteUserDetails = async (id, userId) => {
    //   return await PfcRequest(RemoveAdminUser_URL(id, userId), "POST", null, userDeletedSuccessMsg);
    // };// file created
    const getRoleList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${RLE}`, "GET");
    };// file created
    // const getInputList = async (userId) => {
    //   return await PfcRequest(`${GetUserByUserId_URL}${userId}`, "GET");
    // };// file created
    // const validateUserCode = async (userCode) => {
    //   return await PfcRequest(`${ValidateUserCode_URL}${userCode}`, "POST");
    // };// file created
    // const getAppointeeCounterReport = async (payLoad) => {
    //   return await PfcRequest(AppointeeCounterReport_URL, "POST", payLoad, null, true);
    // };// file created
    // const getAppointeeCounterBillingReport = async (payLoad) => {
    //   return await PfcRequest(AppointeecounterBillingreport_URL, "POST", payLoad, null, true);
    // };// file created
    // const getApiCounterReport = async (fromDate, toDate) => {
    //   return await PfcRequest(ApiCounterReport_URL(fromDate, toDate), "POST");
    // };// file created

    // const getPassbookDetails = async (Id) => {
    //   return await PfcRequest(`${PassbookDetails_URL}${Id}`, "POST");
    // };// file created
    // const getEmployementDetails = async (appointeeId, userId) => {
    //   return await PfcRequest(EmployementDetails_URL(appointeeId, userId), "POST");
    // };// file created

    // const postProfilePassword = async (payLoad) => {
    //   return await PfcRequest(ValidateProfilePassword_URL, "POST", payLoad);
    // };// file created
    // const editUserProfileDetails = async (payLoad) => {
    //   return await PfcRequest(EditUserProfile_URL, "POST", payLoad, passwordCreationSuccessMsg);
    // // };// file created
    // const getReportFilterStatusList = async () => {
    //   return await PfcRequest(GetReportFilterStatus_URL, "GET");
    // };// file created

    // const postAppointeeConsent = async (payLoad) => {
    //   return await PfcRequest(AppointeeConsentUpdate_URL, "POST", payLoad);
    // };// file created
    // const postAppointeePrerequisiteStatus = async (payLoad) => {
    //   return await PfcRequest(AppointeePrerequisiteUpdate_URL, "POST", payLoad);
    // };// file created
    // const GetFaqData = async () => {
    //   return await PfcRequest(GetFaqData_URL, "GET");
    // };// file created
    // const postPasswordChange = async (payLoad) => {
    //   return await PfcRequest(PasswordChange_URL, "POST", payLoad);
    // }// file created
    // const getAppointeeAgingFilterReport = async (payLoad) => {
    //   return await PfcRequest(AppointeeAgingFilterReport_URL, "POST", payLoad, null, true);
    // };// file created
    // const getAppointeeNationalityReport = async (payLoad) => {
    //   return await PfcRequest(AppointeeNationalityReport_URL, "POST", payLoad, null, true);
    // };// file created
    // const getAppointeeDataReport = async (payLoad) => {
    //   return await PfcRequest(AppointeeDataReport_URL, "POST", payLoad, null, true);
    // };// file created
    // const ChangePasswordGenerateOTP = async (payLoad) => {
    //   return await PfcRequest(ChangePasswordGenerateOTP_URL, "POST", payLoad);
    // };// file created
    // const ValidateForgetPassweordUsrByOtp = async (payLoad) => {
    //   return await PfcRequest(ValidateUserByOtpForgetPassword_URL, "POST", payLoad);
    // };// file created
    // const GetUnderProcessReport = async (payLoad) => {
    //   const responseInfo = await PfcRequest(downloadProcessingList_URL, "POST", payLoad, null, true);
    //   return responseInfo
    // };// file created
    // const getUploadFileData = async (appointeeId) => {
    //   return await PfcRequest(`${getUploadFileData_URL}${appointeeId}`, "GET");
    // // }// file created
    // const UpdateAppointeeManualVerification = async (payLoad) => {
    //   return await PfcRequest(`${UpdateAppointeeManualVerification_URL}`, "POST", payLoad, dataSubmitionMsg);
    // }// file created
    // const PostReuploadDocuments = async (payLoad) => {
    //   return await PfcRequest(`${PostReuploadDocuments_URL}`, "POST", payLoad, dataSubmitionMsg);
    // }// file created
    // const GenerateAadharOtp = async (payLoad) => {
    //   console.log('payLoad23',payLoad);

    //   return await PfcRequest(`${GenerateOTP_URL}`, "POST", payLoad, generateOtpSucces);
    // }// file created
    // const PostAadharOtp = async (payLoad) => {
    //   return await PfcRequest(`${SubmitOTP_URL}`, "POST", payLoad, generateOtpSucces);
    // }// file created

    // const getAppointeeAgingFilterReport = async (payLoad) => {
    //   return await PfcRequest(AppointeeAgingFilterReport_URL, "POST", payLoad);
    // };



    const setDropdownListEvent = async () => {
      try {
        const dropdownList = await getDropdownList();
        dispatch(storeDropdownList(dropdownList));
      } catch (error) {
        showErrorMessage(error);
      }
    };
    useEffect(() => {

      window.addEventListener("set-dropdown-list", setDropdownListEvent);
      return () => {
        window.addEventListener("set-dropdown-list", setDropdownListEvent);
      }
    }, [])

    // const openRemarksModel  = functionSlice && functionSlice[0] && functionSlice[0].openRemarksModel;
    // console.log('openRemarksModel', );



    const dispatch = useDispatch();
    if (apiSlice && apiSlice.length === 0) {
      dispatch(
        storeApi({
          // getMenuList,
          // postExcel,
          // postUpdateExcel,
          // getRawFileData,
          // postRawFileData,
          // getDashboardWidgetCardData,
          // postLoginCredDetails,
          // postLoginByEmailDetails,
          // postLoginDetails,
          // getVerifiedAppointeeList,
          // AppointeeDataPfFilteRList,
          // downloadReport,
          // getLatestAppointees,
          // configerationSetUp,
          // getConfigedData,
          // getGenderList,
          // getNationalityList,
          // getCountryList,
          // getMaritalStatusList,
          // getDisabilityList,
          // getQualificationList,
          // postAppointeeDetails,
          // getAppointeeDetails,
          // GetUploadedFileDetailsById,
          // getAppointeeActivity,
          // postAppointeeReprocess,
          // getPassportDetails,
          // getRemarks,
          // postAppointeeFileDetails,
          // PostUpdatePfUanDetails,
          // postAppointeeRejected,
          // postAppointeeApproved,
          // postAppointeePensionApplicable,
          // getUANNumber,
          // getRejectedAppointeeList,
          // getCriticalAppointeeList,
          // getPfCreationAppointeeReportList,
          // getLinkNotSentList,
          // getProessingDataList,
          // getMannualVerificationDataList,
          // getLapsedDataList,
          // GetLapsedDataReport,
          // verifyAadharDetails,
          // generateUANOtp,
          // submitUANOTP,
          // verifyPANDetails,
          // getTotalWidgetData,
          // getTotalCriticalAppointee,
          // getPassbookFileData,
          // postAppointeeClose,
          // postRemainderMail,
          // postResendCredMail,
          // appointeeDetailsUpdate,
          // postAppointeeSearch,
          // getRemarksRemedyData,
          // getAdminUserDetails,
          // postUserDetails,
          // getInputList,
          // validateUserCode,
          // postUpdateUserDetails,
          // deleteUserDetails,
          // getAppointeeCounterReport,
          // getAppointeeCounterBillingReport,
          // getApiCounterReport,
          // postProfilePassword,
          // editUserProfileDetails,
          // getReportFilterStatusList,
          // postAppointeeConsent,
          // postAppointeePrerequisiteStatus,
          // getPassbookDetails,
          // getEmployementDetails,
          // GetFaqData,
          // postPasswordChange,
          // getAppointeeAgingFilterReport,
          // getAppointeeNationalityReport,
          // getAppointeeDataReport,
          // ChangePasswordGenerateOTP,
          // ValidateForgetPassweordUsrByOtp,
          // downloadAgingExelReport,
          // GetUnderProcessReport,
          // getUploadFileData,
          // UpdateAppointeeManualVerification,
          // PostReuploadDocuments,
          // GenerateAadharOtp,
          // PostAadharOtp
        })
      );
    }
    // console.log('functionSlice inside', functionSlice);

    // if (SetDropDownFunctionSlice && SetDropDownFunctionSlice.length === 0) {

    //   dispatch(
    //     storeSetDropDownFunction({
    //       setDropdownList
    //     })
    //   );
    // }




    return (
      <>
        <App />
        <Modals />
        {/* <ConfirmationModel
          open={confirmationModelOpen}
          confirmationModelContent={confirmationModelContent}
        />
        <ConfirmationYesNoModal
          open={confirmationYesNoModelOpen}
          confirmationYesNoModelContent={confirmationYesNoModelContent}
          handleClose={closeConfirmationYesNoModel}
        />
        <ConsentModal
          open={consentModalOpen}
          consentModalContent={consentModalContent}
        />
        <InfoModel
          open={infoModelOpen}
          confirmationModelContent={infoModelcontent}
        />
        <AppointeeView
          openViewModel={openViewModel}
          appointeeId={appointeeId}
          closeViewModel={closeViewModel}
          openView={isViewOpen}
        />
        <ManualverifidView
          openViewModel={openVerify}
          appointeePersonalDetails={appointeePersonalDetails}
          closeViewModel={closeVerify}
          openView={isManualVerificationViewOpen}
        />
        <PassbookView
          openViewModel={openPassbookViewModel}
          appointeeId={appointeeId}
          passbookDetails={passbookDetails}
          passbookStatusCode={passbookStatusCode}
          closeViewModel={closePassbookViewModel}
          openView={isPassbookViewOpen}
        />
        <EmploymentView
          openViewModel={openEmploymentViewModel}
          appointeeId={appointeeId}
          userId={userId}
          epfoDetails={epfoDetails}
          passbookStatusCode={passbookStatusCode}
          closeViewModel={closeEmploymentViewModel}
          openView={isEmploymentViewOpen}
        />
        <UserView
          userId={userId}
          closeViewModel={closeUserViewModel}
          openView={isUserViewOpen}
        />
        <OtpGenerationForm
          closeOtpForm={closeOtpForm}
          open={otpFormOpen}
          generateOtpProps={generateOtpProps}
        />
        <OtpSubmitionForm
          open={otpSubmitionModelOpen}
          otpSubmitionProps={otpSubmitionProps}
          closeOtpSubmitionModel={closeOtpSubmitionModel}
        />

        <RemarksInputModel
          open={isRemarksInputViewOpen}
          remarksInputModelProps={remarksInputModelProps}
          closeRemarksInputModel={closeRemarksInputModel}
        />

        <RemarksTable
          open={remarksModelOpen}
          remarksModelProps={remarksModelProps}
          closeRemarksModel={closeRemarksModel}
        />
        <SubmitModal
          openModal={submitModelOpen}
          submitmodalprops={submitModelProps}
          closeModel={closeSubmitModel}
        />
        <IssueRemedy
          open={remedyModelOpen}
          remedyModelProps={remedyModelProps}
          closeRemedyModel={closeRemedyModel}
        />
        <DocumentView
          open={documentModelOpen}
          documentModelProps={documentModelProps}
          closeDocumentModel={closeDocumentModel}
        />
        <UploadedDocumentView
          open={uploadedDocumentModelOpen}
          documentModelProps={uploadedDocumentModelProps}
          closeDocumentModel={closeUploadedDocumentModal}
        />
        <ProfilePasswordForm
          open={passwordSubmitionModelOpen}
          passwordSubmitionProps={passwordSubmitionProps}
          closePasswordSubmitionModel={closePasswordSubmitionModel}
        />
        <FilePasswordForm
          open={filePasswordSubmitionModelOpen}
          filePasswordSubmitionProps={filePasswordSubmitionProps}
          closeFilePasswordSubmitionModel={closeFilePasswordSubmitionModel}
        /> */}
        {/* <AppointeeView
          openViewModel={openViewModel}
          appointeeId={appointeeId}
          closeViewModel={closeViewModel}
          openView={isViewOpen}
        /> */}
      </>
    );
  };
  const WrappedApp = CommonHookFunctionWrapper(PfcRequiest(Api));
  return <WrappedApp />;
};
export default AppWrapper;
