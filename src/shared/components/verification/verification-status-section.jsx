import { Stack, Typography } from '@mui/material';
import React from 'react'
import { VerificationIcon } from './verification-icon';
import { hasValue } from 'shared/utils';

export const VerificationStatusSection = ({ docType ,labelName ='Verification:'}) => {
    return (
        <Stack direction={"row"} alignItems={"center"}>
            <Typography sx={{ margin: "5px 0", color: "#000" }}>{labelName}</Typography>
            <Typography color={docType.color}>{docType.message}</Typography>

            {hasValue(docType.success) && <VerificationIcon status={docType.success} />}
        </Stack>
    )
}
