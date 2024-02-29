import React from 'react'
import ListTable from 'shared/utils/list-table/list-table'
import FullScreenModel from 'shared/utils/models/fullscreen-modal'

const RemarksTable = (props) => {
    return (
      
        <FullScreenModel
           screensize={"lg"}
            open={props.open}
            fullScreen={false}
            closeModel=
            {props.closeRemarksModel}
            content={<ListTable
                rows={props?.remarksModelProps?.remarksList}
                {...props} />}
        />
    )
}

export default RemarksTable