import { Grid } from '@mui/material'
import { formHeadingGridContainerStyle } from 'app'
import React from 'react'

const GridRow = ({ children, sx }) => {
    return (
        <Grid
            container
            rowSpacing={1}
            columnSpacing={2.5}
            item
            xs={12}
            sx={{...formHeadingGridContainerStyle, ...sx}}
        >
            {children}
        </Grid>
    )
}

export default GridRow