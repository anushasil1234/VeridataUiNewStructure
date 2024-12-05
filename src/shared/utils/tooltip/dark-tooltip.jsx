import React from 'react'
import { styled, Tooltip, tooltipClasses } from '@mui/material';

const DarkTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        boxShadow: theme.shadows[1],
        fontSize: 16,
        maxWidth: 500, // Set a max width
        padding: '8px 12px', // Adjust padding
       // wordWrap: 'break-word', // Ensure text wraps if too long
    },
}));

export default DarkTooltip;