import React from 'react'
import { Box, Typography } from '@mui/material';
import { NA } from 'shared/constants/constants';
import { firstCell, issueTextStyle, text1, text2 } from 'app';
import { DDMMYYYY } from '..';
import TableStatusCell from './table-status-cell';
import TableClickableCell from './table-clickable-cell';

function SingleTableCell({ props }) {
    const { tableRow, headCell, Component, attribute, actionPermissionList } = props;

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {headCell && headCell?.enums?.length > 1 ? (
                    <Box>
                        {headCell.enums && headCell.enums.map((cellValue, index) => (
                            headCell.type === "badge" ?
                                <TableStatusCell
                                    key={index}
                                    cellName={cellValue}
                                    cellValue={tableRow[cellValue]}
                                    {...attribute}
                                /> :
                                <Box
                                    sx={firstCell}
                                    key={index}
                                >
                                    <Box>
                                        {index === 0 ?
                                            <Typography sx={{ color: tableRow['isNoIsuueinVerification'] === false && issueTextStyle }} variant="subtitle2" fontWeight={550}>
                                                {tableRow[cellValue] ? tableRow[cellValue] : NA}
                                            </Typography> :
                                            <Typography
                                                key={index}
                                                sx={{ ...text2, color: tableRow['isNoIsuueinVerification'] === false && issueTextStyle }}
                                            >
                                                {tableRow[cellValue] ? tableRow[cellValue] : NA}
                                            </Typography>}

                                    </Box>
                                </Box>
                        ))}
                    </Box>
                ) :

                    <Box>
                        {headCell.enums && headCell.enums.map((cellValue, index) => (

                            (headCell.id === "rejectReason") ?
                                <TableClickableCell
                                    key={index}
                                    cellName={cellValue}
                                    cellValue={tableRow[cellValue]}
                                    {...attribute}

                                />:
                                headCell.type === "badge" ?
                                <TableStatusCell
                                    key={index}
                                    cellName={cellValue}
                                    cellValue={tableRow[cellValue]}
                                    {...attribute}
                                /> 
                                :
                                <Component key={index} actionPermissionList={actionPermissionList} sx={{ ...text1, color: tableRow['isNoIsuueinVerification'] === false && issueTextStyle }} {...attribute}>
                                    {headCell.type === "date" ? (tableRow[cellValue] ? DDMMYYYY(tableRow[cellValue]) : NA) : tableRow[cellValue]}
                                </Component>

                        ))}
                    </Box>}

                {headCell && !headCell?.enums?.length && headCell.enums && headCell?.enums[0] !== "action" ? (
                    <Box>
                        <Component variant="subtitle2" fontWeight={550}>
                            N/A
                        </Component>
                    </Box>
                ) : null}
            </Box>
        </>

    )
}

export default SingleTableCell