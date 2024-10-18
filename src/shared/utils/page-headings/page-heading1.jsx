import { Typography } from '@mui/material'
import React from 'react'

export const PageHeading1 = ({heading}) => {
  return (
     <Typography component="h2" 
     sx={{ fontSize: '1.2rem',justifyContent:"center" }}
     >{heading}</Typography>
  )
}
export const PageHeading2=({heading})=>{
  return (
     <Typography component="h1"
     sx={{ fontSize: '0.9rem' }}
     >{heading}</Typography>
  )
}