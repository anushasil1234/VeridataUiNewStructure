import { Download } from '@mui/icons-material'
import { Fab } from '@mui/material'
import { primaryFabStyle } from 'app'
import React from 'react'
import DarkTooltip from 'shared/utils/tooltip/dark-tooltip'

const DownLoadFab = ({onClick, title, sx = primaryFabStyle}) => {
  return (
    <DarkTooltip placement="top" title={title} arrow>
    <Fab
      variant="contained"
      size="small"
      button={"N"}
      onClick={() => onClick()}
      sx={sx}
    >
      <Download width={18} />
    </Fab>
  </DarkTooltip>
  )
}

export default DownLoadFab