import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  DATEDIFF,
  DDMMYYYY,
  DateFormatYYYYMMDD,
  filteredObjectProperty,
  hasValue,
  toggleActionMenu,
} from 'shared/utils';
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
  pensionConfirmation,
  epfoServiceHistoryFileTypeAlias,
  toMannualVerification,
  remarksissuemessage,
  noPassBookMsg,
  noEmployementMsg,
  AadhaarProfileImageTypeAlias,
  imageFileTypeAlias,
  remarksError,
} from 'shared/constants/constants';
import { storeActionRoute } from 'store/slices/action-route-slice';
import RemarksInputModel from 'shared/utils/modals/remarks-modal';
import {
  getAppointeeActivity,
  getAppointeeDetails,
  getEmploymentDetails,
  getPassbookDetails,
  getRemarks,
  getUploadedFileDetailsById,
  postAppointeeApproved,
  postAppointeePensionApplicable,
  postAppointeeRejected,
} from 'server/apis';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import FabIconPropsModel from 'shared/utils/fab-icon/fab-icon-model';
import { Add, ThumbUp, ThumbDown, RestartAlt, Comment, PermMedia, MenuBook, AccountBox } from '@mui/icons-material';
import {
  _addFabStyle,
  actionIconStyle,
  notVerifySuccessIconStyle,
  verifySuccessIconStyle,
  verifyFailedIconStyle,
  subHeadingContentTextStyle,
} from 'app';

export function useAppointeeViewLogic({ appointeeStatus, appointeeId, closeViewModel, hasPermission }) {
  // Redux selectors
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const { t: translationFunction } = useTranslation();
  const t = !loggedInData[0] || loggedInData[0]?.roleId === 5 ? translationFunction : (key) => key;
  const apiSlice = useSelector((state) => state.apiSlice);
  const dropdownList = useSelector((state) => state.dropdownList);
  const functionSlice = useSelector((state) => state.functionSlice);
  const setRemarksFunctionSlice = useSelector((state) => state.SetRemarksFunctionSlice);
  const setRemarks =
    setRemarksFunctionSlice && setRemarksFunctionSlice[0] && setRemarksFunctionSlice[0].setRemarks;
  const { navigateTo } = commonHooksFunctionSlice[0];
  const {
    openRemarksModel,
    openRemarksInputModel,
    closeRemarksInputModel,
    openConfirmationYesNoModal,
    openDocumentModel,
    openVerify,
    openPassbookViewModel,
    openEmploymentViewModel,
  } = functionSlice[0];
  const { relationList } = dropdownList.length > 0 && dropdownList[0];
  const { userTypeId, userId } = (loggedInData && loggedInData[0]) || {
    userTypeId: null,
    userId: null,
  };
  // State
  const [isLoading, setIsLoading] = useState(false);
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
  const [EPFOServiceHistoryFile, setEPFOServiceHistoryFile] = useState();
  const [isdocumentVerified, setIsDocumentVerified] = useState(null);
  const [isUanVerified, setIsUanVerified] = useState(null);
  const [isFnameVarified, setIsFnameVarified] = useState(null);
  const [manualVerificationStatus, setManualVerificationStatus] = useState();
  const [isManualVerifiedViewOpen, setIsManualVerifiedViewOpen] = useState(false);
  const openManualVerifiedView = () => setIsManualVerifiedViewOpen(true);
  const closeManualVerifiedView = () => setIsManualVerifiedViewOpen(false);
  const [isPanVarified, setIsPanVarified] = useState(null);
  const [isAadharVerified, setIsAadharVerified] = useState(null);
  const [isPassportAvailable, setIsPassportAvailable] = useState(null);
  const [isDLVarified, setIsDLVarified] = useState(null);
  const [isDLAvailable, setIsDLAvailable] = useState(null);
  const [drivingLicense, setDrivingLicense] = useState(null);
  const [isProcessed, setIsProcessed] = useState(null);
  const [degreeOfRotation, setDegreeOfRotation] = useState(0);
  const [timelineStates, setTimelineStates] = useState([]);
  const [actionIconListDisplay, setActionIconListDisplay] = useState(false);
  const [isSaveStep, setIsSaveStep] = useState(null);
  const [isTrustPassbook, setIsTrustPassbook] = useState(null);
  const [uanAadhar, setUanAadhar] = useState(null);
  const [candidateId, SetcandidateId] = useState(null);
  const [isManualPassbook, setIsManualPassbook] = useState(null);
  const [isPensionApplicable, setIsPensionApplicable] = useState(null);
  const [filesByAlias, setFilesByAlias] = useState(new Map());
  const [fileDataStore, setFileDataStore] = useState();
  const [isBankAccVarified, setIsBankAccVarified] = useState(null);
  const [bankAccNumber, setBankAccNumber] = useState(null);
  const [bankIfscNumber, setBankIfscNumber] = useState(null);
  const [firDetails, setFIRDetails] = useState(null);
  const [isFIRModalOpen, setIsFIRModalOpen] = useState(false);
  const [parsedFIRDetails, setParsedFIRDetails] = useState([]);
  const [otherFilePayload, setOtherFilePayload] = useState();
  const [profileImage, setProfileImage] = useState();
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  let tempPayload = null;
  let hasImageFile = false;
  const dispatch = useDispatch();
  const actionsAfterProcess = (actionRoute) => {
    closeViewModel();
    dispatch(storeActionRoute({ actionRoute }));
  };
  const handleDialogCancel = () => {
    setIsFIRModalOpen(false);
  };
  const reject = async (remarks) => {
    if (hasValue(remarks)) {
      if (remarks.length < 15) {
        showErrorMessage(remarksError);
        return;
      }
      const payLoad = {
        appointeeId,
        remarks: remarks,
        userId,
      };
      const response = await postAppointeeRejected(payLoad);
      if (response) {
        actionsAfterProcess('reject');
      }
      closeRemarksInputModel();
    } else {
      showErrorMessage(remarksEmptyMsg);
    }
  };
  const approve = async (remarks) => {
    if (hasValue(remarks)) {
      if (remarks.length < 15) {
        showErrorMessage(remarksError);
        return;
      }
      const payLoad = {
        appointeeId: appointeeId,
        userId: userId,
        remarks: remarks,
      };
      const response = await postAppointeeApproved(payLoad);
      if (response) {
        actionsAfterProcess('approve');
      }
      closeRemarksInputModel();
    } else {
      showErrorMessage(remarksEmptyMsg);
    }
  };
  const handleYes = () => isPensionApplicableUpdate(true);
  const handleNo = () => isPensionApplicableUpdate(false);
  const isPensionApplicableUpdate = async (isPension) => {
    showErrorMessage();
    setIsPensionApplicable(isPension);
    if (hasValue(isPension)) {
      const payLoad = {
        appointeeId: appointeeId,
        userId: userId,
        IsPensionApplicable: isPension,
      };
      const response = await postAppointeePensionApplicable(payLoad);
      if (response) {
        handleApproveModal();
      }
    }
  };
  const [appointeeDetailsResponse, setAppointeeDetailsResponse] = useState(null);
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
        isPensionApplicable,
        isFnameVarified,
        isProcessed,
        saveStep,
        isTrustPassbook,
        isManualPassbook,
        workFlowStatus,
        uanAadharLinkStatus,
        isUanLinkWithAadhar,
        candidateId,
        isBankAccVarified,
        bankAccNumber,
        bankIfscNumber,
        isPanAvailable,
        isDLAvailable,
        isDLVarified,
        isPoliceVarified,
        drivingLicense,
        firDetails,
        maskedDrivingLicense,
        maskedBankAccNumber,
        maskedBankIfscNumber,
      } = response.responseInfo;
      setAppointeeDetailsResponse(response.responseInfo);
      setIsManualPassbook(isManualPassbook);
      workFlowStatus
        ? setManualVerificationStatus(workFlowStatus)
        : setManualVerificationStatus(NA);
      maskedUANNumber ? setUAN(maskedUANNumber) : setUAN(NA);
      uanNumber ? setUanNumber(uanNumber) : setUanNumber(null);
      isPanVarified
        ? setIsPanVarified(isPanVarified)
        : isPanVarified === false
          ? setIsPanVarified(isPanVarified)
          : isProcessed === true
            ? setIsPanVarified(null)
            : setIsPanVarified(NA);
      isProcessed ? setIsProcessed(isProcessed) : setIsProcessed(false);
      isFnameVarified ? setIsFnameVarified(isFnameVarified) : setIsFnameVarified(null);
      appointeeName ? setAppointeeName(appointeeName) : setAppointeeName(NA);
      uanAadharLinkStatus ? setUanAadhar(uanAadharLinkStatus) : setUanAadhar(NA);
      candidateId ? SetcandidateId(candidateId) : SetcandidateId(null);
      isUanVarified
        ? setIsUanVerified(isUanVarified)
        : isUanVarified === false
          ? setIsUanVerified(isUanVarified)
          : setIsUanVerified(NA);
      isPassportAvailable
        ? setIsPassportAvailable(isPassportAvailable)
        : setIsPassportAvailable(NA);
      isDLVarified
        ? setIsDLVarified(isDLVarified)
        : isDLVarified === false
          ? setIsDLVarified(isDLVarified)
          : setIsDLVarified(NA);
      isDLAvailable ? setIsDLAvailable(isDLAvailable) : setIsDLAvailable(NA);
      memberName ? setMember(memberName) : setMember(NA);
      dateOfBirth ? setDateOfBirth(DDMMYYYY(dateOfBirth)) : setDateOfBirth(NA);
      dateOfJoining ? setDateOfJoining(DDMMYYYY(dateOfJoining)) : setDateOfJoining(NA);
      isBankAccVarified
        ? setIsBankAccVarified(isBankAccVarified)
        : isBankAccVarified === false
          ? setIsBankAccVarified(isBankAccVarified)
          : setIsBankAccVarified(NA);
      maskedBankAccNumber ? setBankAccNumber(maskedBankAccNumber) : setBankAccNumber(NA);
      maskedBankIfscNumber ? setBankIfscNumber(maskedBankIfscNumber) : setBankIfscNumber(NA);
      firDetails ? setFIRDetails(firDetails) : setFIRDetails(NA);
      gender ? setGender(gender) : setGender(NA);
      memberRelation ? setRelationshipWithMember(filteredObjectProperty(relationList, memberRelation)) : setRelationshipWithMember(NA);
      mobileNo ? setMobileNo(mobileNo) : setMobileNo(NA);
      appointeeEmailId ? setEmail(appointeeEmailId) : setEmail(NA);
      nationality ? setNationality(nationality) : setNationality(NA);
      qualification ? setQualification(qualification) : setQualification(NA);
      maratialStatus ? setMaritalStatus(maratialStatus) : setMaritalStatus(NA);
      maskedDrivingLicense ? setDrivingLicense(maskedDrivingLicense) : setDrivingLicense(NA);
      hasValue(isInternationalWorker)
        ? isInternationalWorker === 'Y'
          ? setisInterNationalWorker('Yes')
          : isPassportAvailable === 'Y'
            ? setisInterNationalWorker('No')
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
      if (isPassportAvailable === 'N') {
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
        originCountry ? setCountryOfOrigin(originCountry) : setCountryOfOrigin(NA);
      }
      if (isDLAvailable === true) {
        setIsDLAvailable('Yes');
      } else if (isDLAvailable === false) {
        setIsDLAvailable('No');
      } else {
        setIsDLAvailable(NA);
      }
      hasValue(isHandicap)
        ? isHandicap === 'Y'
          ? setIsPhysicallyHandicap('Yes')
          : setIsPhysicallyHandicap('No')
        : setIsPhysicallyHandicap(NA);
      isHandicap === 'N' || !isHandicap ? setHandicapType(NA) : setHandicapType(handicapeType);
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
      setIsPensionApplicable(isPensionApplicable);
      const updatedFilesByAlias = new Map();
      fileUploaded?.forEach(({ uploadTypeAlias, mimeType, fileName, uploadDetailsId }) => {
        const file = {
          appointeeId,
          uploadDetailsId,
          fileName,
        };
        const filepayload = {
          appointeeId,
          uploadDetailsId,
          uploadTypeAlias,
        };
        if (!updatedFilesByAlias.has(uploadTypeAlias)) {
          updatedFilesByAlias.set(uploadTypeAlias, []);
        }
        updatedFilesByAlias.get(uploadTypeAlias).push(file);
        if (uploadTypeAlias === tenthCertificateFileTypeAlias) {
          setTenFile(file);
        }
        if (uploadTypeAlias === otherFileTypeAlias) {
          setOtherFile(file);
        }
        if (uploadTypeAlias === imageFileTypeAlias) {
          setProfileImage(file);
          tempPayload = filepayload;
          hasImageFile = true;
        }
        if (uploadTypeAlias === AadhaarProfileImageTypeAlias) {
          setOtherFile(file);
          if (!hasImageFile && !tempPayload) {
            tempPayload = filepayload;
          }
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
        if (uploadTypeAlias === epfoServiceHistoryFileTypeAlias) {
          setEPFOServiceHistoryFile(file);
        }
        if (tempPayload) {
          setOtherFilePayload(tempPayload);
        }
        setFilesByAlias(updatedFilesByAlias);
      });
    }
    setIsLoading(true);
  };
  const handleProfileImageLoad = async (fileType, file, filesByAlias) => {
    const files = filesByAlias?.get(fileType) || [];
    if (files.length === 1) {
      const selectedFile = files[0];
      const payload = {
        appointeeId: selectedFile.appointeeId || 0,
        fileCategory: fileType,
        fileId: selectedFile.uploadDetailsId,
      };
      const response = await getUploadedFileDetailsById(payload);
      if (response && response.responseInfo) {
        const { mimeType, fileData } = response.responseInfo;
        const base64Image = `data:${mimeType};base64,${fileData}`;
        setProfileImageBase64(base64Image);
      }
    }
  };
  useEffect(() => {
    if (profileImage) {
      handleProfileImageLoad(imageFileTypeAlias, profileImage, filesByAlias);
    }
  }, [profileImage, imageFileTypeAlias, filesByAlias]);
  useEffect(() => {
    if (
      firDetails &&
      firDetails !== 'NA' &&
      firDetails !== 'N/A' &&
      firDetails !== 'null' &&
      firDetails !== 'undefined'
    ) {
      try {
        setParsedFIRDetails(JSON.parse(firDetails));
      } catch (error) {
        setParsedFIRDetails([]);
      }
    } else {
      setParsedFIRDetails([]);
    }
  }, [firDetails]);
  const handleGetImageFromId = async () => {
    const payload = {
      appointeeId: otherFilePayload?.appointeeId,
      fileCategory: otherFilePayload?.uploadTypeAlias,
      fileId: otherFilePayload?.uploadDetailsId,
    };
    const response1 = await getUploadedFileDetailsById(payload);
    const { responseInfo } = response1;
    const { fileData } = responseInfo;
    const base64Image = `data:image/png;base64,${fileData}`;
    setFileDataStore(base64Image);
  };
  const setAppointeeActivity = async () => {
    const response = await getAppointeeActivity(appointeeId);
    if (response) {
      setTimelineStates(response.responseInfos);
    }
  };
  const [hasFetchedData, setHasFetchedData] = useState(false);
  useEffect(() => {
    if (otherFilePayload) {
      handleGetImageFromId();
    }
  }, [otherFilePayload]);
  useEffect(() => {
    if (appointeeId && !hasFetchedData) {
      setAppointeeDetails();
      setAppointeeActivity();
      setHasFetchedData(true);
    }
  }, [appointeeId]);
  const handleClickOnReview = async () => {
    const response = await getRemarks(appointeeId);
    if (response && response.responseInfo && response.responseInfo.length > 0) {
      const remarks = response.responseInfo;
      openRemarksModel(remarks);
    } else {
      showErrorMessage(remarksissuemessage);
    }
  };
  const handleClickOnMannualUpload = () => {};
  const handelclick = () => {
    const personalInfo = {
      appointeeId,
    };
    openVerify(personalInfo);
  };
  let verifyIconStyle;
  if (
    (isAadharVerified === true &&
      (isPanVarified === true || isPanVarified === null || isPanVarified === NA) &&
      isUanVerified === false &&
      isManualPassbook === true) ||
    (isAadharVerified === true &&
      isPanVarified === null &&
      isUanVerified === false &&
      isManualPassbook === true) ||
    (isAadharVerified === true && isUanVerified === NA && isPanVarified === true) ||
    (isAadharVerified === NA && isUanVerified === NA && isPanVarified === NA) ||
    (isAadharVerified === true &&
      (isUanVerified === NA || isUanVerified === null) &&
      (isPanVarified === NA || isPanVarified === null)) ||
    (isAadharVerified === true &&
      isUanVerified === true &&
      (isPanVarified === NA || isPanVarified === null))
  ) {
    verifyIconStyle = notVerifySuccessIconStyle;
  }
  if (isdocumentVerified === true && isPanVarified === true) {
    verifyIconStyle = verifySuccessIconStyle;
  }
  if (
    (isAadharVerified === true &&
      isPanVarified === true &&
      isUanVerified === false &&
      isManualPassbook === null) ||
    (isAadharVerified === true && isUanVerified === false && isManualPassbook === null) ||
    (isAadharVerified === true && isPanVarified === false) ||
    isAadharVerified === false
  ) {
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
  const handleApprove = useCallback(async () => {
    if (hasValue(uanNumber) && isManualPassbook === true && isPensionApplicable === null) {
      const pensionConfirmationModelContent = {
        dialogTitle: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>Pension Confirmation</span>
          </div>
        ),
        dialogContentText: (
          <>
            <span style={subHeadingContentTextStyle}>{pensionConfirmation}</span>
            <span> </span>
          </>
        ),
        fullWidth: true,
        mxWidth: 'md',
      };
      openConfirmationYesNoModal(pensionConfirmationModelContent, handleYes, handleNo);
    } else {
      handleApproveModal();
    }
  }, [uanNumber, isManualPassbook, isPensionApplicable]);
  const handleApproveModal = async () => {
    const confirmationModelContent = {
      dialogContentText: approveConfirmation,
      dialogComponent: <RemarksInputModel />,
      dialogFunction: (remarks) => {
        approve(remarks);
      },
    };
    openRemarksInputModel(confirmationModelContent);
  };
  const handleReject = useCallback(() => {
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
  }, [dateOfJoining]);
  const handleRprocess = () => {};
  const handleClickOnManualPassbook = () => {
    openManualVerifiedView();
  };
  const handlePassbookView = async () => {
    try {
      const response = await getPassbookDetails(appointeeId);
      const { pfUan, companies } = response?.responseInfo || {};
      if (pfUan && pfUan.length >= 12 && Array.isArray(companies) && companies.length > 0) {
        const passbookDetails = response.responseInfo;
        openPassbookViewModel(appointeeId, passbookDetails, 'AF');
      } else {
        if (isManualPassbook === true) {
          const passbookDetails = null;
          openPassbookViewModel(appointeeId, passbookDetails, 'MNL');
          return;
        }
        showErrorMessage(noPassBookMsg);
      }
    } catch (error) {
      showErrorMessage('Failed to fetch passbook details. Please try again.');
    }
  };
  const handleServiceHistoryView = async () => {
    try {
      const response = await getEmploymentDetails(appointeeId, userId);
      const { pfUan, companies } = response?.responseInfo || {};
      if (pfUan && Array.isArray(companies) && companies.length > 0) {
        const epfoDetails = response.responseInfo;
        openEmploymentViewModel(appointeeId, userId, epfoDetails, 'AF');
      } else {
        if (isManualPassbook === true) {
          const epfoDetails = null;
          openEmploymentViewModel(appointeeId, userId, epfoDetails, 'MNL');
          return;
        }
        showErrorMessage(noEmployementMsg);
      }
    } catch (error) {
      showErrorMessage('Failed to fetch epfo details.');
    }
  };
  const addFabProps = new FabIconPropsModel(
    addFabStyle,
    handleToggleActionList,
    'primary',
    'add',
    <Add />,
    'Open action',
  );
  const approveFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleApprove,
    'success',
    'thumsup',
    <ThumbUp />,
    'Manual Override',
  );
  const rejectFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleReject,
    'error',
    'thumsdown',
    <ThumbDown />,
    'Cancel',
  );
  const reprocessFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleRprocess,
    'warning',
    'reprocess',
    <RestartAlt />,
    'Reprocess',
  );
  const remarksFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleClickOnReview,
    'info',
    'remarks',
    <Comment />,
    'Remarks/Issues',
  );
  const mannualUploadFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleClickOnMannualUpload,
    'warning',
    'mannualUpload',
    <PermMedia />,
    'Mannual upload',
  );
  const viewPassbookFabProps = new FabIconPropsModel(
    actionIconStyle,
    handlePassbookView,
    'warning',
    'EPFOPassbook',
    <MenuBook />,
    'EPFO Passbook',
  );
  const viewServiceHistFabProps = new FabIconPropsModel(
    actionIconStyle,
    handleServiceHistoryView,
    'warning',
    'EPFOServiceHist',
    <AccountBox />,
    'EPFO Service History',
  );
  const fabProps = useMemo(() => ({
    remarks: remarksFabProps,
    add: addFabProps,
    approve: approveFabProps,
    reject: rejectFabProps,
    reprocess: reprocessFabProps,
    viewPassbook: viewPassbookFabProps,
    viewServiceHist: viewServiceHistFabProps
  }), []);
  const handleGetManualVerifiedFilter = (manualVerificationStatus) => {
    navigateTo(`${toMannualVerification}`, { state: manualVerificationStatus });
    closeViewModel();
  };
  return {
    t,
    setRemarks,
    isLoading,
    otherFilePayload,
    profileImageBase64,
    fileDataStore,
    verifyIconStyle,
    isSaveStep,
    isAadharVerified,
    isPanVarified,
    isUanVerified,
    isManualPassbook,
    uanNumber,
    appointeeName,
    candidateId,
    nameAsOnAadhar,
    aadhar,
    UAN,
    uanAadhar,
    pan,
    isTrustPassbook,
    trustPfFile,
    filesByAlias,
    manualPassbookFile,
    EPFOServiceHistoryFile,
    isPassportAvailable,
    isInterNationalWorker,
    countryOfOrigin,
    passportNo,
    passportValidFromDate,
    passportValidTillDate,
    visaFile,
    isDLAvailable,
    isDLVarified,
    drivingLicense,
    isBankAccVarified,
    bankAccNumber,
    bankIfscNumber,
    firDetails,
    isFIRModalOpen,
    parsedFIRDetails,
    handleDialogCancel,
    handleClickOnReview,
    handleGetManualVerifiedFilter,
    handleApprove,
    handleReject,
    handleRprocess,
    handleClickOnManualPassbook,
    handlePassbookView,
    handleServiceHistoryView,
    fabProps,
    timelineStates,
    roleTypeEnums,
    userTypeId,
    hasPermission,
    manualVerificationStatus,
    openManualVerifiedView,
    closeManualVerifiedView,
    isProcessed,
    actionIconListDisplay,
    degreeOfRotation,
    handleToggleActionList,
    member,
    dateOfBirth,
    dateOfJoining,
    gender,
    relationshipWithMember,
    nationality,
    mobileNo,
    email,
    qualification,
    maritalStatus,
    isPhysicallyHandicap,
    handicapType,
    handicapFile,
    tenFile,
    otherFile,
    nameAsOnPan,
    setAppointeeDetails,
    setAppointeeActivity,
    setIsLoading,
    setProfileImageBase64,
    setFileDataStore,
    setParsedFIRDetails,
    setFilesByAlias,
    setOtherFilePayload,
    setManualPassbookFile,
    setEPFOServiceHistoryFile,
    setVisaFile,
    setHandicapFile,
    setTenFile,
    setOtherFile,
    setTrustPfFile,
    setIsManualPassbook,
    setManualVerificationStatus,
    setUAN,
    setUanNumber,
    setAppointeeName,
    setDateOfBirth,
    setDateOfJoining,
    setGender,
    setMember,
    setRelationshipWithMember,
    setMobileNo,
    setEmail,
    setNationality,
    setQualification,
    setMaritalStatus,
    setIsPhysicallyHandicap,
    setHandicapType,
    setPan,
    setNameAsOnPan,
    setAadhar,
    setNameAsOnAadhar,
    setIsDocumentVerified,
    setIsUanVerified,
    setIsFnameVarified,
    setIsPanVarified,
    setIsAadharVerified,
    setIsPassportAvailable,
    setIsDLVarified,
    setIsDLAvailable,
    setDrivingLicense,
    setIsProcessed,
    setDegreeOfRotation,
    setTimelineStates,
    setActionIconListDisplay,
    setIsSaveStep,
    setIsTrustPassbook,
    setUanAadhar,
    SetcandidateId,
    setIsPensionApplicable,
    setFileDataStore,
    setIsBankAccVarified,
    setBankAccNumber,
    setBankIfscNumber,
    setFIRDetails,
    setIsFIRModalOpen,
    setParsedFIRDetails,
    setOtherFilePayload,
    setProfileImage,
    setProfileImageBase64,
    setAppointeeDetailsResponse,
    setHasFetchedData,
    setDateOfJoining
  };
}