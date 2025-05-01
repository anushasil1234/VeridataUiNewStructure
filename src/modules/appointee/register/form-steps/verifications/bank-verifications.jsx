import { Autorenew } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { positionRelative, submitBtnStyle } from 'app';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { verifyBankDetails } from 'server/apis/verify/verify-bank-details';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import GridRow from 'shared/components/grid-container/grid-row';
import TextInput from 'shared/components/input-fields/text-input';
import VerificationStatus from 'shared/components/verification/verification-status';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import {
  aaddharNumberverify,
  bankVerifyFailedMsg,
  emptyAccountNumberMsg,
  emptyIFSCMsg,
  invalidIFSCMsg,
  legthmismatchIFSCMsg,
} from 'shared/constants/constants';
import { hasValue, patternChecking } from 'shared/utils';
import generateRemarks from 'shared/utils/associate/generate-remarks';
import removeExtraSpaces from 'shared/utils/associate/remove-extra-spaces';
import showErrorMessage from 'shared/utils/associate/show-error-message';
import FormHeading from '../../form-heading';
const BankVerification = ({
  bankstatusMessage,
  setBankStatusMessage,
  isAadhaarVarified,
  isBankVarified,
  setIsBankVarified,
  accountNumber,
  setAccountNumber,
  IFSCCode,
  setIFSCCode,
  stepsList,
}) => {
  const dropdownList = useSelector((state) => state.dropdownList);
  const apiSlice = useSelector((state) => state.apiSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const functionSlice = useSelector((state) => state.functionSlice);
  const { t } = useTranslation();
  const {
    openOtpForm,
    closeOtpForm,
    openOtpSubmitionModel,
    closeOtpSubmitionModel,
    openRemarksModel,
    openConfirmationModel,
    openInfoModel,
  } = functionSlice[0];
  const { userId, appointeeId, userCode, candidateId } = loggedInData[0];
  const [ifscCodeError, setIFSCCodeError] = useState(false);
  const handleAccountNumberChange = (value) => {
    setAccountNumber(value);
  };
  const handleIFSCCodeChange = (value) => {
    setIFSCCode(value);
  };
  const displayBankError = (msg) => {
    showErrorMessage(msg);
  };
  const handleBankAccountVerification = async () => {
    if (!isAadhaarVarified) {
      showErrorMessage(aaddharNumberverify);
      return;
    }
    if (accountNumber === null) {
      showErrorMessage(emptyAccountNumberMsg);
    } else if (IFSCCode === null) {
      showErrorMessage(emptyIFSCMsg);
    } else if (IFSCCode.length !== 11) {
      showErrorMessage(legthmismatchIFSCMsg);
      setIFSCCodeError(true);
    } else if (!patternChecking(IFSCCode, /^[A-Z]{4}0[A-Z0-9]{6}$/)) {
      showErrorMessage(invalidIFSCMsg);
      setIFSCCodeError(true);
    } else {
      verifyBank();
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
      if (isVarified) {
      } else {
        displayBankError(bankVerifyFailedMsg);
        if (hasValue(remarks)) {
          const generatedRemarks = generateRemarks(remarks);
          openRemarksModel(generatedRemarks);
        }
      }
      setBankStatusMessage(new VerificationStatus(isVarified, 'V'));
    }
  };
  return (
    <>
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.BAV?.step}
          heading={stepsList?.BAV?.name}
          info={'Enter your Bank Account Details to verify.'}
        />
      </FormHeadingContainer>
      <GridRow sx={positionRelative}>
        {}
        <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
          <TextInput
            label={t('Bank Account Number')}
            onKeyDown={(e) => {
              if (!/^\d+$/.test(e.key) && e.key !== 'Backspace') {
                e.preventDefault();
              }
            }}
            onChange={handleAccountNumberChange}
            value={accountNumber}
            disabled={isBankVarified}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            paddingLeft: {
              xs: '0px !important',
              md: '20px!important',
              ...positionRelative,
            },
          }}
        >
          {}
          <TextInput
            label={t('IFSC Code')}
            onChange={handleIFSCCodeChange}
            value={IFSCCode}
            disabled={isBankVarified}
          />
        </Grid>
        <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
          <Button
            sx={{ ...submitBtnStyle, margin: '5px 0' }}
            disabled={isBankVarified}
            variant='contained'
            onClick={handleBankAccountVerification}
            endIcon={<Autorenew />}
          >
            {t('Verify')}
          </Button>
          <VerificationStatusSection docType={bankstatusMessage} />
        </Grid>
      </GridRow>
    </>
  );
};
export default BankVerification;
