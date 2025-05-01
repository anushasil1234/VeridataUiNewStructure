import React, { useMemo } from 'react';
import { Chip } from '@mui/material';
import { appointeeVerificationStatusChipPropsStyle } from 'app';
import { hasValue } from 'shared/utils';
import { NA } from 'shared/constants/constants';
// import { NA, hasValue } from 'shared/utils';

const VerificationStatus = React.memo(({ isAadharVerified, isPanVarified, isUanVerified, isManualPassbook, uanNumber }) => {
  const { label, color } = useMemo(() => {
    if (isAadharVerified === false) {
      return { label: 'Aadhaar Verification failed', color: 'error' };
    }
    if (isPanVarified === false) {
      return { label: 'PAN Verification failed', color: 'error' };
    }
    if (isUanVerified === false && isManualPassbook === true) {
      return { label: 'Manual Passbook Uploaded', color: 'warning' };
    }
    if (isUanVerified === false) {
      return { label: 'UAN Verification failed', color: 'error' };
    }
    if (isAadharVerified === NA) {
      return { label: 'Aadhaar Verification Pending', color: 'warning' };
    }
    if (isPanVarified === NA || isPanVarified === null) {
      return { label: 'PAN Verification Pending', color: 'warning' };
    }
    if (isUanVerified === NA) {
      return { label: 'UAN Verification Pending', color: 'warning' };
    }
    if (isUanVerified === true && !hasValue(uanNumber)) {
      return { label: 'No UAN Available', color: 'success' };
    }
    return { label: null, color: null };
  }, [isAadharVerified, isPanVarified, isUanVerified, isManualPassbook, uanNumber]);

  return label ? (
    <Chip {...appointeeVerificationStatusChipPropsStyle} label={label} color={color} />
  ) : null;
});

export default VerificationStatus; 