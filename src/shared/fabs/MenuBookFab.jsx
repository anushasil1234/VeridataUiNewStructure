import { MenuBook } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { primaryFabStyle } from 'app'
import React from 'react'
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip'

const MenuBookFab = ({title, onClick, disabled = false}) => {
    return (
        <DarkTooltip placement="top" title={title} arrow>
            <Fab
                variant="contained"
                size="small"
                button={"N"}
                disabled={disabled}
                onClick={() => onClick()}
                sx={primaryFabStyle}
            >
                {/* <Article width={18} /> */}
                <MenuBook width={18} />
            </Fab>
        </DarkTooltip>
    )
}

export default MenuBookFab