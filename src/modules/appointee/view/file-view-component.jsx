import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import viewImage from "assets/images/profile/file_upload_icon.png";
import { useSelector } from "react-redux";
import { appointeeImageViewStyle, fileNameStyle, displayImageStyle } from "app";
import FileSelectionPopup from "modules/appointee/view/FileSelectionPopup ";

export const FileViewComponent = ({
  file,
  fileType,
  width = "100%",
  filesByAlias,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const functionSlice = useSelector((state) => state.functionSlice);
  const apiSlice = useSelector((state) => state.apiSlice);
  const { openDocumentModel } = functionSlice[0];
  const { GetUploadedFileDetailsById } = apiSlice[0];

  const handleFileClick = async (selectedFile) => {
    const payload = {
      appointeeId: selectedFile.appointeeId || 0,
      fileCategory: fileType,
      fileId: selectedFile.uploadDetailsId,
    };
    const response = await GetUploadedFileDetailsById(payload);
    if (response && response.responseInfo) {
      const { mimeType, fileData } = response.responseInfo;
      const fileDetails = `data:${mimeType};base64,${fileData}`;
      const filename = file.fileName;
      //   console.log("mimeType",filename)

      openDocumentModel(fileDetails, selectedFile.fileName, fileType);
    }
  };

  const handleImageClick = () => {
    const files = filesByAlias?.get(fileType) || [];
    if (files.length > 1) {
      setIsPopupOpen(true);
    } else if (files.length === 1) {
      handleFileClick(files[0]);
    }
  };

  return (
    <Box sx={{ marginLeft: "16px" }}>
      <DarkTooltip placement="right" title="View image" arrow>
        <Box sx={appointeeImageViewStyle}>
          <img
            src={viewImage}
            alt={fileType}
            style={{
              ...displayImageStyle,
              marginLeft: "5%",
              marginTop: "0.5rem",
            }}
            onClick={handleImageClick}
          />
        </Box>
      </DarkTooltip>
      <Typography sx={{ width, ...fileNameStyle }}>
        {"View Files" || "No file available"}
      </Typography>

      <FileSelectionPopup
        isPopupOpen={isPopupOpen}
        setIsPopupOpen={setIsPopupOpen}
        files={filesByAlias.get(fileType) || []}
        handleFileClick={handleFileClick}
      />
    </Box>
  );
};
