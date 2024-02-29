import { Box, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { heading3 } from 'app';
import * as React from 'react';


const ListTable = ({ rows }) => {
    let issuesList = [];
    let noteList = [];
    rows && rows.forEach(row => {
        if (row.remarksCategory === "NRML") {
            issuesList = [...issuesList, row]
        }
        if (row.remarksCategory === "OTHER") {
            noteList = [...noteList, row]
        }
    });

    return (
        <Stack>
            <Box>
                {issuesList.length > 0 && <Typography sx={heading3}>Issues</Typography>}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableBody>
                            {issuesList && issuesList.map((row, index) => (

                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography> {row.remarks}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box>
                {noteList.length > 0 && <Typography sx={heading3}>Notes</Typography>}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableBody>
                            {noteList && noteList.map((row, index) => (

                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography> {row.remarks}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Stack>
    );
}

export default ListTable 