import { Button, Fab, Stack, Typography } from "@mui/material";
import DarkTooltip from "../tooltip/dark-tooltip";
import {
  AccountBox,
  Article,
  Cancel,
  ContactMail,
  Download,
  Edit,
  ForwardToInbox,
  ForwardToInboxOutlined,
  MenuBook,
  Notifications,
  Verified,
  VerifiedRounded,
} from "@mui/icons-material";

import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import {
  buttonStyleSx,
  greenFabStyle,
  primaryFabStyle,
  redFabStyle,
  yellowFabStyle,
} from "app";
import { useSelector } from "react-redux";
import {
  credentialRemiderMsg,
  NA,
  noEmployementMsg,
  noPassBookMsg,
  toMannualVerification,
  toUpdateUser,
  verificationRemiderMsg,
} from "shared/constants/constants";
import UpdateAppointeeForm from "shared/components/form-dialog/update-appointee-data";
import CloseAppointeeAddRemarks from "shared/components/form-dialog/close-appointee-add-Remarks";
import { DDMMYYYY, filteredObjectProperty, GetAttribute, hasValue } from "..";
import downloadFile from "../associate/download-file";
import { useState } from "react";
import exclamation from "assets/images/exclamation.png"
import ViewFab from "shared/fabs/ViewFab";
import RedirectFab from "shared/fabs/RedirectFab";
import NotifyFab from "shared/fabs/NotifyFab";
import ExclamationFab from "shared/fabs/ExclamationFab";
import EmailFab from "shared/fabs/EmailFab";
import CancelFab from "shared/fabs/CancelFab";
import DownLoadFab from "shared/fabs/DownLoadFab";
import MenuBookFab from "shared/fabs/MenuBookFab";
import AccountBoxFab from "shared/fabs/AccountBoxFab";
import EditFab from "shared/fabs/EditFab";
import { deleteUserDetails, getEmploymentDetails, getPassbookDetails, getPassbookFileData, postRemainderMail, postResendCredMail } from "server/apis";
import showErrorMessage from "../associate/show-error-message";

export const TableActionCell = (props1, props2) => {
  const { actionList, rowAttribute, actionPermissionList, setTableRows } = props1;

  const { appointeeId, userId: id, isPassbookVerified, uanNo, passbookStatusCode, verificationStatusCode } = rowAttribute;
  const commonHooksFunctionSlice = useSelector(
    (state) => state.commonHooksFunctionSlice
  );
  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const apiSlice = useSelector((state) => state.apiSlice);
  // const popUpSlice = useSelector((state) => state.popUpSlice);
  const dropdownList = useSelector((state) => state.dropdownList);
  // const {
  //   //  getPassbookDetails, 
  //   getEmployementDetails } = apiSlice[0];
  const { getAppointeeDetails } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { openConfirmationModel, openVerify } = functionSlice[0];
  // console.log('functionSlice[0]', functionSlice[0])

  // const { showErrorMessage } = popUpSlice[0];
  const { openViewModel, openUserViewModel } = functionSlice[0];
  const { openSubmitModel } = functionSlice[0];
  const { openPassbookViewModel, openEmploymentViewModel } = functionSlice[0];
  const {
    relationList,
    qualificationList,
    disabilityList,
    maritalStatusList,
    genderList,
  } = dropdownList.length > 0 && dropdownList[0];
  const [isPassbookAvailable, setIsPassbookAvailable] = useState(true);
  const [isEmploymentAvailable, setIsEmploymentAvailable] = useState(true);
  const {
    // getPassbookFileData,
    // postRemainderMail,
    // postResendCredMail,
    // deleteUserDetails,
  } = apiSlice[0];
  const { userId } = loggedInData[0];
  const downloadPassbook = async (pasbooktype) => {
    const payLoad = {
      appointeeId: appointeeId,
      type: pasbooktype,
      userId,
    };
    const response = await getPassbookFileData(payLoad);
    if (response) {
      const { fileData, fileName, fileType } = response.responseInfo;

      if (fileData) {
        const base64String = `data:${fileType};base64, ${fileData}`;
        downloadFile(base64String, fileName);
      } else {
        showErrorMessage(noPassBookMsg);
      }
    }
  };
  const UpdateDateOfJoin = async (rowAttribute) => {
    const submitmodalcontent = {
      dialogComponent: <UpdateAppointeeForm props={rowAttribute} />,
      dialogTitle: "Edit Appointee",
    };
    openSubmitModel(submitmodalcontent);
  };

  const notiFyAppointee = async () => {
    const confirmationModelContent = {
      dialogContentText: verificationRemiderMsg,
    };
    console.log('openConfirmationModel', openConfirmationModel);

    openConfirmationModel(
      confirmationModelContent,
      async () => await postRemainderMail(appointeeId, userId)
    );
  };

  const resendUserCredAppointee = async () => {
    const confirmationModelContent = {
      dialogContentText: credentialRemiderMsg,
    };
    console.log("openConfirmationModel");

    openConfirmationModel(
      confirmationModelContent,
      async () => await postResendCredMail(appointeeId, userId)
    );
  };
  const handlePassbookView = async (appointeeId) => {
    try {
      const response = await getPassbookDetails(appointeeId);
      const { pfUan, companies } = response?.responseInfo || {};
      if (pfUan && pfUan.length >= 12  && Array.isArray(companies) && companies.length > 0) {
         const passbookDetails=response.responseInfo
        openPassbookViewModel(appointeeId,passbookDetails,passbookStatusCode);
      } else {
        if (passbookStatusCode === "MNL") {
          const passbookDetails=null
          openPassbookViewModel(appointeeId,passbookDetails,passbookStatusCode);
          // showErrorMessage(noPassBookMsg);
          // setIsPassbookAvailable(false);
          return;
        }
        // setIsPassbookAvailable(false);
        // showErrorMessage(noPassBookMsg);

      }
    } catch (error) {
      setIsPassbookAvailable(false);
      showErrorMessage("Failed to fetch passbook details. Please try again.");
    }
  };

  const handleEpfoView = async (appointeeId, userId) => {
    try {
      const response = await getEmploymentDetails(appointeeId, userId);
      const { pfUan, companies } = response?.responseInfo || {};
      if (pfUan && Array.isArray(companies) && companies.length > 0) {
        const epfoDetails = response.responseInfo
        openEmploymentViewModel(appointeeId, userId, epfoDetails,passbookStatusCode);
      } else {
        if (passbookStatusCode === "MNL") {
          const epfoDetails=null
          openEmploymentViewModel(appointeeId,userId,epfoDetails,passbookStatusCode);
          // showErrorMessage(noPassBookMsg);
          // setIsPassbookAvailable(false);
          return;
        }
        // setIsEmploymentAvailable(false)
        showErrorMessage(noEmployementMsg);
      }
    } catch (error) {
      setIsEmploymentAvailable(false)
      showErrorMessage("Failed to fetch epfo details.");
    }
  }
  const handleClickOnCancel = () => {
    const submitmodalcontent = {
      dialogComponent: <CloseAppointeeAddRemarks />,
      dialogTitle: "Cancle Appointee",
    };
    openSubmitModel(submitmodalcontent);
  };
  const handleDelete = async (id) => {
    const response = await deleteUserDetails(id, userId);
    if (response) {
      setTableRows();
    }
  };
  const handleCloseUserDetails = (id) => {
    // const id = GetAttribute(event, "id");
    const dialogComponent = (
      <Typography mt={2}>Do you want to delete the user?</Typography>
    );
    const confirmationModelContent = {
      dialogComponent,
    };
    openConfirmationModel(confirmationModelContent, () => handleDelete(id));
  };
  const updateUser = (rowAttribute) => {
    navigateTo(toUpdateUser, { state: rowAttribute });
  };
  // const [_isManualPassbook,setIsManualPassbook] = useState()
  const handleGetAppointeeDetails = async (appointeeId) => {

    const personalInfo = {
      appointeeId,
      
    };
    

    openVerify(personalInfo);
  };


  
  let actionListData;


  actionListData =
    actionList &&
    actionList.map((action) => {
      return (
        <>
          {action === "VIEWDETAILS"
            && actionPermissionList && actionPermissionList['A001']
            ? (
              <ViewFab onClick={() => openViewModel(appointeeId)} title={"Open Details"} />
            ) : null}
          {action === "VIEWUSERDETAILS" &&
            actionPermissionList &&
            actionPermissionList["A001"] ? (
            <ViewFab onClick={() => openUserViewModel(id)} title={"Open Details"} />
          ) : null}
          {action === "REDIRECTMANVER" && ["MV", "MRV", "RD"].includes(verificationStatusCode)
            && actionPermissionList &&
            actionPermissionList['A016']
            ? (
              <RedirectFab
                onClick={() => navigateTo(`${toMannualVerification}`, { state: verificationStatusCode })}
                tooltip={"Visit Manual Verification Page"} />
            ) : null}
          {action === "NOTIFYMAIL"
            && actionPermissionList && actionPermissionList['A005']
            ? (
              <NotifyFab onClick={notiFyAppointee} title={"Notify Appointee"} />
            ) : null}
          {action === "MANUALVER"
            && actionPermissionList && actionPermissionList['A015']
            ? (
              <ExclamationFab onClick={() => handleGetAppointeeDetails(appointeeId)} title={"Manual Verification"} />
            ) : null}
          {action === "MANUALREVER"
            && actionPermissionList && actionPermissionList['A015']
            ? (
              <ExclamationFab onClick={() => handleGetAppointeeDetails(appointeeId)} title={"Manual Re-Verification"} />
            ) : null}
          {action === "USERMAILRESEND" ? (
            <EmailFab onClick={() => resendUserCredAppointee()} title={"Resend Appointee Login Info"} />
          ) : null}
          {action === "CLOSEAPNTEE" ? (
            <CancelFab onClick={handleClickOnCancel} title={"Cancel Appointee"} />
          ) : null}
          {action === "CLOSEUSERDETAILS" ? (
            <CancelFab onClick={(e) => handleCloseUserDetails(id)} title={"Inactive User"} />
          ) : null}
          {action === "DWNLDPSSBK" &&
            actionPermissionList &&
            actionPermissionList["A013"] ? (
            <DownLoadFab onClick={() => downloadPassbook("EPFPSBK")} title={"Download Passbook"} />
          ) : null}
          {action === "VIEWPSSBK" &&
            actionPermissionList &&
            actionPermissionList["A012"] && uanNo &&
            uanNo.length >= 12 ? (
            <MenuBookFab title={"EPFO Passbook"} onClick={() => handlePassbookView(appointeeId)} disabled={!isPassbookAvailable} />
          ) : null}
          {action === "VIEWPSSBK" &&
            actionPermissionList &&
            actionPermissionList["A012"] &&
            hasValue(uanNo) ? (
            <AccountBoxFab title={"EPFO Employment History"} onClick={() => handleEpfoView(appointeeId, userId)} disabled={!isEmploymentAvailable} />
          ) : null}
          {(action === "DWNLDTRUSTPSSBK") &
            (rowAttribute.isTrustPFApplicable === true) ? (
            <DownLoadFab onClick={() => downloadPassbook("EPFPSBKTRUST")} title={"Download Trust Passbook"} sx={redFabStyle} />
          ) : null}
          {action === "UPDTEAPNTEE" &&
            actionPermissionList &&
            actionPermissionList["A007"] ? (
            <EditFab onClick={() => UpdateDateOfJoin(rowAttribute)} title={"Edit Appointee"} />
          ) : null}
          {action === "UPDATEUSER" &&
            actionPermissionList &&
            actionPermissionList["A007"] ? (
            <EditFab onClick={() => updateUser(rowAttribute)} title={"Edit User"} />
          ) : null}
        </>
      );
    });
  console.log('actionListData', actionListData);

  return <Stack flexDirection={"row"}>{actionListData}</Stack>;
};
