import { Grid } from '@mui/material'
import { formHeadingContainerStyle, formHeadingGridContainerStyle } from 'app'
import React from 'react'

const FormHeadingContainer = ({ children }) => {
    return (
        <Grid
            container
            rowSpacing={2}
            columnSpacing={2.5}
            item
            xs={12}
            sx={formHeadingGridContainerStyle}
        >
            <Grid item xs={12} sx={formHeadingContainerStyle}>
                {children}
            </Grid>
        </Grid>
    )
}

export default FormHeadingContainer