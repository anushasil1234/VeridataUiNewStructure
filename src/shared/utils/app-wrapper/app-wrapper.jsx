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
  downloadLapsedList_URL ,
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
  formSaveSuccess,
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
  noRemarks,
  formSubmitionSuccess,
  AppointeeDetailsUpdate_URL,
  editSuccess,
  PostAppointeeSearch_URL,
  GetRemarksRemedyData_URL,
  noRemarksMsg,
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
  Postfileupload_URL
} from "shared/constants/constants";
import { storeDropdownList } from "store/slices/dropdown-slice";
import { storeFunction } from "store/slices/function-slice";
import AppointeeView from "modules/appointee/view/appointee-view";
import ManualverifidView from "modules/appointee/view/manual-verified-details-view"
import ConfirmationModel from "../models/confirmation-modal";
import ConsentModal from "../models/consent-modal";
import InfoModel from "../models/info-modal";
import OtpGenerationForm from "shared/components/otp/otp-generation/otp-generation";
import OtpSubmitionForm from "shared/components/otp/otp-submition/otp-submition";
import RemarksTable from "shared/components/remarks-table/remarks-table";
import SubmitModal from "../models/submit-modal";
import IssueRemedy from "../issue-remedy/issue-remedy";
import DocumentView from "shared/components/document-view/document-view";
import downloadFile from "../associate/download-file";
// import { encryptedData, decryptedData } from "../associate/custom-encryption";
import { useLocation } from "react-router-dom";
import UserView from "modules/user/user-view/user-view";
import ProfilePasswordForm from "shared/components/password-forms/password-form";
import FilePasswordForm from "shared/components/password-forms/file-password-form";
import PassbookView from "modules/appointee/view/passbook-details-view";
import EmploymentView from "modules/appointee/view/employment-details-view";
import RemarksInputModel from "../models/remarks-modal";
import ConfirmationYesNoModal from "../models/confirmation-modal-yes-no";


const AppWrapper = (App) => {
  const Api = (props) => {
    const { PfcRequest, startLoader, stopLoader } = props;

    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isManualVerificationViewOpen, setIsManualVerificationViewOpen] = useState(false);
    const [isPassbookViewOpen, setPassbookIsViewOpen] = useState(false);
    const [isEmploymentViewOpen, setEmploymentIsViewOpen] = useState(false);
    const [appointeeId, setAppointeeId] = useState();
    const [confirmationModelOpen, setConfirmationModelOpen] = useState(false);
    const [confirmationModelContent, setConfirmationModelContent] = useState();
    const [confirmationYesNoModelOpen, setConfirmationYesNoModelOpen] = useState(false);
    const [confirmationYesNoModelContent, setConfirmationYesNoModelContent] = useState();
    const [consentModalOpen, setConsentModalOpen] = useState(false);
    const [consentModalContent, setConsentModalContent] = useState();
    const [infoModelOpen, setInfoModelOpen] = useState(false);
    const [infoModelcontent, setInfoModelcontent] = useState();
    const [otpFormOpen, setOtpFormOpen] = useState(false);
    const [generateOtpProps, setGenerateOtpProps] = useState();
    const [otpSubmitionModelOpen, setOtpSubmitionModelOpen] = useState(false);
    const [isRemarksInputViewOpen, setRemarksInputViewOpen] = useState(false);
    const [otpSubmitionProps, setOtpSubmitionProps] = useState(false);
    const [remarksModelOpen, setRemarksModelOpen] = useState(false);
    const [remarksInputModelProps, setRemarksInputModelProps] = useState(false);
    const [remarksModelProps, setRemarksModelProps] = useState(false);
    const [submitModelProps, setSubmitModelProps] = useState(false);
    const [submitModelOpen, setSubmitModelOpen] = useState(false);
    const [remedyModelOpen, setRemedyModelOpen] = useState(false);
    const [remedyModelProps, setRemedyModelProps] = useState(false);
    const [passwordSubmitionModelOpen, setPasswordSubmitionModelOpen] = useState(false);
    const [passwordSubmitionProps, setPasswordSubmitionProps] = useState(false);
    const [filePasswordSubmitionModelOpen, setFilePasswordSubmitionModelOpen] = useState(false);
    const [filePasswordSubmitionProps, setFilePasswordSubmitionProps] = useState(false);
    const [documentModelOpen, setDocumentModelOpen] = useState(false);
    const [documentModelProps, setDocumentModelProps] = useState();
    const [userId, setUserId] = useState();
    const [isUserViewOpen, setIsUserViewOpen] = useState(false);

    const closeRemedyModel = () => {
      setRemedyModelOpen(false);
    };
    const openRemedyModel = ({ remarksId, remedyType, remedySubType }) => {
      setRemedyModelOpen(true);
      setRemedyModelProps({ remarksId, remedyType, remedySubType });
    };
    const openSubmitModel = (submitmodalcontent) => {
      setSubmitModelOpen(true);
      setSubmitModelProps({ submitmodalcontent });
    };
    const closeSubmitModel = () => {
      setSubmitModelOpen(false);
      setSubmitModelProps(null);
    };
    const openRemarksModel = (remarks) => {
      let remarksList;
      if (remarks && remarks.length > 0) {
        remarksList = remarks;
      } else {
        remarksList = [noRemarks];
      }
      setRemarksModelOpen(true);
      setRemarksModelProps({ remarksList });
    };
    const closeRemarksModel = () => {
      setRemarksModelOpen(false);
      setRemarksModelProps();
    };

    const openOtpSubmitionModel = (otpModelContent) => {
      setOtpSubmitionModelOpen(true);
      setOtpSubmitionProps(otpModelContent);
    };
    const closeOtpSubmitionModel = () => {
      setOtpSubmitionModelOpen(false);
    };

    const openRemarksInputModel = (remarks) => {
      setRemarksInputViewOpen(true);
      setRemarksInputModelProps(remarks);
    };
    const closeRemarksInputModel = () => {
      setRemarksInputViewOpen(false);
    };
    const openOtpForm = (
      generateOtpInput,
      generateOtpLable,
      generateOtpFunc,
      headerText
    ) => {
      setGenerateOtpProps({
        generateOtpInput,
        generateOtpLable,
        generateOtpFunc,
        headerText
      });
      setOtpFormOpen(true);
    };
    const closeOtpForm = () => {
      setOtpFormOpen(false);
      setGenerateOtpProps();
    };
    const closeInfoModel = () => {
      setInfoModelOpen(false);
      setInfoModelcontent();
    };
    const openInfoModel = (infoModelcontent, taskAfterClose) => {
      const handleClickOnOk = () => {
        taskAfterClose && taskAfterClose();
        closeInfoModel();
      };
      setInfoModelOpen(true);
      setInfoModelcontent({ ...infoModelcontent, handleClickOnOk });
    };
    const openConfirmationModel = (
      confirmationModelContent,
      confirmationCallBack
    ) => {
      const confirmedYes = () => {
        confirmationCallBack();
        closeConfirmationModel();
      };
      setConfirmationModelContent({
        ...confirmationModelContent,
        confirmedYes,
        closeConfirmationModel,
      });
      setConfirmationModelOpen(true);
    };

    const closeConfirmationModel = () => {
      setConfirmationModelOpen(false);
      setConfirmationModelContent();
    };

    const openConfirmationYesNoModal = (
      confirmationYesNoModelContent,
      confirmationYesCallBack,
      confirmationNoCallBack,

    ) => {
      const confirmedYes = () => {
        confirmationYesCallBack();
        closeConfirmationYesNoModel();
      };
      const confirmedNo = () => {
        confirmationNoCallBack();
        closeConfirmationYesNoModel();
      };
      setConfirmationYesNoModelContent({
        ...confirmationYesNoModelContent,
        confirmedYes,
        confirmedNo,
      });
      setConfirmationYesNoModelOpen(true);
    };

    const closeConfirmationYesNoModel = () => {
      setConfirmationYesNoModelOpen(false);
      setConfirmationYesNoModelContent();
    };
    const openConsentModal = (
      consentModalContent,
      consentCallBack
    ) => {
      setConsentModalContent({
        ...consentModalContent,
        consentCallBack,
        closeConsentModal,
      });
      setConsentModalOpen(true);
    };

    const closeConsentModal = () => {
      setConsentModalOpen(false);
      setConsentModalContent();
    };

    const openViewModel = (appointeeId) => {
      setAppointeeId(appointeeId);
      setIsViewOpen(true);
    };
    const openVerify=()=>{
      setAppointeeId(appointeeId);
      setIsManualVerificationViewOpen(true);
    }
    const closeVerify=()=>{
      setIsManualVerificationViewOpen(false)
    }
    const openPassbookViewModel = (appointeeId) => {
      setAppointeeId(appointeeId);
      setPassbookIsViewOpen(true);
    };

    const closePassbookViewModel = () => {
      setPassbookIsViewOpen(false);
    };
    const openEmploymentViewModel = (appointeeId, userId) => {
      setAppointeeId(appointeeId);
      setUserId(userId);
      setEmploymentIsViewOpen(true);
    };
    const closeEmploymentViewModel = () => {
      setEmploymentIsViewOpen(false);
    };
    const openUserViewModel = (userId) => {
      setUserId(userId);
      setIsUserViewOpen(true);
    };
    const closeUserViewModel = (userId) => {
      setIsUserViewOpen(false);
    };
    const closeViewModel = () => {
      setIsViewOpen(false);
    };
    const closeDocumentModel = () => {
      setDocumentModelOpen(false);
    };
    const openDocumentModel = (fileDetails, fileType) => {
      setDocumentModelOpen(true);
      setDocumentModelProps({ fileDetails, fileType });
    };
    const openPasswordSubmitionModel = (passwordModelContent) => {
      setPasswordSubmitionModelOpen(true);
      setPasswordSubmitionProps(passwordModelContent);
    };
    const closePasswordSubmitionModel = () => {
      setPasswordSubmitionModelOpen(false);
      setPasswordSubmitionProps(false);
    };
    const openFilePasswordSubmitionModel = (passwordModelContent) => {
      setFilePasswordSubmitionModelOpen(true);
      setFilePasswordSubmitionProps(passwordModelContent);
    };
    const closeFilePasswordSubmitionModel = () => {
      setFilePasswordSubmitionModelOpen(false);
      setFilePasswordSubmitionProps(false);
    };
    const { pathname } = useLocation();
    useEffect(() => {
      if (pathname === toLogin) {
        closeViewModel();
        closeUserViewModel();
        closeConfirmationModel();
        closeConsentModal();
        closeRemarksModel();
        closeDocumentModel();

        closeInfoModel();
        closeSubmitModel();
        closeRemedyModel();
        closeOtpForm();
        closePasswordSubmitionModel();
        closeFilePasswordSubmitionModel();
      }
    }, [pathname]);
   

    // API FUNCTOINS STARTS
    const postExcel = async (payLoad) => {
      return await PfcRequest(
        UploadxlsFile_URL,
        "POST",
        payLoad,
        fileUploadSuccess
      );
    };
    const postUpdateExcel = async (payLoad) => {
      return await PfcRequest(
        UploadUpdatexlsFile_URL,
        "POST",
        payLoad,
        fileUploadSuccess
      );
    };
    const getRawFileData = async (companyId, fileId) => {
      const url = GetRawFileData_URL(companyId, fileId);
      return await PfcRequest(url, "GET");
    };
    const postRawFileData = async (payLoad) => {
      return await PfcRequest(
        RawDataProcess_URL,
        "POST",
        payLoad,
        processStarted
      );
    };
    const getDashboardWidgetCardData = async (_filterday, _isfilterd) => {
      const url = GetDashboardWidgetCardData_URL(_filterday, _isfilterd);
      return await PfcRequest(url, "GET");
    };
    const getTotalWidgetData = async () => {
      return await PfcRequest(GetTotalWidgetData_URL, "GET", null, null, true);
    };
    const getMenuList = async (userId) => {
      const url = `${GetMenuListData_URL}${userId}`;
      return await PfcRequest(url, "GET");
    };
    const getLatestAppointees = async (type) => {
      const url = `${GetAppointeeStatusDetails_URL}${type}`;
      return await PfcRequest(url, "GET", null, null, true);
    };
    const postLoginCredDetails = async (payLoad) => {
      return await PfcRequest(ValidateUserLogIn_URL, "POST", payLoad);
    };
    const postLoginByEmailDetails = async (email) => {
      return await PfcRequest(`${UserSignInDetailsByEmail_URL}${email}`, "POST", null, null, true);
    };
    const postLoginDetails = async (payLoad) => {
      return await PfcRequest(UserSignInDetails_URL, "POST", payLoad);
    };
    const getVerifiedAppointeeList = async (payLoad) => {
      return await PfcRequest(GetProcessedEPFOData_URL, "POST", payLoad, null, true);
    };
    const AppointeeDataPfFilteRList = async (payLoad) => {
      return await PfcRequest( downloadpfReport_URL , "POST", payLoad, null, true);
    };
    const getRejectedAppointeeList = async (payLoad) => {
      const responseInfo = await PfcRequest(GetRejectedFileData_URL, "POST", payLoad, null, true);
      return responseInfo;
    };
    const getCriticalAppointeeList = async (payLoad) => {
      const responseInfo = await PfcRequest(GetCriticalAppointeeData_URL, "POST", payLoad, null, true);
      return responseInfo;
    };
    const getPfCreationAppointeeReportList = async (payLoad) => {
      const responseInfo = await PfcRequest(GetPfCreationApponteeReport_URL, "POST", payLoad, null, true);
      return responseInfo;
    };
    const getLinkNotSentList = async (payLoad) => {
      const responseInfo = await PfcRequest(GetUnProcessedFileData_URL, "POST", payLoad, null, true);
      return responseInfo;
    };
    const getProessingDataList = async (payLoad) => {
      const responseInfo = await PfcRequest(GetUnderProcessFileData_URL, "POST", payLoad, null, true);
      return responseInfo;
    };
    const getLapsedDataList = async (payLoad) => {
      const responseInfo = await PfcRequest(GetExpiredProcessFileData_URL, "POST", payLoad, null, true);
      return responseInfo;
    };
    const GetLapsedDataReport = async (payLoad) => {
      const responseInfo = await PfcRequest( downloadLapsedList_URL , "POST", payLoad, null, true);
      return responseInfo;
    };
    const downloadReport = async (_url, payLoad) => {
      const response = await PfcRequest(_url, "POST", payLoad);
      if (response) {
        const { fileData, fileName } = response.responseInfo;
        const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileData}`;
        downloadFile(linkSource, fileName);
      }
    };
    const downloadAgingExelReport = async (_url, payLoad) => {
      const response = await PfcRequest(_url, "POST", payLoad, null, true);
      if (response) {
        const { filedata } = response.responseInfo;
        const { fileData, fileName } = fileData;
        const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileData}`;
        downloadFile(linkSource, fileName);
      }
    };
    const configerationSetUp = async (payLoad) => {
      return await PfcRequest(PostSetupConfigData_URL, "POST", payLoad, configurationSuccessMsg, true);
    };
    const getConfigedData = async () => {
      return await PfcRequest(GetSetupConfigData_URL, "GET", null, null, true);
    };
    const getGenderList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${GEN}`, "GET");
    };
    const getNationalityList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${NAT}`, "GET");
    };
    const getCountryList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${CON}`, "GET");
    };
    const getMaritalStatusList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${MAR}`, "GET");
    };
    const getDisabilityList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${DIS}`, "GET");
    };
    const getQualificationList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${QUA}`, "GET");
    };
    const getFileTypeList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${FLT}`, "GET");
    };
    const getEntityList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${ENTITY}`, "GET");
    };
    const postAppointeeDetails = async (payLoad, successMsg) => {
      return await PfcRequest(PostAppointeeDetailsSave_URL, "POST", payLoad, successMsg);
    };
    const getPassportDetails = async (payLoad) => {
      return await PfcRequest(VerifyPassportDetails_URL, "POST", payLoad);
    };
    const verifyPANDetails = async (payLoad) => {
      return await PfcRequest(VerifyPanDetails_URL, "POST", payLoad);
    };
    const getRemarks = async (appointeeId) => {
      return await PfcRequest(`${GetRemarks_URL}${appointeeId}`, "GET");
    };
    const postAppointeeFileDetails = async (payLoad) => {
      return await PfcRequest(PostAppointeeFileDetails_URL, "POST", payLoad, formSubmitionSuccess);
    };

    const PostUpdatePfUanDetails = async (payLoad, successMsg) => {
      return await PfcRequest(PostUpdatePfUanDetails_URL, "POST", payLoad, successMsg);
    };


    const getAppointeeDetails = async (appointeeId) => {
      return await PfcRequest(`${GetAppointeeDetails_URL}${appointeeId}`, "GET");
    };

    const GetUploadedFileDetailsById = async (payLoad) => {
      return await PfcRequest(Postfileupload_URL, "POST",payLoad);
    };
    const getAppointeeActivity = async (appointeeId) => {
      return await PfcRequest(`${GetAppointeeActivity_URL}${appointeeId}`, "GET");
    };
    const postAppointeeReprocess = async (payLoad) => {
      return await PfcRequest(PostAppointeeReprocess_URL, "POST", payLoad);
    };
    const postAppointeeRejected = async (payLoad) => {
      return await PfcRequest(PostAppointeeRejected_URL, "POST", payLoad, appointeeRejectionSuccess, true);
    };
    const postAppointeeApproved = async (payLoad) => {
      return await PfcRequest(PostAppointeeApproved_URL, "POST", payLoad, appointeeApproveSuccess, true);
    };
     const postAppointeePensionApplicable = async (payLoad) => {
      return await PfcRequest(PostAppointeePensionAvailable_URL, "POST", payLoad, appointeePensionUpdateSuccess, true);
    };
    const getUANNumber = async (payLoad) => {
      return await PfcRequest(GetUANNumber_URL, "POST", payLoad);
    };
    const verifyAadharDetails = async (payLoad) => {
      return await PfcRequest(VerifyAadharViaXml_URL, "POST", payLoad);
    };
    const generateUANOtp = async (payLoad) => {
      return await PfcRequest(GenerateUANOTP_URL, "POST", payLoad);
    };
    const getTotalCriticalAppointee = async () => {
      return await PfcRequest(GetTotalCriticalAppointee_URL, "GET", null, null, true);
    };
    const submitUANOTP = async (payLoad) => {
      return await PfcRequest(UANSubmitOTP_URL, "POST", payLoad);
    };
    const getPassbookFileData = async (payLoad) => {
      return await PfcRequest(DownloadPassbookFile_URL, "POST", payLoad);
    };
    const postAppointeeClose = async (payLoad) => {
      return await PfcRequest(PostAppointeeClose_URL, "POST", payLoad, appointteTerminationSuccess, true);
    };
    const postRemainderMail = async (appointeeId, userId) => {
      return await PfcRequest(PostRemainderMail_URL(appointeeId, userId), "POST", {}, remiderSuccessMsg, true);
    };
    const postResendCredMail = async (appointeeId, userId) => {
      return await PfcRequest(PostCandidateMailResend_URL(appointeeId, userId), "POST", {}, remiderSuccessMsg, true);
    };
    const appointeeDetailsUpdate = async (payLoad) => {
      return await PfcRequest(AppointeeDetailsUpdate_URL, "POST", payLoad, editSuccess);
    };
    const postAppointeeSearch = async (searchInput) => {
      return await PfcRequest(`${PostAppointeeSearch_URL}${searchInput}`, "POST");
    };
    const getRemarksRemedyData = async (payLoad) => {
      return await PfcRequest(GetRemarksRemedyData_URL, "POST", payLoad);
    };
    const getAdminUserDetails = async () => {
      return await PfcRequest(GetAdminUserList_URL, "GET", null, null, true);
    };
    const postUserDetails = async (payLoad) => {
      return await PfcRequest(CreateUser_URL, "POST", payLoad, userCreationSuccessMsg);
    };
    const postUpdateUserDetails = async (payLoad) => {
      return await PfcRequest(UpdateAdminUser_URL, "POST", payLoad, userUpdateSuccessMsg);
    };
    const deleteUserDetails = async (id, userId) => {
      return await PfcRequest(RemoveAdminUser_URL(id, userId), "POST", null, userDeletedSuccessMsg);
    };
    const getRoleList = async () => {
      return await PfcRequest(`${GetMastarDropdowndata_URL}${RLE}`, "GET");
    };
    const getInputList = async (userId) => {
      return await PfcRequest(`${GetUserByUserId_URL}${userId}`, "GET");
    };
    const validateUserCode = async (userCode) => {
      return await PfcRequest(`${ValidateUserCode_URL}${userCode}`, "POST");
    };
    const getAppointeeCounterReport = async (payLoad) => {
      return await PfcRequest(AppointeeCounterReport_URL, "POST", payLoad, null, true);
    };
    const getApiCounterReport = async (fromDate, toDate) => {
      return await PfcRequest(ApiCounterReport_URL(fromDate, toDate), "POST");
    };

    const getPassbookDetails = async (Id) => {
      return await PfcRequest(`${PassbookDetails_URL}${Id}`, "POST");
    };
    const getEmployementDetails = async (appointeeId, userId) => {
      return await PfcRequest(EmployementDetails_URL(appointeeId, userId), "POST");
    };

    const postProfilePassword = async (payLoad) => {
      return await PfcRequest(ValidateProfilePassword_URL, "POST", payLoad);
    };
    const editUserProfileDetails = async (payLoad) => {
      return await PfcRequest(EditUserProfile_URL, "POST", payLoad, passwordCreationSuccessMsg);
    };
    const getReportFilterStatusList = async () => {
      return await PfcRequest(GetReportFilterStatus_URL, "GET");
    };

    const postAppointeeConsent = async (payLoad) => {
      return await PfcRequest(AppointeeConsentUpdate_URL, "POST", payLoad);
    };
    const postAppointeePrerequisiteStatus = async (payLoad) => {
      return await PfcRequest(AppointeePrerequisiteUpdate_URL, "POST", payLoad);
    };
    const GetFaqData = async () => {
      return await PfcRequest(GetFaqData_URL, "GET");
    };
    const postPasswordChange = async (payLoad) => {
      return await PfcRequest(PasswordChange_URL, "POST", payLoad);
    }
    const getAppointeeAgingFilterReport = async (payLoad) => {
      return await PfcRequest(AppointeeAgingFilterReport_URL, "POST", payLoad, null, true);
    };
    const getAppointeeNationalityReport = async (payLoad) => {
      return await PfcRequest(AppointeeNationalityReport_URL, "POST", payLoad, null, true);
    };
    const getAppointeeDataReport = async (payLoad) => {
      return await PfcRequest(AppointeeDataReport_URL, "POST", payLoad, null, true);
    };
    const ChangePasswordGenerateOTP = async (payLoad) => {
      return await PfcRequest(ChangePasswordGenerateOTP_URL, "POST", payLoad);
    };
    const ValidateForgetPassweordUsrByOtp = async (payLoad) => {
      return await PfcRequest(ValidateUserByOtpForgetPassword_URL, "POST", payLoad);
    };
    const GetUnderProcessReport = async (payLoad) => {
      const responseInfo=await PfcRequest(downloadProcessingList_URL, "POST", payLoad, null, true);
      return responseInfo
    };

    // const getAppointeeAgingFilterReport = async (payLoad) => {
    //   return await PfcRequest(AppointeeAgingFilterReport_URL, "POST", payLoad);
    // };

    const popUpSlice = useSelector((state) => state.popUpSlice);
    const apiSlice = useSelector((state) => state.apiSlice);
    const functionSlice = useSelector((state) => state.functionSlice);

    const showErrorMessage =
      popUpSlice && popUpSlice[0] && popUpSlice[0].showErrorMessage;
    const setDropdownList = async () => {
      startLoader();
      const nationalityList = await getNationalityList();
      const countryList = await getCountryList();
      const maritalStatusList = await getMaritalStatusList();
      const disabilityList = await getDisabilityList();
      const qualificationList = await getQualificationList();
      const fileTypeList = await getFileTypeList();
      const roleList = await getRoleList();
      const reportFilterStatusList = await getReportFilterStatusList();
      const entityList = await getEntityList();

      const dropdownList = {
        genderList: [
          { id: 1, code: "M", value: "MALE" },

          { id: 2, code: "F", value: "FEMALE" },

          { id: 3, code: "T", value: "OTHERS" }
        ],
        days: [
          {
            lable: "last 30 days",
            value: 30,
          },
          {
            lable: "last 60 days",
            value: 60,
          },
          {
            lable: "last 90 days",
            value: 90,
          },
          {
            lable: "more than 90 days",
            value: "A",
          }
        ],
        upcomingRecruitsStatusList: [
          {
            id: 1,
            type: "002",
            label: "Link not sent",
            route: toLinknotsent,
          },
          {
            id: 2,
            type: "001",
            label: "Under Process",
            route: toProcessing,
          },
          {
            id: 3,
            type: "003",
            label: "Verified",
            route: toVerified,
          },
          {
            id: 4,
            type: "004",
            label: "Cancelled",
            route: toCancelled,
          },
          {
            id: 5,
            type: "005",
            label: "Lapsed",
            route: toLapseddata,
          }
        ],
        nationalityList: nationalityList && nationalityList.responseInfos,
        countryList: countryList && countryList.responseInfos,
        maritalStatusList: maritalStatusList && maritalStatusList.responseInfos,
        disabilityList: disabilityList && disabilityList.responseInfos,
        qualificationList: qualificationList && qualificationList.responseInfos,
        fileTypeList: fileTypeList && fileTypeList.responseInfos,
        roleList: roleList && roleList.responseInfos,
        reportFilterStatusList: reportFilterStatusList && reportFilterStatusList.responseInfos,
        entityList: entityList && entityList.responseInfos,
        relationList: [
          {
            id: 1,
            code: "F",
            value: "Father"
          },
          {
            id: 2,
            code: "H",
            value: "Husband"
          }
        ]
      };
      stopLoader()
      dispatch(storeDropdownList(dropdownList));

    };

    const setRemarks = async (appointeeId) => {
      const response = await getRemarks(appointeeId);
      if (response.responseInfo && response.responseInfo.length > 0) {
        const remarks = response.responseInfo;
        openRemarksModel(remarks);
      } else {
        showErrorMessage(noRemarksMsg);
      }
    };

    const dispatch = useDispatch();
    if (apiSlice && apiSlice.length === 0) {
      dispatch(
        storeApi({
          getMenuList,
          postExcel,
          postUpdateExcel,
          getRawFileData,
          postRawFileData,
          getDashboardWidgetCardData,
          postLoginCredDetails,
          postLoginByEmailDetails,
          postLoginDetails,
          getVerifiedAppointeeList,
          AppointeeDataPfFilteRList ,
          downloadReport,
          getLatestAppointees,
          configerationSetUp,
          getConfigedData,
          getGenderList,
          getNationalityList,
          getCountryList,
          getMaritalStatusList,
          getDisabilityList,
          getQualificationList,
          postAppointeeDetails,
          getAppointeeDetails,
          GetUploadedFileDetailsById,
          getAppointeeActivity,
          postAppointeeReprocess,
          getPassportDetails,
          getRemarks,
          postAppointeeFileDetails,
          PostUpdatePfUanDetails,
          postAppointeeRejected,
          postAppointeeApproved,
          postAppointeePensionApplicable,
          getUANNumber,
          getRejectedAppointeeList,
          getCriticalAppointeeList,
          getPfCreationAppointeeReportList,
          getLinkNotSentList,
          getProessingDataList,
          getLapsedDataList,
          GetLapsedDataReport,
          verifyAadharDetails,
          generateUANOtp,
          submitUANOTP,
          verifyPANDetails,
          getTotalWidgetData,
          getTotalCriticalAppointee,
          getPassbookFileData,
          postAppointeeClose,
          postRemainderMail,
          postResendCredMail,
          appointeeDetailsUpdate,
          postAppointeeSearch,
          getRemarksRemedyData,
          getAdminUserDetails,
          postUserDetails,
          getInputList,
          validateUserCode,
          postUpdateUserDetails,
          deleteUserDetails,
          getAppointeeCounterReport,
          getApiCounterReport,
          postProfilePassword,
          editUserProfileDetails,
          getReportFilterStatusList,
          postAppointeeConsent,
          postAppointeePrerequisiteStatus,
          getPassbookDetails,
          getEmployementDetails,
          GetFaqData,
          postPasswordChange,
          getAppointeeAgingFilterReport,
          getAppointeeNationalityReport,
          getAppointeeDataReport,
          ChangePasswordGenerateOTP,
          ValidateForgetPassweordUsrByOtp,
          downloadAgingExelReport,
          GetUnderProcessReport
        })
      );
    }
    if (functionSlice && functionSlice.length === 0) {
      dispatch(
        storeFunction({
          setDropdownList,
          openViewModel,
          openVerify,
          openPassbookViewModel,
          closePassbookViewModel,
          openEmploymentViewModel,
          closeEmploymentViewModel,
          openUserViewModel,
          openConfirmationModel,
          openConfirmationYesNoModal,
          openConsentModal,
          openInfoModel,
          closeOtpForm,
          openOtpForm,
          openOtpSubmitionModel,
          openRemarksInputModel,
          closeRemarksInputModel,
          closeOtpSubmitionModel,
          openRemarksModel,
          openSubmitModel,
          closeSubmitModel,
          openRemedyModel,
          setRemarks,
          openDocumentModel,
          openPasswordSubmitionModel,
          closePasswordSubmitionModel,
          openFilePasswordSubmitionModel,
          closeFilePasswordSubmitionModel,
        })
      );
    }


    return (
      <>
        <App />
        <ConfirmationModel
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
          appointeeId={appointeeId}
          closeViewModel={closeVerify}
          openView={isManualVerificationViewOpen}
        />
        <PassbookView
          openViewModel={openPassbookViewModel}
          appointeeId={appointeeId}
          closeViewModel={closePassbookViewModel}
          openView={isPassbookViewOpen}
        />
        <EmploymentView
          openViewModel={openEmploymentViewModel}
          appointeeId={appointeeId}
          userId={userId}
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
        
        <ProfilePasswordForm
          open={passwordSubmitionModelOpen}
          passwordSubmitionProps={passwordSubmitionProps}
          closePasswordSubmitionModel={closePasswordSubmitionModel}
        />
        <FilePasswordForm
          open={filePasswordSubmitionModelOpen}
          filePasswordSubmitionProps={filePasswordSubmitionProps}
          closeFilePasswordSubmitionModel={closeFilePasswordSubmitionModel}
        />
      </>
    );
  };
  const WrappedApp = CommonHookFunctionWrapper(PfcRequiest(Api));
  return <WrappedApp />;
};
export default AppWrapper;
