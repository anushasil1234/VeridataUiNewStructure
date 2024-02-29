import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Paper } from '@mui/material';

const TotalOffer = ({ wizName, wizValue }) => {
    // chart color
    const theme = useTheme();
    const secondary = theme.palette.secondary.main;
    const secondaryDark = theme.palette.secondary.dark;

    // chart
    return (
        <Paper elevation={1}
            sx={{ width: "fit-content", padding: "5px", height: "46px" }}
        >
            <Stack flexDirection={"row"}>
                <Typography color={secondary} sx={{ fontSize: "1.3rem", whiteSpace: "nowrap" }}  >
                    {wizName}{"   "}
                </Typography>
                <Typography color={secondaryDark} sx={{ textAlign: 'right', marginLeft: "10px", fontSize: "1.3rem" }}>

                    {wizValue}
                </Typography>
            </Stack>
        </Paper >
    );
};

export { TotalOffer };
