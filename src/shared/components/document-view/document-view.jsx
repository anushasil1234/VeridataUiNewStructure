import { Download } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { actionIconStyle, fileImageHeaderStyle, fileImageStyle, fileTypeStyle, imageFileContainerStackStyle, imageFileContainerStyle } from 'app';
import React from 'react'
import { FabIcon } from 'shared/utils';
import downloadFile from 'shared/utils/associate/download-file';
import FabIconPropsModel from 'shared/utils/fab-icon/fab-icon-model';
import FullScreenModel from 'shared/utils/models/fullscreen-modal'

const UnWrappedDocumentView = ({ documentModelProps }) => {
    const { file, fileType } = documentModelProps;
    const { fileName, fileDetails } = file;
    const downloadFabProps = new FabIconPropsModel(
        actionIconStyle,
        ()=> downloadFile(fileDetails, fileName),
        "secondary",
        "download",
        <Download />,
        "Download"
    );
    return (
        <Stack>
            <Stack sx={fileImageHeaderStyle}>
                <Typography sx={fileTypeStyle}>{fileType}</Typography>
                <FabIcon
                    props={{
                        ...downloadFabProps,
                        selectedIndex: 2,
                        index: 2,
                        size: "small"
                    }}
                />
            </Stack>
            <Stack sx={imageFileContainerStackStyle}>
                <Box sx={imageFileContainerStyle}>
                    <img src={fileDetails} style={fileImageStyle} alt={fileName}/>
                </Box>
            </Stack>
        </Stack>
    )
}

const DocumentView = (props) => {
    return (
        <FullScreenModel
            open={props.open}
            closeModel=
            {props.closeDocumentModel}
            screensize={"500"}
            fullScreen={false}
            content={<UnWrappedDocumentView
                {...props} />}
        />
    )
}
export default DocumentView