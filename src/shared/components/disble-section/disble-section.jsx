import { Box } from '@mui/material';
import { disableSectionStyle } from 'app';
import React, { useState } from 'react'

export const DisableSection = () => {
    const [cursor, setCursor] = useState("pointer");

    return (
        <Box sx={{...disableSectionStyle, cursor}} onMouseEnter={() => setCursor("not-allowed")}></Box>
    )
}
