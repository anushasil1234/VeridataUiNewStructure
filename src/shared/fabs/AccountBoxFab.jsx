import { AccountBox } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { primaryFabStyle } from 'app'
import React from 'react'
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip'

const AccountBoxFab = ({disabled = false, onClick, title}) => {
    return (
        <DarkTooltip
            placement="top"
            title={title}
            arrow
        >
            <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => onClick()}
                disabled={disabled}
                sx={primaryFabStyle}
            >
                <AccountBox width={18} />
            </Fab>
        </DarkTooltip>
    )
}

export default AccountBoxFab