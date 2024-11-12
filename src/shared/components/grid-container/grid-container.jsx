import { Grid } from '@mui/material'
import React from 'react'

const GridContainer = ({ children, marginTop = "2px" }) => {
    return (
        <Grid
            // sx={{ paddingLeft: "20px", width: "50%" }}
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ paddingX: "1rem", marginTop: marginTop }}
        >
            {children}
        </Grid>
    )
}

export default GridContainer