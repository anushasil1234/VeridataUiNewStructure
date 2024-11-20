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
  noPassBookMsg,
  toUpdateUser,
  verificationRemiderMsg,
} from "shared/constants/constants";
import UpdateAppointeeForm from "shared/components/form-dialog/update-appointee-data";
import CloseAppointeeAddRemarks from "shared/components/form-dialog/close-appointee-add-Remarks";
import { DDMMYYYY, filteredObjectProperty, GetAttribute, hasValue } from "..";
import downloadFile from "../associate/download-file";
import { useState } from "react";
 import exclamation from "assets/images/exclamation.png"

export const TableActionCell = (props1, props2) => {
  const { actionList, rowAttribute, actionPermissionList, setTableRows } =
    props1;
  console.log("actionlist", rowAttribute);
  const { appointeeId, userId: id, isPassbookVerified, uanNo } = rowAttribute;
  const commonHooksFunctionSlice = useSelector(
    (state) => state.commonHooksFunctionSlice
  );
  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const apiSlice = useSelector((state) => state.apiSlice);
  const popUpSlice = useSelector((state) => state.popUpSlice);
  const dropdownList = useSelector((state) => state.dropdownList);

  const { getAppointeeDetails } = apiSlice[0];
  const { navigateTo } = commonHooksFunctionSlice[0];
  const { openConfirmationModel, openVerify } = functionSlice[0];
  const { showErrorMessage } = popUpSlice[0];
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

  const {
    getPassbookFileData,
    postRemainderMail,
    postResendCredMail,
    deleteUserDetails,
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
    openConfirmationModel(
      confirmationModelContent,
      async () => await postRemainderMail(appointeeId, userId)
    );
  };

  const resendUserCredAppointee = async () => {
    const confirmationModelContent = {
      dialogContentText: credentialRemiderMsg,
    };
    openConfirmationModel(
      confirmationModelContent,
      async () => await postResendCredMail(appointeeId, userId)
    );
  };

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
  const handleCloseUserDetails = (event) => {
    const id = GetAttribute(event, "id");
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
  const [_isManualPassbook,setIsManualPassbook] = useState()
  const handleGetAppointeeDetails = async (appointeeId) => {
    const response = await getAppointeeDetails(appointeeId);
    console.log("res1111", response);
    const {
      appointeeName,
      dateOfBirth,
      gender,
      memberName,
      memberRelation,
      handicapeType,
      isHandicap,
      maratialStatus,
      qualification,
      appointeeEmailId,
      mobileNo,
      nationality,
      isFnameVarified,
      isUanVarified,
      isManualPassbook
    } = response?.responseInfo;
    setIsManualPassbook(isManualPassbook? isManualPassbook :NA)
    const personalInfo = {
      appointeeId,
      appointeeName: appointeeName ? appointeeName : NA,
      dateOfBirth: dateOfBirth ? DDMMYYYY(dateOfBirth) : NA,
      gender: gender ? filteredObjectProperty(genderList, gender) : NA,
      member: memberName ? memberName : NA,
      relationshipWithMember: memberRelation
        ? filteredObjectProperty(relationList, memberRelation)
        : NA,
      handicapType:
        isHandicap === "N" || !isHandicap
          ? NA
          : filteredObjectProperty(disabilityList, handicapeType),
      isPhysicallyHandicap: hasValue(isHandicap)
        ? isHandicap === "Y"
          ? "Yes"
          : "No"
        : NA,
      maritalStatus: maratialStatus
        ? filteredObjectProperty(maritalStatusList, maratialStatus)
        : NA,
      qualification: qualification
        ? filteredObjectProperty(qualificationList, qualification)
        : NA,
      email: appointeeEmailId ? appointeeEmailId : NA,
      mobileNo: mobileNo ? mobileNo : NA,
      nationality: nationality ? nationality : NA,
      isFnameVarified: isFnameVarified ? isFnameVarified : NA,
      isUanVerified: isUanVarified
        ? isUanVarified
        : isUanVarified === false
        ? isUanVarified
        : NA,
    };
    console.log("personalInfo", response);
    // const personalInfo = {
    //   appointeeId,
    //   appointeeName,
    //   dateOfBirth,
    //   gender,
    //   relationshipWithMember,
    //   member,
    //   handicapType,
    //   isPhysicallyHandicap,
    //   maritalStatus,
    //   qualification,
    //   email,
    //   mobileNo,
    //   nationality,
    //   isFnameVarified,
    //   isUanVerified
    // }
    openVerify(personalInfo);
  };
  console.log("personalInfo", _isManualPassbook);

  // const handleClick =(appointeeId)=>{
  //   handleGetAppointeeDetails(appointeeId)
  //   const personalInfo = {
  //     appointeeId,
  //     appointeeName: _appointeeName,
  //     dateOfBirth :_dateOfBirth,
  //     gender:_gender,
  //     member: _member,
  //     relationshipWithMember: _relationshipWithMember,
  //     handicapType :_handicapType,
  //     isPhysicallyHandicap :_isPhysicallyHandicap,
  //     maritalStatus : _maritalStatus,
  //     qualification : _qualification,
  //     email :_email,
  //     mobileNo : _mobileNo,
  //     nationality :_nationality,
  //     isFnameVarified :_isFnameVarified,
  //     isUanVerified : _isUanVerified,
  //   };
  //   console.log('personalInfo',personalInfo)
  //   // const personalInfo = {
  //   //   appointeeId,
  //   //   appointeeName,
  //   //   dateOfBirth,
  //   //   gender,
  //   //   relationshipWithMember,
  //   //   member,
  //   //   handicapType,
  //   //   isPhysicallyHandicap,
  //   //   maritalStatus,
  //   //   qualification,
  //   //   email,
  //   //   mobileNo,
  //   //   nationality,
  //   //   isFnameVarified,
  //   //   isUanVerified
  //   // }
  //   openVerify(personalInfo);
  // }
  let actionListData;

  actionListData =
    actionList &&
    actionList.map((action) => {
      return (
        <>
          {action === "VIEWDETAILS" ? (
            // && actionPermissionList && actionPermissionList['A001']
            <DarkTooltip placement="top" title={"Open Details"} arrow>
              <Fab
                mood="V"
                variant="contained"
                size="small"
                onClick={() => openViewModel(appointeeId)}
                sx={greenFabStyle}
              >
                <Article width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "VIEWUSERDETAILS" &&
          actionPermissionList &&
          actionPermissionList["A001"] ? (
            <DarkTooltip placement="top" title={"Open Details"} arrow>
              <Fab
                mood="V"
                variant="contained"
                size="small"
                onClick={() => openUserViewModel(id)}
                sx={greenFabStyle}
              >
                <Article width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "NOTIFYMAIL" ? (
            // && actionPermissionList && actionPermissionList['A005']
            <DarkTooltip placement="top" title={"Notify Appointee"} arrow>
              <Fab
                appointeeId={appointeeId}
                mood="V"
                variant="contained"
                size="small"
                button={"N"}
                onClick={notiFyAppointee}
                sx={primaryFabStyle}
              >
                <Notifications width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "MANUALVER" ? (
            // && actionPermissionList && actionPermissionList['A005']
            <DarkTooltip placement="top" title={"Manual Verification"} arrow>
              <Fab
                appointeeId={appointeeId}
                mood="V"
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => handleGetAppointeeDetails(appointeeId)}
                sx={{
                  background: 'linear-gradient(45deg, #7851A9, #5E3D8D)',
                  ...primaryFabStyle
                }}
             //   sx={ primaryFabStyle}
                //sx={{...buttonStyleSx}}
              >
                <img
                    src={exclamation}
                    alt="exclamation"
                    style={{ width: 20, height: 20 , filter: 'invert(1) brightness(100%)'}}
                  />
              </Fab>
              {/* <Button
                //  onClick={handelclick}
                  variant="contained"
                  sx={{...buttonStyleSx}}
                  startIcon={ <img
                    src={exclamation}
                    alt="exclamation"
                    style={{ width: 25, height: 25 , filter: 'invert(1) brightness(100%)'}}
                  />}
                >
                  verify manually
                </Button> */}
            </DarkTooltip>
          ) : null}
          {action === "MANUALREVER"  ? (
            // && actionPermissionList && actionPermissionList['A005']
            <DarkTooltip placement="top" title={"Manual Re-Verification"} arrow>
              <Fab
                appointeeId={appointeeId}
                mood="V"
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => handleGetAppointeeDetails(appointeeId)}
                sx={{
                  background: 'linear-gradient(45deg, #7851A9, #5E3D8D)',
                  ...primaryFabStyle
                }}
              >
                <img
                    src={exclamation}
                    alt="exclamation"
                    style={{ width: 20, height: 20 , filter: 'invert(1) brightness(100%)'}}
                  />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "USERMAILRESEND" ? (
            <DarkTooltip
              placement="top"
              title={"Resend Appointee Login Info"}
              arrow
            >
              <Fab
                appointeeId={appointeeId}
                mood="V"
                variant="contained"
                size="small"
                button={"N"}
                onClick={resendUserCredAppointee}
                sx={primaryFabStyle}
              >
                <MarkEmailReadIcon width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "CLOSEAPNTEE" ? (
            <DarkTooltip placement="top" title={"Cancel Appointee"} arrow>
              <Fab
                appointeeId={appointeeId}
                mood="V"
                variant="contained"
                size="small"
                button={"C"}
                onClick={handleClickOnCancel}
                sx={redFabStyle}
              >
                <Cancel width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "CLOSEUSERDETAILS" ? (
            <DarkTooltip placement="top" title={"Inactive User"} arrow>
              <Fab
                id={id}
                mood="V"
                variant="contained"
                size="small"
                button={"C"}
                onClick={handleCloseUserDetails}
                sx={redFabStyle}
              >
                <Cancel width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "DWNLDPSSBK" &&
          actionPermissionList &&
          actionPermissionList["A013"] ? (
            <DarkTooltip placement="top" title={"Download Passbook"} arrow>
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => downloadPassbook("EPFPSBK")}
                sx={primaryFabStyle}
              >
                <Download width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "VIEWPSSBK" &&
          actionPermissionList &&
          actionPermissionList["A012"] ? (
            <DarkTooltip placement="top" title={"EPFO Passbook"} arrow>
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => openPassbookViewModel(appointeeId)}
                sx={primaryFabStyle}
              >
                {/* <Article width={18} /> */}
                <MenuBook width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "VIEWPSSBK" &&
          actionPermissionList &&
          actionPermissionList["A012"] &&
          hasValue(uanNo) ? (
            <DarkTooltip
              placement="top"
              title={"EPFO Employment History"}
              arrow
            >
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => openEmploymentViewModel(appointeeId, userId)}
                sx={primaryFabStyle}
              >
                <AccountBox width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {(action === "DWNLDTRUSTPSSBK") &
          (rowAttribute.isTrustPFApplicable === true) ? (
            <DarkTooltip
              placement="top"
              title={"Download Trust Passbook"}
              arrow
            >
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => downloadPassbook("EPFPSBKTRUST")}
                sx={redFabStyle}
              >
                <Download width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "UPDTEAPNTEE" &&
          actionPermissionList &&
          actionPermissionList["A007"] ? (
            <DarkTooltip placement="top" title={"Edit Appointee"} arrow>
              <Fab
                variant="contained"
                size="small"
                onClick={() => UpdateDateOfJoin(rowAttribute)}
                sx={yellowFabStyle}
              >
                <Edit width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "UPDATEUSER" &&
          actionPermissionList &&
          actionPermissionList["A007"] ? (
            <DarkTooltip placement="top" title={"Edit User"} arrow>
              <Fab
                variant="contained"
                size="small"
                onClick={() => updateUser(rowAttribute)}
                sx={yellowFabStyle}
              >
                <Edit width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
        </>
      );
    });

  return <Stack flexDirection={"row"}>{actionListData}</Stack>;
};
