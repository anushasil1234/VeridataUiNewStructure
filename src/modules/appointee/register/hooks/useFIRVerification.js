import { useState } from 'react';
import { useSelector } from 'react-redux';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import VerificationStatus from 'shared/components/verification/verification-status';
import { hasValue } from 'shared/utils';
import { checkFIRDetails } from 'server/apis/verify/check-fir-details';

export default function useFIRVerification({
  userInfo,
  setUserInfo,
  initialFIRDetails = [],
  initialIsPoliceVarified = false,
  initialStatusMessage = new VerificationStatus(null, ''),
}) {
  const [firDetails, setFIRDetails] = useState(initialFIRDetails);
  const [isPoliceVarified, setisPoliceVarified] = useState(userInfo?.isPoliceVarified ?? initialIsPoliceVarified);
  const [firStatusMessage, setFIRStatusMessage] = useState(initialStatusMessage);
  const [isFIRModalOpen, setIsFIRModalOpen] = useState(false);
  const [isViewFIREnabled, setIsViewFIREnabled] = useState(false);

  const loggedInData = useSelector((state) => state.loggedInData);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openRemarksModel } = functionSlice[0] || {};
  const { userId, appointeeId } = loggedInData[0] || {};

  const displayFirError = (msg) => {
    showErrorMessage(msg);
  };

  const handleFIRChecking = async () => {
    await checkFIR();
  };

  const checkFIR = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      userId: userId,
    };
    const response = await checkFIRDetails(payLoad);
    if (response) {
      const { policeFirDetails, IsVarified, remarks } = response.responseInfo;
      setisPoliceVarified(IsVarified);
      setUserInfo && setUserInfo((prev) => ({ ...prev, isPoliceVarified: IsVarified }));
      setFIRDetails(policeFirDetails);
      setIsViewFIREnabled(policeFirDetails?.length > 0);
      if (!IsVarified) {
        displayFirError('FIR verification failed.');
        if (hasValue(policeFirDetails)) {
          setIsFIRModalOpen(true);
        }
      }
      setIsFIRModalOpen(true);
      setFIRStatusMessage(new VerificationStatus(IsVarified, 'V'));
    }
  };

  const handleDialogConfirm = () => {
    setIsFIRModalOpen(false);
  };
  const handleDialogCancel = () => {
    setIsFIRModalOpen(false);
  };

  return {
    firDetails,
    setFIRDetails,
    isPoliceVarified,
    setisPoliceVarified,
    firStatusMessage,
    setFIRStatusMessage,
    isFIRModalOpen,
    setIsFIRModalOpen,
    isViewFIREnabled,
    setIsViewFIREnabled,
    handleFIRChecking,
    handleDialogConfirm,
    handleDialogCancel,
  };
} 