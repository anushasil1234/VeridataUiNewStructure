import React from 'react';
import { Stack } from '@mui/system';
import { TaskAlt, WarningAmber } from '@mui/icons-material';
import { documentListStyle, documentListItemStyle } from 'app';
import { FieldName, FieldValue } from 'shared/components/display-information/personal-information';

const DocumentDetails = React.memo(({ fieldName, fieldValue, isVerified }) => {
  return (
    <Stack sx={documentListStyle}>
      <Stack sx={documentListItemStyle}>
        <FieldName fieldValue={fieldValue} fieldName={fieldName} />
        <FieldValue fieldValue={fieldValue} />
      </Stack>
      {isVerified === true && <TaskAlt color='success' fontSize={'small'} />}
      {isVerified === false && <WarningAmber color='error' fontSize={'small'} />}
    </Stack>
  );
});

export default DocumentDetails; 