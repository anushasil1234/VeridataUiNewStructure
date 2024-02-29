import { Button } from '@mui/material'
import { modelButtonStyle } from 'app'
import React from 'react'

const Button1 = (props) => {
    return (
        <Button  {...props} sx={modelButtonStyle} variant="contained" color="primary">
            {props.children}
        </Button>
    )
}

export default Button1