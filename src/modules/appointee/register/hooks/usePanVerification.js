import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import { verifyPANDetails } from 'server/apis';
import { postAppointeeDocAvailibility } from 'server/apis/appointee/appointee-workflow/post-appointee-doc-availability';
import removeExtraSpaces from 'shared/utils/associate/remove-extra-spaces';
import VerificationStatus from 'shared/components/verification/verification-status';
import { pan_regex } from 'shared/constants/constants';
import { hasValue, patternChecking } from 'shared/utils';

export default function usePanVerification({
  initialPan = '',
  initialName = '',
  initialIsPANAvailable = false,
  initialIsPanVarified = false,
  initialStatusMessage = new VerificationStatus(null, ''),
  setUserInfo,
  userInfo,
}) {
  console.log('userInfoisPanAvailable', userInfo.appointeeName);

  const [pan, setPan] = useState(initialPan);
  const [nameAsOnPan, setNameAsOnPan] = useState(userInfo.appointeeName ?? initialName);
  const [isPANAvailable, setIsPANAvailable] = useState(userInfo.isPanAvailable ?? initialIsPANAvailable);
  const [isPanVarified, setIsPanVarified] = useState(userInfo?.isPanVarified ?? initialIsPanVarified);
  const [panstatusMessage, setPANStatusMessage] = useState(initialStatusMessage);
  const [panNumberError, setPanNumberError] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const loggedInData = useSelector((state) => state.loggedInData);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openRemarksModel } = functionSlice[0] || {};
  const { userId, appointeeId } = loggedInData[0] || {};
  const hasInteracted = useRef(false);
  useEffect(() => {
    if (!hasInteracted.current) {
      setNameAsOnPan(userInfo?.appointeeName ?? initialName);
      setIsPanVarified(userInfo?.isPanVarified ?? null);
      setIsPANAvailable(userInfo?.isPanAvailable ?? false);
      setPan(userInfo?.panNumber ?? '');
      setPANStatusMessage(new VerificationStatus(userInfo?.isPanVarified, ''));
    }
    // eslint-disable-next-line
  }, [userInfo?.isPanVarified, userInfo?.isPanAvailable, userInfo?.panNumber]);
  console.log('userInfoisPanAvailableaaqqq', nameAsOnPan);

  const onTextExtracted = (text) => {
    const extracted = extractPanNumber(text);
    if (extracted) {
      setPan(extracted);
    } else {
      showErrorMessage("Can't extract PAN Number. Please enter it manually.");
    }
  };

  const extractPanNumber = (text) => {
    const match = text.match(pan_regex);
    return match ? match[0].replace(/\s/g, '') : '';
  };

  const handelPANNumberChange = (value) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (value !== 'none') {
      if (value.length <= 10) {
        const upperCaseValue = value.trim().toUpperCase();
        setPan(upperCaseValue);
        if (upperCaseValue.length === 10) {
          if (panRegex.test(upperCaseValue)) {
            setPanNumberError(false);
          } else {
            setPanNumberError(true);
            showErrorMessage('Invalid PAN number format. Please enter a valid PAN.');
          }
        } else {
          setPanNumberError(false);
        }
      }
    }
  };

  const handleBlurPAN = () => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (pan?.length === 10 && !panRegex.test(pan)) {
      setPanNumberError(true);
      showErrorMessage('Invalid PAN number format. Please enter a valid PAN.');
    }
  };

  const displayPanError = (msg) => {
    showErrorMessage(msg);
    setPanNumberError(true);
  };

  const handlePanVerifiaction = () => {
    if (pan === null || nameAsOnPan === null || nameAsOnPan === '') {
      showErrorMessage('Please enter PAN and Name as on PAN.');
      setPanNumberError(true);
    } else if (!patternChecking(pan, /^[A-Z]{5}[0-9]{4}[A-Z]{1}/)) {
      showErrorMessage('Invalid PAN number format.');
      setPanNumberError(true);
    } else {
      verifyPAN();
    }
  };

  const verifyPAN = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      panNummber: pan,
      panName: hasValue(nameAsOnPan) ? removeExtraSpaces(nameAsOnPan) : null,
      userId: userId,
    };
    const response = await verifyPANDetails(payLoad);
    if (response) {
      const { remarks, isVarified } = response.responseInfo;
      setIsPanVarified(isVarified);
      setUserInfo((prevState) => ({
        ...prevState,
        isPanVarified: isVarified,

      }));
      if (!isVarified) {
        displayPanError('PAN verification failed.');
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel && openRemarksModel(generatedRemarks);
        }
      }
      setPANStatusMessage(new VerificationStatus(isVarified, 'V'));
    }
  };

  const generateRemarks = (remarks) => {
    let remarksList = [];
    if (hasValue(remarks)) {
      remarksList = remarks.split(',').map((remark) => {
        return {
          remarksCategory: 'NRML',
          remarks: remark,
        };
      });
    }
    return remarksList;
  };

  const handleChangePANAvailable = async (event) => {
    const selectedValue = event.target.value === 'Yes';
    setIsPANAvailable(selectedValue);
    const payLoad = {
      appointeeId: appointeeId,
      userId: userId,
      type: 'PAN',
      value: selectedValue,
    };
    try {
      const response = await postAppointeeDocAvailibility(payLoad);
      if (response.responseInfo === 'Success') {
        setUserInfo((prevState) => ({
          ...prevState,
          isPANAvailable: selectedValue,
        }));
        showSuccessMessage('PAN availability updated successfully.');
      } else {
        showErrorMessage('Failed to update PAN availability.');
      }
    } catch (error) {
      showErrorMessage('Failed to update PAN availability.');
    }
  };

  return {
    pan,
    setPan,
    nameAsOnPan,
    setNameAsOnPan,
    isPANAvailable,
    setIsPANAvailable,
    isPanVarified,
    setIsPanVarified,
    panstatusMessage,
    setPANStatusMessage,
    panNumberError,
    setPanNumberError,
    uploadedFileName,
    setUploadedFileName,
    handelPANNumberChange,
    handleBlurPAN,
    handlePanVerifiaction,
    handleChangePANAvailable,
    onTextExtracted,
    extractPanNumber,
  };
} 