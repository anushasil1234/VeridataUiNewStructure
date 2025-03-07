import React, { } from 'react'
import { Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { fileCard, fileInputs } from 'app';
import { Download } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { generateUPloadErrorMessage } from 'shared/utils';
import { toDataUploaded } from 'shared/constants/constants';
import Button1 from 'shared/utils/button/button1';
import downloadFile from 'shared/utils/associate/download-file';
import UploadButton from 'shared/components/upload-button.jsx/upload-button';
import UploadButtonforxlsx from '../upload-xlsx/upload-xlsx';
import { postExcel } from 'server/apis';
// import { postExcel } from 'server/apis/post-excel';


const dialogComponent =
    <Box p={2}>
        <Typography fontSize={15} fontWeight={"bold"}>
            <Typography fontSize={15}>System will accept only valid and non duplicate data - will reject the rest.</Typography>
        </Typography>
        <Typography mt={2}>
            Do you want to continue?
        </Typography>
    </Box>

const FileUpload = ({ modalConfirmation, SetFileId, files, setFiles, removeFile,
    setFileName, tableFileUpload, addToAppointeeListHandler, ...props }) => {

    const functionSlice = useSelector((state) => state.functionSlice);
    const loggedInData = useSelector((state) => state.loggedInData);
    const apiSlice = useSelector((state) => state.apiSlice);
    const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);

    const { companyId, userId } = loggedInData[0];
    const { openConfirmationModel, openInfoModel } = functionSlice[0];
    // const { postExcel } = apiSlice[0];
    const { navigateTo } = commonHooksFunctionSlice[0];

    const taskAfterClickOnOk = (rawFileDataCount, fileId) => {
        if (rawFileDataCount > 0) {
            navigateTo(toDataUploaded, { fileId });
        }
    }
    const uploadHandler = async (event) => {

        const FileDetails = event.target.files[0];
        const formData = new FormData();
        formData.append("CompanyId", companyId)
        formData.append("UserId", userId)
        formData.append("FileDetails", FileDetails)
        const response = await postExcel(formData);
        if (response) {
            const { duplicateCount, invalidUserCount, rawFileData, downloadFileData } = response.responseInfo;
            const rawFileDataCount = rawFileData.length;
            let fileId;
            if (rawFileDataCount > 0) {
                fileId = rawFileData[0];
            }
            if (duplicateCount > 0 || invalidUserCount > 0) {
                let dialogContentText = generateUPloadErrorMessage({duplicateCount, invalidUserCount, rawFileDataCount});
                dialogContentText =
                    <>
                        {dialogContentText}
                        <Stack flexDirection={"row"}>
                            {
                                downloadFileData && downloadFileData.length > 0 && downloadFileData.map(({ fileData, fileName, fileType }, index) => {
                                    const downLoadName = (fileName === "Invalid_Data") ? "Invalid Data" : "Duplicate Data";
                                    fileName = `${fileName}.${fileType}`;
                                    const linkSource = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${fileData}`;
                                    return (
                                        <Button1
                                            key= {index}
                                            onClick={() => downloadFile(linkSource, fileName)}
                                            variant="contained"
                                            sx={{ fontWeight: "bold", mr: "2rem", mt: "1rem" }} endIcon={<Download sx={{ color: "#fff" }} />}>
                                            {downLoadName}
                                        </Button1>
                                    )
                                })
                            }
                        </Stack>
                    </>
                openInfoModel({ dialogContentText }, () => taskAfterClickOnOk(rawFileDataCount, fileId));
            }
            if (duplicateCount === 0 && invalidUserCount === 0 && rawFileDataCount > 0) {
                navigateTo(toDataUploaded);
            }
        }
    }
    const handleInputChange = (event) => {
        const confirmationModelContent = {
            dialogComponent,
        }
        openConfirmationModel(confirmationModelContent, () => uploadHandler(event));
    }

    return (
        <div>
            <Stack sx={fileCard}>
                <Typography>
                    Choose a .XLSX file to upload:
                </Typography>
                <Stack ml={2}>
                    <Box sx={fileInputs}>
                        <input
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            type="file"
                            onClick={(e) => e.target.value = null}
                            onChange={handleInputChange}
                        />
                        <UploadButtonforxlsx />

                    </Box>
                </Stack>

            </Stack>
        </div>
    )
}

export default FileUpload