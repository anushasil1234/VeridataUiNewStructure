import { WarningAmber } from '@mui/icons-material'
import { Grid, Stack, Typography } from '@mui/material'
import { formHeadingGridContainerStyle, heading1, heading6 } from 'app'
import React from 'react'

const NotAccessibleSection = () => {
    return (
        <Grid
            sx={{ paddingLeft: "20px" }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
            <Grid
                container
                rowSpacing={1}
                columnSpacing={2.5}
                item
                xs={12}
                sx={formHeadingGridContainerStyle}
            >
                <Grid sx={{ paddingLeft: '0px !important' }} item xs={12}>
                    <Stack sx={{ alignItems: 'center' }}>
                        <WarningAmber sx={{ color: 'rgb(255, 174, 31)', width: '2em', height: '2em' }} />
                        <Typography variant="h5" sx={heading6} component="h1">
                            Sorry, you are not allowed to access this page
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NotAccessibleSection