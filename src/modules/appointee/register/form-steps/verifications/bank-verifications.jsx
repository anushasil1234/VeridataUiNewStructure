import { Autorenew } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { positionRelative, submitBtnStyle } from 'app';
import FormHeadingContainer from 'shared/components/grid-container/form-heading-container';
import GridRow from 'shared/components/grid-container/grid-row';
import TextInput from 'shared/components/input-fields/text-input';
import { VerificationStatusSection } from 'shared/components/verification/verification-status-section';
import FormHeading from '../../form-heading';
import { useTranslation } from "react-i18next";
const BankVerification = ({
  bankstatusMessage,
  isAadhaarVarified,
  isBankVarified,
  accountNumber,
  IFSCCode,
  ifscCodeError,
  handleAccountNumberChange,
  handleIFSCCodeChange,
  handleBankAccountVerification,
  stepsList,
}) => {
  const { t } = useTranslation(); 
  return (
    <>
      <FormHeadingContainer>
        <FormHeading
          step={stepsList?.BAV?.step}
          heading={stepsList?.BAV?.name}
          info={t('Enter your Bank Account Details to verify.')}
        />
      </FormHeadingContainer>
      <GridRow sx={positionRelative}>
        <Grid item xs={12} md={6} sx={{ paddingLeft: '0px !important' }}>
          <TextInput
            label={t('Bank Account Number')}
            onKeyDown={(e) => {
              if (!/^[0-9]+$/.test(e.key) && e.key !== 'Backspace') {
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
          <TextInput
            label={t('IFSC Code')}
            onChange={handleIFSCCodeChange}
            value={IFSCCode}
            disabled={isBankVarified}
            error={ifscCodeError}
          />
        </Grid>
        <Grid sx={{ paddingLeft: '0px !important' }} item xs={12} md={6}>
          <Button
            sx={{ ...submitBtnStyle, margin: '5px 0' }}
            disabled={isBankVarified}
            variant='contained'
            onClick={() => handleBankAccountVerification(isAadhaarVarified)}
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
