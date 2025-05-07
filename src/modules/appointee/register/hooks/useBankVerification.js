import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import { verifyBankDetails } from 'server/apis/verify/verify-bank-details';
import VerificationStatus from 'shared/components/verification/verification-status';
import { hasValue, patternChecking } from 'shared/utils';
import removeExtraSpaces from 'shared/utils/associate/remove-extra-spaces';
import generateRemarks from 'shared/utils/associate/generate-remarks';

export default function useBankVerification({
  initialAccountNumber = '',
  initialIFSC = '',
  initialIsBankVarified = false,
  initialStatusMessage = new VerificationStatus(null, ''),
  setUserInfo,
  userInfo,
}) {
  const [accountNumber, setAccountNumber] = useState(userInfo?.bankAccNumber??initialAccountNumber);
  const [IFSCCode, setIFSCCode] = useState(userInfo?.bankIfscNumber??initialIFSC);
  const [isBankVarified, setIsBankVarified] = useState(userInfo?.isBankVarified ?? initialIsBankVarified);
  const [bankstatusMessage, setBankStatusMessage] = useState(initialStatusMessage);
  const [ifscCodeError, setIFSCCodeError] = useState(false);

  const loggedInData = useSelector((state) => state.loggedInData);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openRemarksModel } = functionSlice[0] || {};
  const { userId, appointeeId } = loggedInData[0] || {};
    const hasInteracted = useRef(false);
  
useEffect(() => {
    if (!hasInteracted.current) {
      setIsBankVarified(userInfo?.isBankAccVarified ?? null);
      setAccountNumber(userInfo?.bankAccNumber ?? '');
      setIFSCCode(userInfo?.bankIfscNumber ?? '');
      setBankStatusMessage(new VerificationStatus(userInfo?.isBankAccVarified, ''));
    }
  }, [userInfo?.isBankAccVarified,  userInfo?.bankIfscNumber, userInfo?.bankAccNumber]);
  const handleAccountNumberChange = (value) => {
    setAccountNumber(value);
  };

  const handleIFSCCodeChange = (value) => {
    setIFSCCode(value);
  };

  const displayBankError = (msg) => {
    showErrorMessage(msg);
  };

  const handleBankAccountVerification = async (isAadhaarVarified) => {
    if (!isAadhaarVarified) {
      showErrorMessage('Please verify Aadhaar first.');
      return;
    }
    if (!accountNumber) {
      showErrorMessage('Please enter your Bank Account Number.');
    } else if (!IFSCCode) {
      showErrorMessage('Please enter your IFSC Code.');
    } else if (IFSCCode.length !== 11) {
      showErrorMessage('IFSC Code must be 11 characters.');
      setIFSCCodeError(true);
    } else if (!patternChecking(IFSCCode, /^[A-Z]{4}0[A-Z0-9]{6}$/)) {
      showErrorMessage('Invalid IFSC Code format.');
      setIFSCCodeError(true);
    } else {
      await verifyBank();
    }
  };

  const verifyBank = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      accountNumber: accountNumber,
      Ifsc: hasValue(IFSCCode) ? removeExtraSpaces(IFSCCode) : null,
      userId: userId,
    };
    const response = await verifyBankDetails(payLoad);
    if (response) {
      const { remarks, isVarified } = response.responseInfo;
      setIsBankVarified(isVarified);
      setUserInfo && setUserInfo((prev) => ({ ...prev, isBankVarified: isVarified }));
      if (!isVarified) {
        displayBankError('Bank verification failed.');
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel && openRemarksModel(generatedRemarks);
        }
      }
      setBankStatusMessage(new VerificationStatus(isVarified, 'V'));
    }
  };

  return {
    accountNumber,
    setAccountNumber,
    IFSCCode,
    setIFSCCode,
    isBankVarified,
    setIsBankVarified,
    bankstatusMessage,
    setBankStatusMessage,
    ifscCodeError,
    setIFSCCodeError,
    handleAccountNumberChange,
    handleIFSCCodeChange,
    handleBankAccountVerification,
  };
} 