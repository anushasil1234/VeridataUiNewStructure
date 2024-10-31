import { Box, Typography } from "@mui/material";
import { appointeeImageViewStyle, displayImageStyle, fileNameStyle } from "app";
import viewImage from 'assets/images/profile/file_upload_icon.png';
import { useSelector } from "react-redux";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";


export const FileViewComponent = ({ file, fileType }) => {
    const functionSlice = useSelector((state) => state.functionSlice);
    const {
        openDocumentModel
    } = functionSlice[0];
    
    return (
    <Box sx={{marginLeft: '16px'}}>
        <DarkTooltip placement="right" title="View image" arrow>
            <Box sx={appointeeImageViewStyle}>
                <img
                    src={viewImage}
                    alt={fileType}
                    style={{
                        ...displayImageStyle,
                        marginLeft: "5%", // Responsive margin
                        marginTop: "0.5rem" // Responsive margin
                    }}
                    onClick={() => openDocumentModel(file, fileType)}
                />
            </Box>
        </DarkTooltip>
        <Typography sx={{width: '50px', ...fileNameStyle}}>{file.fileName}</Typography>
    </Box>
    )
}