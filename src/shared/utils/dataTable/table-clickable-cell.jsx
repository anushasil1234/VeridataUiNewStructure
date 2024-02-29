import React from 'react'
import { useSelector } from 'react-redux'
import DarkTooltip from '../tooltip/dark-tooltip'
import { clickableCell } from 'app'
import { Typography } from '@mui/material'

const TableClickableCell = (props) => {
    const functionSlice = useSelector(state => state.functionSlice);
    
    const { setRemarks } = functionSlice[0];
    let { cellValue, rowAttribute } = props;
    const { appointeeId } = rowAttribute;
    return (
        <DarkTooltip placement="top" title={"Click to view more"} onClick={() => setRemarks(appointeeId)} arrow>
            <Typography sx={clickableCell}>{cellValue}</Typography>
        </DarkTooltip>
    )
}
export default TableClickableCell