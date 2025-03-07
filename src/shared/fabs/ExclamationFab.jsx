import React from 'react'
import exclamation from "assets/images/exclamation.png"
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip'
import { Fab } from '@mui/material'
import { primaryFabStyle } from 'app'

const ExclamationFab = ({ onClick, title }) => {
    return (
        <DarkTooltip placement="top" title={title} arrow>
            <Fab
                mood="V"
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => onClick()}
                sx={{
                    background: 'linear-gradient(45deg, #7851A9, #5E3D8D)',
                    ...primaryFabStyle
                }}
            >
                <img
                    src={exclamation}
                    alt="exclamation"
                    style={{ width: 20, height: 20, filter: 'invert(1) brightness(100%)' }}
                />
            </Fab>
        </DarkTooltip>
    )
}

export default ExclamationFab