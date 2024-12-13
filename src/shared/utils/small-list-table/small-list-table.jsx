import { Info } from "@mui/icons-material";
import { Box, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Tooltip, Typography } from "@mui/material";
import { dashboardtextStyle, infoButtonStyle, smallTableContainer, smallTableHeaderCellStyle, tableHeadRowStyle } from "app";
import PropTypes from "prop-types";
import { visuallyHidden } from '@mui/utils';  // remove and this line and test 
import { otherAlias } from "shared/constants/constants";
import { useSelector } from "react-redux";


const headCells = [

    {
        id: 'issue',
        numeric: true,
        disablePadding: false,
        label: 'Issue Description',
    },
    {
        id: 'remedy',
        numeric: true,
        disablePadding: false,
        label: 'Steps to Resolution',
    }
];



const EnhancedTableHead = (props) => {
    const { order, orderBy } =
        props;

    return (
        <TableHead>
            <TableRow sx={tableHeadRowStyle}>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="left"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            sx={smallTableHeaderCellStyle}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order ? 'sorted descending' : 'sorted ascending'}
                                    sortDirection={orderBy === headCell.id ? (order ? 'desc' : 'asc') : false}
                                    {/* {order === 'desc' ? 'sorted descending' : 'sorted ascending'} */}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const SmallListTable = ({ rows }) => {

    const functionSlice = useSelector(state => state.functionSlice);

    const { openRemedyModel } = functionSlice[0];

    return (
        <TableContainer sx={smallTableContainer}>

            <Table
                aria-labelledby="tableTitle"
                size={'medium'}
            >
                <EnhancedTableHead
                    rowCount={rows.length}
                />

                <TableBody >
                    {rows.length > 0 ?

                        <>
                            {
                                rows.map((row, index) => {

                                    const otherRemarks = row.remarksCode?.toString() === otherAlias ? true : false;
                                    return (
                                        < TableRow sx={tableHeadRowStyle}
                                            hover
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            <TableCell sx={dashboardtextStyle}>{row.remarks}</TableCell>
                                            <TableCell sx={dashboardtextStyle}>
                                                <Stack flexDirection={"row"} justifyContent={"start"}>
                                                    <Tooltip title="View Details" arrow>

                                                        <IconButton disabled={otherRemarks} sx={infoButtonStyle}>
                                                            <Info
                                                                appointeeId={row.appointeeId}
                                                                remarksId={row.remarksId}
                                                                mood='R'
                                                                variant="contained"
                                                                onClick={() => openRemedyModel({remarksId: row.remarksId ,remedyType :"ISSU",remedySubType:""})}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>

                                        </TableRow>
                                    );

                                })}

                        </> :
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                <Typography> No Data Available</Typography>
                            </TableCell>
                        </TableRow>}

                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default SmallListTable