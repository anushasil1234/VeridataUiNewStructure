import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { CardLayout, PageLayout } from 'shared/utils';
import { responsiveBtnType1Style, sampleDownLoadLinkContainerStyle } from 'app';
import { DownloadSampleXlsFile_URL } from 'shared/constants/constants';
import ActionPermission from 'shared/components/action-permission/action-permission';
import FileUpload from 'shared/components/file-upload/file-upload';
import { Typography, Box, Fab, Dialog, DialogContent, Button, DialogTitle, DialogActions } from '@mui/material';
import { Info } from "@mui/icons-material";
import { primaryFabStyle } from "app";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";


import myImage from 'assets/images/profile/candidateUploadTemplate_new.JPG';

const UnWrrappedDataUpload = (props) => {
    const { hasPermission } = props;
    const apiSlice = useSelector(state => state.apiSlice);
    const { downloadReport } = apiSlice[0];

    const [files, setFiles] = useState([]);
    const [tableFileUpload, setTableFileUpload] = useState({
        tableHeading: "List of Files Upload",
        rows: [{ id: 1, col1: null }],
        columns: [{ id: "col1", label: 'File Name', minWidth: 100 }],
    });

    const [tableData, setTableData] = useState({
        tableHeaders: ["Error Messages", "Data"],
        rows: []
    });

    const [openModal, setOpenModal] = useState(false); // State for modal visibility

    const removeFile = (filename) => {
        setFiles(files.filter(file => file.name !== filename));
    };

    const handleOpenModal = () => {
        setOpenModal(true); // Open modal
    };

    const handleCloseModal = () => {
        setOpenModal(false); // Close modal
    };

    return (
        <PageLayout pageName={"File Upload"}>
            <CardLayout>
                <Box sx={sampleDownLoadLinkContainerStyle}>
                    <Typography onClick={() => downloadReport(DownloadSampleXlsFile_URL)}>
                       To Download New Appointee Template Click Here.
                    </Typography>
                </Box>
                {hasPermission && hasPermission['A006'] && (
                    <Box mt={3} display="flex" alignItems="center">
                        <FileUpload
                            setTableData={setTableData}
                            tableData={tableData}
                            tableFileUpload={tableFileUpload}
                            setFileName={setTableFileUpload}
                            files={files}
                            setFiles={setFiles}
                            removeFile={removeFile}
                            hasPermission={hasPermission}
                        />
                        <DarkTooltip placement="right" arrow title="Click Me">
                            <Fab
                                variant="contained"
                                size="small"
                                onClick={handleOpenModal} // Open modal on click
                                sx={{ ...primaryFabStyle, ml: 5 }}
                            >
                                <Info width={18} sx={{ color: "#fff" }} />
                            </Fab>
                        </DarkTooltip>
                    </Box>
                )}


                {/* Modal for image display */}
                <Dialog
                    open={openModal}
                    onClose={handleCloseModal}
                    maxWidth="lg"
                    fullWidth 
                >
                    <DialogTitle>
                        Sample Template for Data Upload
                    </DialogTitle>
                    <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={myImage} alt="Description" style={{ maxWidth: '100%', maxHeight: '100%' }} />

                    </DialogContent>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'flex-start' }}>

                        <Typography variant="subtitle2">
                            Notes:
                        </Typography>
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            1. Please use the template for correct data upload.
                        </Typography>

                        {/* Numbered list */}
                        <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            2. All fields are required except Level1, Level2, and Level3 Email fields.
                        </Typography>

                        <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            3. Candidate ID must be unique.
                        </Typography>

                        <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            4. Date of Joining: Use dd-mm-yyyy format. Must be a future date.
                        </Typography>

                        <Typography variant="subtitle2" sx={{ mt: 1 }}>
                            5. Don't change the header.
                        </Typography>
                    </DialogContent>

                    {/* Add DialogActions for the Close button */}
                    <DialogActions>
                        <Button variant="contained" color="primary"sx={{...responsiveBtnType1Style}} onClick={handleCloseModal}>
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardLayout>
        </PageLayout>
    );
};

const DataUpload = ActionPermission(UnWrrappedDataUpload);
export default DataUpload;
