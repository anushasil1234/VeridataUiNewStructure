import * as React from 'react';
import Box from '@mui/material/Box';
import {loaderStyle, overLayText } from 'app';
import { Typography } from '@mui/material';
import OverlayLayout from '../layout/overlay-layout';
const styles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
export default function CircularIndeterminate() {
  return (
    <OverlayLayout>
      <style>{styles}</style>
      <Box sx={loaderStyle}></Box>
      <Typography sx={overLayText}>Processing...</Typography>
    </OverlayLayout>
  );
}