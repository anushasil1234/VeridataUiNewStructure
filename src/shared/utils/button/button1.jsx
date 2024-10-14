import { Button } from '@mui/material'
import { modelButtonStyle, responsiveBtnType1Style } from 'app'
import React from 'react'

const Button1 = (props) => {
    return (
        <Button  {...props} sx={{...modelButtonStyle, ...responsiveBtnType1Style}} variant="contained" hover color="primary">
            {props.children}
        </Button>
    )
}

export default Button1