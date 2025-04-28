import { Stack, Typography } from '@mui/material';
import React from 'react';
import { VerificationIcon } from './verification-icon';
import { hasValue } from 'shared/utils';
import { useTranslation } from 'react-i18next';
export const VerificationStatusSection = ({ docType, labelName = 'Verification' }) => {
  const { t } = useTranslation();
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Typography sx={{ margin: '5px 0', color: '#000' }}>{t('Verification')}:</Typography>
      <Typography sx={{ fontSize: '1.25rem', fontWeight: 600 }} color={docType?.color}>
        {docType?.message}
      </Typography>
      {hasValue(docType?.success) && <VerificationIcon status={docType?.success} />}
    </Stack>
  );
};
