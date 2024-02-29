import { Card } from '@mui/material'
import { cardAppbar } from 'app'
import React from 'react'

const CardLayout = ({ children }) => {
    return (
            <Card
                elevation={5}
                sx={cardAppbar}
            >
                {children}
            </Card>
    
    )
}

export  {CardLayout}