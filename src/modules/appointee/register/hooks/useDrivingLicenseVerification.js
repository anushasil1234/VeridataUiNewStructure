import { useState } from 'react';
import { useSelector } from 'react-redux';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import showSuccessMessage from 'shared/utils/associate/show-success-message';
import { verifyDrivingLicenseDetails } from 'server/apis/verify/verify-driving-license';
import { postAppointeeDocAvailibility } from 'server/apis/appointee/appointee-workflow/post-appointee-doc-availability';
import removeSingleSpaces from 'shared/utils/associate/remove-single-spaces';
import generateRemarks from 'shared/utils/associate/generate-remarks';
import VerificationStatus from 'shared/components/verification/verification-status';
import { driving_license_regex } from 'shared/constants/constants';
import { hasValue, patternChecking } from 'shared/utils';

export default function useDrivingLicenseVerification({
  userInfo,
  setUserInfo,
  initialDL = '',
  initialStatusMessage = new VerificationStatus(null , ''),
}) {
  console.log('userInfo', userInfo);
  const [drivingLicense, setDrivingLicense] = useState(initialDL);
  const [isDLAvailable, setIsDLAvailable] = useState( userInfo?.isDLAvailable ??false);
  const [isDLVarified, setisDLVarified] = useState(null);
  const [licensestatusMessage, setLicenseStatusMessage] = useState(initialStatusMessage);
  const [dlNumberError, setDLNumberError] = useState(false);
  const [isDLVerificationDisabled, setIsDLVerificationDisabled] = useState(false);
  const [inputMethod, setInputMethod] = useState('manual');
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const loggedInData = useSelector((state) => state.loggedInData);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { openRemarksModel } = functionSlice[0] || {};
  const { userId, appointeeId } = loggedInData[0] || {};

  const handleLicenseNumberChange = (value) => {
    setDrivingLicense(value.toUpperCase());
    setDLNumberError(false);
  };

  const handleDrivingLicenseVerification = async () => {
    if (!drivingLicense) {
      showErrorMessage('Please enter your Driving License number.');
    } else if (!patternChecking(drivingLicense, /^(?:[A-Z]{2}\d{2}-?|\w{2}-\d{2}|\w{2}\d{2} ?)\d{4}\d{7}$/)) {
      showErrorMessage('Invalid Driving License number format.');
      setDLNumberError(true);
    } else {
      await verifyDrivingLicense();
    }
  };

  const verifyDrivingLicense = async () => {
    const payLoad = {
      appointeeId: appointeeId,
      dlNumber: hasValue(drivingLicense) ? removeSingleSpaces(drivingLicense) : null,
      userId: userId,
    };
    const response = await verifyDrivingLicenseDetails(payLoad);
    if (response) {
      const { remarks, IsVarified } = response.responseInfo;
      if (!IsVarified && hasValue(remarks)) {
        const generatedRemarks = generateRemarks(remarks);
        openRemarksModel && openRemarksModel(generatedRemarks);
      }
      setisDLVarified(IsVarified);
      setUserInfo((prevState) => ({
        ...prevState,
        drivingLicense: drivingLicense,
        isDLAvailable: isDLAvailable,
        isDLVarified: IsVarified,
      }));
      setLicenseStatusMessage(new VerificationStatus(IsVarified, 'V'));
    }
  };

  const handleChangeLicenseAvailable = async (event) => {
    const selectedValue = event.target.value === 'Yes';
    setIsDLAvailable(selectedValue);
    const payLoad = {
      appointeeId: appointeeId,
      userId: userId,
      type: 'DL',
      value: selectedValue,
    };
    try {
      const response = await postAppointeeDocAvailibility(payLoad);
      if (response.responseInfo === 'Success') {
        showSuccessMessage('Driving License availability updated successfully.');
        setUserInfo((prevState) => ({
          ...prevState,
          isDLAvailable: isDLAvailable,
        }));
      } else {
        showErrorMessage('Failed to update Driving License availability.');
      }
    } catch (error) {
      showErrorMessage('Failed to update Driving License availability.');
    }
  };

  const onTextExtracted = (text) => {
    const extracted = extractLicenseNumber(text);
    if (extracted) {
      setDrivingLicense(extracted);
    } else {
      showErrorMessage("Can't extract Driving License Number. Please enter it manually.");
    }
  };

  const extractLicenseNumber = (text) => {
    const match = text.match(driving_license_regex);
    return match ? match[0].replace(/\s/g, '') : '';
  };

  return {
    drivingLicense,
    setDrivingLicense,
    isDLAvailable,
    setIsDLAvailable,
    isDLVarified,
    setisDLVarified,
    licensestatusMessage,
    setLicenseStatusMessage,
    dlNumberError,
    setDLNumberError,
    isDLVerificationDisabled,
    setIsDLVerificationDisabled,
    inputMethod,
    setInputMethod,
    uploadedFileName,
    setUploadedFileName,
    handleLicenseNumberChange,
    handleDrivingLicenseVerification,
    handleChangeLicenseAvailable,
    onTextExtracted,
    extractLicenseNumber,
  };
} 