import { Notifications } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { primaryFabStyle } from 'app'
import React from 'react'
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip'

const NotifyFab = ({onClick, title}) => {
    return (
        <DarkTooltip placement="top" title={title} arrow>
            <Fab
                mood="V"
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => onClick()}
                sx={primaryFabStyle}
            >
                <Notifications width={18} />
            </Fab>
        </DarkTooltip>
    )
}

export default NotifyFab