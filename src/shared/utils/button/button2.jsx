import { Button } from '@mui/material'
import { button2 } from 'app'
import React from 'react'

const Button2 = (props) => {

    return (
        <Button {...props} sx={button2}>{props.children}</Button>
    )
}

export default Button2