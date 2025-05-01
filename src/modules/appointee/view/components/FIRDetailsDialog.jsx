import React from 'react';
import { Dialog, AppBar, Toolbar, IconButton, DialogTitle, DialogContent, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { modelToolbar } from 'app';

const FIRDetailsDialog = ({ open, onClose, firDetails }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <AppBar sx={{ ...modelToolbar, position: 'sticky', top: '0' }}>
        <Toolbar>
          <IconButton edge='start' onClick={onClose} aria-label='close'>
            <Close sx={{ color: '#fff' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogTitle>FIR Details</DialogTitle>
      <DialogContent>
        {firDetails.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>FIR Number</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Police Station</strong></TableCell>
                <TableCell><strong>Crime Type</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {firDetails.map((fir, index) => (
                <TableRow key={index}>
                  <TableCell>{fir.FirNumber}</TableCell>
                  <TableCell>{fir.Date}</TableCell>
                  <TableCell>{fir.PoliceStation}</TableCell>
                  <TableCell>{fir.CrimeType}</TableCell>
                  <TableCell>{fir.Status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>No FIR records found.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FIRDetailsDialog; 