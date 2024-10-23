
import { Grid, Typography, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/system";
import {
  Comment,
  RestartAlt,
  Security,
  ThumbDown,
  ThumbUp,
  Add,
  TaskAlt,
  WarningAmber,
} from "@mui/icons-material";
import FullScreenModel from "shared/utils/models/fullscreen-modal";
import {
  DATEDIFF,
  DDMMYYYY,
  DateFormatYYYYMMDD,
  FabIcon,
  filteredObjectProperty,
  hasValue,
  toggleActionMenu,
} from "shared/utils";
import {
  _addFabStyle,
  actionIconListStyle,
  actionIconStyle,
  cardStyle,
  documentListItemStyle,
  documentListStyle,
  floatingIconListStyle,
  gridContainerStyle,
  listHeadingConteinerStyle,
  listHeadingStyle,
  memberNameStyle,
  notVerifySuccessIconStyle,
  verifyFailedIconStyle,
  verifySuccessIconStyle,
} from "app";
import ActivityLogDetails from "./activity-log-details";
import { useDispatch, useSelector } from "react-redux";
import {
  NA,

  appointeerejetionConfirmationMsg,
  approveConfirmation,
  passportFileTypeAlias,
  handicapFileTypeAlias,
  trustEpfoFileTypeAlias,
  tenthCertificateFileTypeAlias,
  otherFileTypeAlias,
  remarksEmptyMsg,
  roleTypeEnums,
  epfoPassbookFileTypeAlias,
} from "shared/constants/constants";
import FabIconPropsModel from "shared/utils/fab-icon/fab-icon-model";
import TextSkelton1 from "shared/utils/skeltons/text-skelton/text-skelton1";
import { storeActionRoute } from "store/slices/action-route-slice";
import ActionPermission from "shared/components/action-permission/action-permission";
import {
  FieldName,
  FieldValue,
  PersonalInformation,
} from "shared/components/display-information/personal-information";
import RemarksInputModel from "shared/utils/models/remarks-modal";
import Button2 from "shared/utils/button/button2";
import viewImage from 'assets/images/profile/view_image.png';
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";


const DocumentDetails = ({ fieldName, fieldValue, isVerified }) => {
  return (
    <Stack sx={documentListStyle}>
      <Stack sx={documentListItemStyle}>
        <FieldName fieldValue={fieldValue} fieldName={fieldName} />
        <FieldValue fieldValue={fieldValue} />
      </Stack>
      {isVerified === true && <TaskAlt color="success" fontSize={"small"} />}
      {isVerified === false && (
        <WarningAmber color="error" fontSize={"small"} />
      )}
    </Stack>
  );
};


let AppointeeViewForm = ({
  appointeeStatus,
  appointeeId,
  closeViewModel,
  hasPermission
}) => {

  const loggedInData = useSelector((state) => state.loggedInData);
  const apiSlice = useSelector((state) => state.apiSlice);
  const dropdownList = useSelector((state) => state.dropdownList);
  const functionSlice = useSelector((state) => state.functionSlice);
  const popUpSlice = useSelector((state) => state.popUpSlice);

  const { showErrorMessage } = popUpSlice[0];
  const {
    openRemarksModel,
    setRemarks,
    openRemarksInputModel,
    closeRemarksInputModel,
    openDocumentModel
  } = functionSlice[0];
  const {
    relationList,
    qualificationList,
    disabilityList,
    maritalStatusList,
    genderList
  } = dropdownList.length > 0 && dropdownList[0];
  const { userTypeId, userId } = (loggedInData && loggedInData[0]) || {
    userTypeId: null,
    userId: null
  };
  const {
    postAppointeeRejected,
    postAppointeeApproved,
    getAppointeeDetails,
    getAppointeeActivity,
    getRemarks
  } = apiSlice[0];
  const [UAN, setUAN] = useState(null);
  const [uanNumber, setUanNumber] = useState(null);
  const [appointeeName, setAppointeeName] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [dateOfJoining, setDateOfJoining] = useState(null);
  const [gender, setGender] = useState(null);
  const [member, setMember] = useState(null);
  const [relationshipWithMember, setRelationshipWithMember] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);
  const [email, setEmail] = useState(null);
  const [nationality, setNationality] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [isInterNationalWorker, setisInterNationalWorker] = useState(null);
  const [countryOfOrigin, setCountryOfOrigin] = useState(null);
  const [passportNo, setPassportNo] = useState(null);
  const [passportValidFromDate, setPassportValidFromDate] = useState(null);
  const [passportValidTillDate, setPassportValidTillDate] = useState(null);
  const [isPhysicallyHandicap, setIsPhysicallyHandicap] = useState(null);
  const [handicapType, setHandicapType] = useState(null);
  const [pan, setPan] = useState(null);
  const [nameAsOnPan, setNameAsOnPan] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [nameAsOnAadhar, setNameAsOnAadhar] = useState(null);
  const [visaFile, setVisaFile] = useState();
  const [handicapFile, setHandicapFile] = useState();
  const [tenFile, setTenFile] = useState();
  const [otherFile, setOtherFile] = useState();
  const [trustPfFile, setTrustPfFile] = useState();
  const [manualPassbookFile, setManualPassbookFile] = useState();
  const [isdocumentVerified, setIsDocumentVerified] = useState(null);
  const [isUanVerified, setIsUanVerified] = useState(null);
  // const [isEmployementVarified, setIsEmployementVarified] = useState(null);

  const [isPanVarified, setIsPanVarified] = useState(null);
  const [isAadharVerified, setIsAadharVerified] = useState(null);
  const [isPassportAvailable, setIsPassportAvailable] = useState(null);
  //const [isHandicap, setIsHandicap] = useState(null);
  const [isProcessed, setIsProcessed] = useState(null);
  const [degreeOfRotation, setDegreeOfRotation] = useState(0);
  const [timelineStates, setTimelineStates] = useState([]);
  const [actionIconListDisplay, setActionIconListDisplay] = useState(false);
  const [isSaveStep, setIsSaveStep] = useState(null);
  const [isTrustPassbook, setIsTrustPassbook] = useState(null);
  const [isManualPassbook, setIsManualPassbook] = useState(null);

  console.log("appointeeStatus", appointeeStatus)


  const dispatch = useDispatch();

  const actionsAfterProcess = (actionRoute) => {
    closeViewModel();
    dispatch(storeActionRoute({ actionRoute }));
  };

  const reject = async (remarks) => {
    showErrorMessage();
    if (hasValue(remarks)) {
      const payLoad = {
        appointeeId,
        remarks: remarks,
        userId
      };
      const response = await postAppointeeRejected(payLoad);
      if (response) {
        actionsAfterProcess("reject");
      }
      closeRemarksInputModel();
    } else {
      showErrorMessage(remarksEmptyMsg);
    }
  };
  const approve = async (remarks) => {
    showErrorMessage();
    if (hasValue(remarks)) {
      const payLoad = {
        appointeeId: appointeeId,
        userId: userId,
        remarks: remarks
      };
      const response = await postAppointeeApproved(payLoad);
      if (response) {
        actionsAfterProcess("approve");
      }
      closeRemarksInputModel();

    } else {
      showErrorMessage(remarksEmptyMsg);
    }
  };



  const setAppointeeDetails = async () => {
    const response = await getAppointeeDetails(appointeeId);
    if (response) {
      const {
        maskedUANNumber,
        uanNumber,
        appointeeName,
        dateOfBirth,
        dateOfJoining,
        gender,
        memberName,
        memberRelation,
        mobileNo,
        appointeeEmailId,
        nationality,
        qualification,
        maratialStatus,
        isPassportAvailable,
        isInternationalWorker,
        originCountry,
        maskedPassportNo,
        passportValidFrom,
        passportValidTill,
        isHandicap,
        handicapeType,
        aadhaarNumberView,
        aadhaarName,
        panName,
        maskedPANNumber,
        fileUploaded,
        isAadhaarVarified,
        isPanVarified,
        isUanVarified,
        // isEmployementVarified,
        isProcessed,
        saveStep,
        isTrustPassbook,
        isManualPassbook
      } = response.responseInfo;
      setIsManualPassbook(isManualPassbook);
      maskedUANNumber ? setUAN(maskedUANNumber) : setUAN(NA);
      uanNumber ? setUanNumber(uanNumber) : setUanNumber(null)
      isPanVarified
        ? setIsPanVarified(isPanVarified)
        : isPanVarified === false
          ? setIsPanVarified(isPanVarified)
          : setIsPanVarified(NA);
      isProcessed ? setIsProcessed(isProcessed) : setIsProcessed(false);
      // isEmployementVarified ? setIsEmployementVarified(isEmployementVarified) : setIsEmployementVarified(null);
      appointeeName ? setAppointeeName(appointeeName) : setAppointeeName(NA);
      isUanVarified
        ? setIsUanVerified(isUanVarified)
        : isUanVarified === false
          ? setIsUanVerified(isUanVarified)
          : setIsUanVerified(NA);
      isPassportAvailable
        ? setIsPassportAvailable(isPassportAvailable)
        : setIsPassportAvailable(NA);
      memberName ? setMember(memberName) : setMember(NA);
      dateOfBirth ? setDateOfBirth(DDMMYYYY(dateOfBirth)) : setDateOfBirth(NA);
      dateOfJoining
        ? setDateOfJoining(DDMMYYYY(dateOfJoining))
        : setDateOfJoining(NA);
      gender
        ? setGender(filteredObjectProperty(genderList, gender))
        : setGender(NA);
      memberRelation
        ? setRelationshipWithMember(
          filteredObjectProperty(relationList, memberRelation)
        )
        : setRelationshipWithMember(NA);
      mobileNo ? setMobileNo(mobileNo) : setMobileNo(NA);
      appointeeEmailId ? setEmail(appointeeEmailId) : setEmail(NA);
      nationality ? setNationality(nationality) : setNationality(NA);
      qualification
        ? setQualification(
          filteredObjectProperty(qualificationList, qualification)
        )
        : setQualification(NA);
      maratialStatus
        ? setMaritalStatus(
          filteredObjectProperty(maritalStatusList, maratialStatus)
        )
        : setMaritalStatus(NA);
      hasValue(isInternationalWorker)
        ? isInternationalWorker === "Y"
          ? setisInterNationalWorker("Yes")
          : isPassportAvailable === "Y"
            ? setisInterNationalWorker("No")
            : setisInterNationalWorker(NA)
        : setisInterNationalWorker(NA);
      isAadhaarVarified
        ? setIsAadharVerified(isAadhaarVarified)
        : isAadhaarVarified === false
          ? setIsAadharVerified(isAadhaarVarified)
          : setIsAadharVerified(NA);
      if (isAadhaarVarified && isUanVarified) {
        setIsDocumentVerified(true);
      }
      if (isAadhaarVarified === false || isUanVarified === false) {
        setIsDocumentVerified(false);
      }
      if (isAadhaarVarified === null && isUanVarified === null) {
        setIsDocumentVerified(null);
      }
      if (isPassportAvailable === "N") {
        setPassportNo(NA);
        setPassportValidFromDate(NA);
        setPassportValidTillDate(NA);
        setCountryOfOrigin(NA);
      } else {
        maskedPassportNo ? setPassportNo(maskedPassportNo) : setPassportNo(NA);
        passportValidFrom
          ? setPassportValidFromDate(DDMMYYYY(passportValidFrom))
          : setPassportValidFromDate(NA);
        passportValidTill
          ? setPassportValidTillDate(DDMMYYYY(passportValidTill))
          : setPassportValidTillDate(NA);
        originCountry
          ? setCountryOfOrigin(originCountry)
          : setCountryOfOrigin(NA);
      }
      hasValue(isHandicap)
        ? isHandicap === "Y"
          ? setIsPhysicallyHandicap("Yes")
          : setIsPhysicallyHandicap("No")
        : setIsPhysicallyHandicap(NA);
      isHandicap === "N" || !isHandicap
        ? setHandicapType(NA)
        : setHandicapType(
          filteredObjectProperty(disabilityList, handicapeType)
        );

      aadhaarNumberView ? setAadhar(aadhaarNumberView) : setAadhar(NA);
      aadhaarName ? setNameAsOnAadhar(aadhaarName) : setNameAsOnAadhar(NA);
      maskedPANNumber ? setPan(maskedPANNumber) : setPan(NA);
      panName ? setNameAsOnPan(panName) : setNameAsOnPan(NA);
      setIsSaveStep(saveStep);
      if (isTrustPassbook === true) {
        setIsTrustPassbook('Yes');
      } else if (isTrustPassbook === false) {
        setIsTrustPassbook('No');
      } else {
        setIsTrustPassbook(NA);
      }

      fileUploaded.forEach(
        ({ uploadTypeAlias, mimeType, fileData, fileName }) => {
          const fileDetails = `data:${mimeType};base64,${fileData}`;
          const file = {
            fileDetails,
            fileName,
          };

          if (uploadTypeAlias === tenthCertificateFileTypeAlias) {
            setTenFile(file);
          }
          if (uploadTypeAlias === otherFileTypeAlias) {
            setOtherFile(file);
          }

          if (uploadTypeAlias === passportFileTypeAlias) {
            setVisaFile(file);
          }
          if (uploadTypeAlias === handicapFileTypeAlias) {
            setHandicapFile(file);
          }
          if (uploadTypeAlias === trustEpfoFileTypeAlias) {
            setTrustPfFile(file);
          }
          if (uploadTypeAlias === epfoPassbookFileTypeAlias) {
            setManualPassbookFile(file);
          }
        }
      );
    }
  };

  // console.log("isEmployementVarified", isEmployementVarified)
  const setAppointeeActivity = async () => {
    const response = await getAppointeeActivity(appointeeId);
    if (response) {
      setTimelineStates(response.responseInfos);
    }
  };
  useEffect(() => {
    if (appointeeId) {
      setAppointeeDetails();
      setAppointeeActivity();
    }
  }, [appointeeId]);

  const handleClickOnReview = async () => {
    const response = await getRemarks(appointeeId);
    if (response && response.responseInfo && response.responseInfo.length > 0) {
      const remarks = response.responseInfo;
      openRemarksModel(remarks);
    }
  };

  // console.log("uanNumber",uanNumber)

  console.log("isTrustPassbook", isTrustPassbook)
  console.log("isUanVerified", isUanVerified)

  console.log("isPhysicallyHandicap", isPhysicallyHandicap)

  console.log("isPassportAvailable", isPassportAvailable)

  let verifyIconStyle;
  if (isdocumentVerified === null) {
    verifyIconStyle = notVerifySuccessIconStyle;
  }
  if (isdocumentVerified === true) {
    verifyIconStyle = verifySuccessIconStyle;
  }
  if (isdocumentVerified === false) {
    verifyIconStyle = verifyFailedIconStyle;
  }

  let addFabStyle = {
    ..._addFabStyle,
    transform: `rotate(${degreeOfRotation}deg)`,
  };
  const handleToggleActionList = () => {
    const value = toggleActionMenu(degreeOfRotation, actionIconListDisplay);
    setDegreeOfRotation(value.degreeOfRotation);
    setActionIconListDisplay(value.actionIconListDisplay);
  };

  const handleApprove = async () => {
    const confirmationModelContent = {
      dialogContentText: approveConfirmation,
      dialogComponent: <RemarksInputModel />,
      dialogFunction: (remarks) => {
        approve(remarks);
      },
    };
    openRemarksInputModel(confirmationModelContent);
  };
  const handleReject = () => {


    const currDate = DateFormatYYYYMMDD(new Date());
    const joinDate = DateFormatYYYYMMDD(dateOfJoining);
    const datetojoin = DATEDIFF(currDate, joinDate);

    const confirmationModelContent = {
      dialogContentText: `Candidate still has ${datetojoin} days left to complete verification process. ${appointeerejetionConfirmationMsg}`,
      dialogComponent: <RemarksInputModel />,
      dialogFunction: (remarks) => {
        reject(remarks);
      },
    };
    openRemarksInputModel(confirmationModelContent);
  };
  const handleRprocess = () => {
  };

  const addFabProps = new FabIconPropsModel(
    addFabStyle,
    handleToggleActionList,
    "primary",
    "add",
    <Add />,
    "Open action"
  );


  const approveFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleApprove,
    "success",
    "thumsup",
    <ThumbUp />,
    "Manuall override"
  );
  const rejectFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleReject,
    "error",
    "thumsdown",
    <ThumbDown />,
    "Cancel"
  );
  const reprocessFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleRprocess,
    "warning",
    "reprocess",
    <RestartAlt />,
    "Reprocess"
  );
  const remarksFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleClickOnReview,
    "info",
    "remarks",
    <Comment />,
    "Remarks"
  );
  const getVerificationChip = () => {
    const chipProps = {
      sx: { mx: "3px", fontWeight: 500, color: "#ffffff" },
    };

    const { label, color } = isAadharVerified === false
      ? { label: "Aadhaar Verification failed", color: "error" }
      : isPanVarified === false
        ? { label: "PAN Verification failed", color: "error" }
        : isUanVerified === false && isManualPassbook === true
          ? { label: "Manual Passbook Uploaded", color: "warning" }
          : isUanVerified === false
            ? { label: "UAN Verification failed", color: "error" }
            : isAadharVerified === "N/A"
              ? { label: "Aadhaar Verification Pending", color: "warning" }
              : isPanVarified === "N/A"
                ? { label: "PAN Verification Pending", color: "warning" }
                : isUanVerified === "N/A"
                  ? { label: "UAN Verification Pending", color: "warning" }
                  : isUanVerified === true && !hasValue(uanNumber)
                    ? { label: "No UAN Available", color: "success" }
                    : { label: null, color: null };

    return label ? <Chip {...chipProps} label={label} color={color} /> : null;
  };



  return (
    <Box bgcolor={"#E2E8F0"} sx={{ position: "relative" }}>
      <Box sx={gridContainerStyle}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ overflow: "hidden", borderRadius: "8px" }}
          >
            <Box sx={cardStyle} onClick={() => setRemarks(appointeeId)}>
              <Stack alignItems={"center"}>
                <Box>
                  <Security sx={verifyIconStyle} />
                </Box>
                <Box>
                  {isSaveStep === 1 ? (
                    <>
                      {getVerificationChip()}
                    </>
                  ) : null}
                </Box>
              </Stack>

              <Typography sx={memberNameStyle}>
                {appointeeName ? appointeeName : <TextSkelton1 />}
              </Typography>
            </Box>
            <Box sx={{ ...cardStyle }}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>Document Details</Typography>
              </Stack>
              <DocumentDetails
                isVerified={isAadharVerified}
                fieldName={"Aadhaar Name"}
                fieldValue={nameAsOnAadhar}
              />
              <DocumentDetails
                isVerified={isAadharVerified}
                fieldName={"Aadhaar Number"}
                fieldValue={aadhar}
              />

              <DocumentDetails
                isVerified={isUanVerified}
                fieldName={"UAN Number"}
                fieldValue={UAN}
              />
              <DocumentDetails
                isVerified={isPanVarified}
                fieldName={"PAN Number"}
                fieldValue={pan}
              />
              <DocumentDetails
                isVerified={isPanVarified}
                fieldName={"Name on PAN"}
                fieldValue={nameAsOnPan}
              />
              <DocumentDetails
                fieldName={"Trust PF"}
                fieldValue={isTrustPassbook}
              />
              {isTrustPassbook === "Yes" && trustPfFile && (
                <DocumentDetails
                  fieldName={"Trust PF File"}
                  fieldValue={
                    <DarkTooltip placement="right" title="View image" arrow>

                      <img
                        src={viewImage}
                        alt="Trust Pf File"
                        title="View image"
                        style={{
                          width: "2vw", // or use "5vw" to make it responsive to the viewport width
                          height: "auto", // Keeps the aspect ratio intact
                        }}
                        //style={{ width: "30px", height: "30px" }} // Adjust size as needed
                        onClick={() => openDocumentModel(trustPfFile, "Trust Pf")}
                      />
                    </DarkTooltip>

                  }
                />
              )}
              {isManualPassbook === true && manualPassbookFile && (
                <DocumentDetails
                  fieldName={"Epfo passbook file"}
                  fieldValue={
                    <DarkTooltip placement="right" title="View image" arrow>

                      <img
                        src={viewImage}
                        alt="Epfo passbook file"
                        title="View image"
                        style={{
                          width: "2vw", // or use "5vw" to make it responsive to the viewport width
                          height: "auto", // Keeps the aspect ratio intact
                        }}
                        //style={{ width: "30px", height: "30px" }} // Adjust size as needed
                        onClick={() => openDocumentModel(manualPassbookFile, "Epfo passbook file")}
                      />
                    </DarkTooltip>

                  }
                />
              )}
            </Box>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>Passport Details</Typography>
              </Stack>
              {isPassportAvailable === "Y" ? (
                <>
                  <DocumentDetails
                    fieldName={"International Worker"}
                    fieldValue={isInterNationalWorker}
                  />
                  <DocumentDetails
                    fieldName={"Country of Origin"}
                    fieldValue={countryOfOrigin}
                  />
                  <DocumentDetails
                    fieldName={"Passport Number"}
                    fieldValue={passportNo}
                  />
                  <DocumentDetails
                    fieldName={"Passport Issue Date"}
                    fieldValue={passportValidFromDate}
                  />
                  <DocumentDetails
                    fieldName={"Passport Expiry Date"}
                    fieldValue={passportValidTillDate}
                  />
                  {visaFile &&
                    <DocumentDetails
                      fieldName={"Passport File"}
                      fieldValue={
                        <DarkTooltip placement="right" title="View image" arrow>

                          <img
                            src={viewImage}
                            alt="Passport File"

                            style={{
                              width: "2vw", // or use "5vw" to make it responsive to the viewport width
                              height: "auto", // Keeps the aspect ratio intact
                            }}
                            // style={{ width: "30px", height: "30px" }} // Adjust size as needed
                            onClick={() => openDocumentModel(visaFile, "Passport")}
                          />
                        </DarkTooltip>

                      }
                    />
                  }
                </>
              ) : (
                <DocumentDetails
                  fieldName={"Passport Available"}
                  fieldValue="No"
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={5.5}>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>
                  Personal Information
                </Typography>
              </Stack>
              <Grid container spacing={0}>
                <PersonalInformation
                  fieldName={"Name"}
                  fieldValue={appointeeName}
                />
                <PersonalInformation
                  fieldName={"Date of Birth"}
                  fieldValue={dateOfBirth}
                />
                <PersonalInformation fieldName={"Gender"} fieldValue={gender} />
                <PersonalInformation
                  fieldName={"Father's / Husband's Name"}
                  fieldValue={member}
                />
                <PersonalInformation
                  fieldName={"Relationship with Member"}
                  fieldValue={relationshipWithMember}
                />
                <PersonalInformation
                  fieldName={"Nationality"}
                  fieldValue={nationality}
                />
                <PersonalInformation
                  fieldName={"Mobile"}
                  fieldValue={mobileNo}
                />
                <PersonalInformation fieldName={"Email"} fieldValue={email} />
                <PersonalInformation
                  fieldName={"Qualification"}
                  fieldValue={qualification}
                />
                <PersonalInformation
                  fieldName={"Marital Status"}
                  fieldValue={maritalStatus}
                />
                <PersonalInformation
                  fieldName={"Physically Handicaped"}
                  fieldValue={isPhysicallyHandicap}
                />
                {isPhysicallyHandicap === "Yes" && (
                  <>
                    <PersonalInformation
                      fieldName={"Handicap Type"}
                      fieldValue={
                        handicapType ?
                          handicapType : NA
                      }
                    />

                    <PersonalInformation
                      fieldName={"Handicap Certificate"}
                      fieldValue={
                        handicapFile ?
                          <>
                            <DarkTooltip placement="right" title="View image" arrow>
                              <img
                                src={viewImage}
                                alt="Handicap Certificate"
                                style={{
                                  width: "2vw", // or use "5vw" to make it responsive to the viewport width
                                  height: "auto", // Keeps the aspect ratio intact
                                  marginLeft: "2%", // Relative margin for responsiveness
                                  marginTop: "0.5rem" // Responsive margin based on font size
                                }}
                                //style={{ width: "30px", height: "30px",marginLeft: "15px",marginTop:"5px" }} // Adjust size as needed
                                onClick={() => openDocumentModel(handicapFile, "Handicap Certificate")}
                              />
                            </DarkTooltip>
                          </> :
                          NA
                      }
                    />
                  </>
                )}
              </Grid>
            </Box>
            <Box sx={cardStyle}>
              <Stack sx={listHeadingConteinerStyle}>
                <Typography sx={listHeadingStyle}>Other Information</Typography>
              </Stack>
              <Grid container spacing={0}>
                <PersonalInformation
                  fieldName={"Date of Joining"}
                  fieldValue={dateOfJoining}
                />
                <PersonalInformation
                  fieldName={"10th Pass Certificate"}
                  fieldValue={
                    tenFile ? (
                      <DarkTooltip placement="right" title="View image" arrow>
                        <img
                          src={viewImage}
                          alt="10th Pass Certificate"
                          style={{
                            width: "2vw", // Adjust as needed for responsiveness
                            height: "auto", // Maintains aspect ratio
                            marginLeft: "5%", // Responsive margin
                            marginTop: "0.5rem" // Responsive margin
                          }}
                          onClick={() => openDocumentModel(tenFile, "10th Pass Certificate")}
                        />
                      </DarkTooltip>
                    ) : (
                      <Typography variant="subtitle2" color="black" style={{ marginLeft: "5%", fontSize: '1rem' }}>
                        N/A
                      </Typography>

                    )
                  }
                />


                <PersonalInformation
                  fieldName={"Father's Name Verification Document"}
                  fieldValue={
                    otherFile ? (
                      <DarkTooltip placement="right" title="View image" arrow>

                        <img
                          src={viewImage}
                          alt="Father's name Verification Document"
                          style={{
                            width: "2vw", // or use "5vw" to make it responsive to the viewport width
                            height: "auto", // Keeps the aspect ratio intact
                            marginLeft: "5%", // Relative margin for responsiveness
                            marginTop: "0.8rem" // Responsive margin based on font size
                          }}
                          //style={{ width: "30px", height: "30px",marginLeft: "15px",marginTop:"5px" }} // Adjust size as needed
                          onClick={() => openDocumentModel(otherFile, "Father's name Verification Document")}
                        />
                      </DarkTooltip>
                    ) : (
                      <Typography variant="subtitle2" color="black" style={{ marginLeft: "5%", fontSize: '1rem' }}>
                        N/A
                      </Typography>

                    )

                  }
                />
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Box sx={{ margin: "1rem 0" }}>
              <ActivityLogDetails activityStatus={timelineStates} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {!roleTypeEnums.candidate.includes(userTypeId) ? (
        <Stack sx={floatingIconListStyle}>
          {appointeeStatus === "P" || appointeeStatus === "R" ? (
            <FabIcon
              props={{
                ...remarksFabProps,
                selectedIndex: 1,
                index: 1,
                placement: "left-end",
                size: "small",
              }}
            />
          ) : (
            <>
              <FabIcon props={{ ...addFabProps, selectedIndex: 1, index: 1 }} />
              {actionIconListDisplay ? (
                <Stack sx={{ ...actionIconListStyle }}>
                  {isProcessed !== true ? (
                    <>
                      {isSaveStep && isSaveStep > 0
                        ? hasPermission &&
                        hasPermission["A002"] && (
                          <FabIcon
                            props={{
                              ...approveFabProps,
                              selectedIndex: 1,
                              index: 1,
                              placement: "left-end",
                              size: "small",
                            }}
                          />
                        )
                        : null}
                      {hasPermission && hasPermission["A003"] && (
                        <FabIcon
                          props={{
                            ...rejectFabProps,
                            selectedIndex: 1,
                            index: 1,
                            placement: "left-end",
                            size: "small",
                          }}
                        />
                      )}
                      {hasPermission && hasPermission["A010"] && (
                        <FabIcon
                          props={{
                            ...reprocessFabProps,
                            selectedIndex: 3,
                            index: 3,
                          }}
                        />
                      )}
                    </>
                  ) : null}
                  <FabIcon
                    props={{ ...remarksFabProps, selectedIndex: 4, index: 4 }}
                  />
                </Stack>
              ) : null}
            </>
          )}
        </Stack>
      ) : null}
    </Box>
  );
};

const UnWrappedAppointeeView = (props) => {
  return (
    <FullScreenModel
      headerText={"Appointee Details"}
      open={props.openView}
      fullScreen={true}
      closeModel={props.closeViewModel}
      content={<AppointeeViewForm {...props} />}
    />
  );
};

const AppointeeView = ActionPermission(UnWrappedAppointeeView);

export default AppointeeView;



