import { React, useState } from "react";
import { useSelector } from "react-redux";
import { CardLayout, PageLayout } from "shared/utils";
import { responsiveBtnType1Style, sampleDownLoadLinkContainerStyle } from "app";
import { DownloadUpdateSampleXlsFile_URL } from "shared/constants/constants";
import ActionPermission from "shared/components/action-permission/action-permission";
import FileUpdate from "shared/components/file-update/file-update";
import DarkTooltip from "shared/utils/tooltip/dark-tooltip";
import { Typography, Box, Fab, Dialog, DialogContent, Button, DialogTitle, DialogActions } from '@mui/material';
import { primaryFabStyle } from "app";
import { Info } from "@mui/icons-material";
import myImage from 'assets/images/profile/candidateUpdateTemplate.jpg';
import { downloadReport } from "server/apis";

const UnWrrappedDataUpdate = (props) => {
  const { hasPermission } = props;
  const apiSlice = useSelector((state) => state.apiSlice);
  // const { downloadReport } = apiSlice[0];

  const [files, setFiles] = useState([]);
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const [tableFileUpload, setTableFileUpload] = useState({
    tableHeading: "List of Files Upload",
    rows: [
      {
        id: 1,
        col1: null,
      },
    ],
    columns: [{ id: "col1", label: "File Name", minWidth: 100 }],
  });
  const removeFile = (filename) => {
    setFiles(files.filter((file) => file.name !== filename));
  };

  const [tableData, setTableData] = useState({
    tableHeaders: ["Error Messages", "Data"],
    rows: [],
  });

  const handleOpenModal = () => {
    setOpenModal(true); // Open modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Close modal
  };


  return (
    <PageLayout pageName={"Bulk Update Data"}>
      <CardLayout>
        <Box sx={sampleDownLoadLinkContainerStyle}>
          <Typography
            onClick={() => downloadReport(DownloadUpdateSampleXlsFile_URL)}
          >
            To download Bulk Update Template, click here
          </Typography>


        </Box>
        <Typography sx={{fontFamily:'Montserrat,Anuphan',fontSize:'1rem',fontWeight:400,color:'#000000'}}>{`You can change details of existing Appointees here. Know more in "i"`}</Typography>

        {
          <Box mt={3} display="flex" alignItems="center">
            <FileUpdate
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
                //sx={primaryFabStyle}
                sx={{ ...primaryFabStyle,  ml: 5 }}
              >
                <Info width={18} sx={{ color: "#fff" }} />
              </Fab>
            </DarkTooltip>
          </Box>
        }

        {/* Modal for image display */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          maxWidth="lg" // Set maxWidth to "lg" for larger size
          fullWidth // Make the modal take the full width available
        >
          <DialogTitle>
            Sample Template for Data Update
          </DialogTitle>
          <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={myImage} alt="Description" style={{ maxWidth: '100%', maxHeight: '100%' }} />

          </DialogContent>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'left', alignItems: 'flex-start' }}>

            <Typography variant="subtitle2">
              Notes:
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              1. Please use the template for updating existing appointee details so that appointee can be verified for pre-onboarding process.

            </Typography>

            {/* Numbered list */}
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              2. To update, provide the Candidate ID and only the specific field to be changed, leaving all other fields blank.
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              3. Appointee ID MUST match with that of the previously uploaded candidate details. 
            </Typography>

            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              4. Updated Date of Joining: Use dd-mm-yyyy format. Must be a future date.
            </Typography>

            <Typography variant="subtitle2"  sx={{ mt: 1 ,fontWeight:'bold'}}>
            5. Don't change the header; Don't add new tabs or sheets or columns to the existing template.

            </Typography>
          </DialogContent>

          {/* Add DialogActions for the Close button */}
          <DialogActions>
            <Button variant="contained" color="primary" sx={{...responsiveBtnType1Style}} onClick={handleCloseModal}>
              CLOSE
            </Button>
          </DialogActions>
        </Dialog>
      </CardLayout>
    </PageLayout>
  );
};
const DataUpdate = ActionPermission(UnWrrappedDataUpdate);
export default DataUpdate;
