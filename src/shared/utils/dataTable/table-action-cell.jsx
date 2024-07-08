import {
  Fab,
  Stack,
  Typography,
} from "@mui/material";
import DarkTooltip from "../tooltip/dark-tooltip";
import {
  Article,
  Cancel,
  Download,
  Edit,
  Notifications,
} from "@mui/icons-material";
import {
  greenFabStyle,
  primaryFabStyle,
  redFabStyle,
  yellowFabStyle,
} from "app";
import { useSelector } from "react-redux";
import {
  noPassBookMsg,
  toUpdateUser,
  verificationRemiderMsg,
} from "shared/constants/constants";
import UpdateAppointeeForm from "shared/components/form-dialog/update-appointee-data";
import CloseAppointeeAddRemarks from "shared/components/form-dialog/close-appointee-add-Remarks";
import { GetAttribute } from "..";
import downloadFile from "../associate/download-file";

export const TableActionCell = (props1, props2) => {
  const { actionList, rowAttribute, actionPermissionList, setTableRows } =
    props1;
  const { appointeeId, userId: id } = rowAttribute;

  const commonHooksFunctionSlice = useSelector((state) => state.commonHooksFunctionSlice);
  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const apiSlice = useSelector((state) => state.apiSlice);
  const popUpSlice = useSelector((state) => state.popUpSlice);

  const { navigateTo } = commonHooksFunctionSlice[0];
  const { openConfirmationModel } = functionSlice[0];
  const { showErrorMessage } = popUpSlice[0];
  const { openViewModel, openUserViewModel } = functionSlice[0];
  const { openSubmitModel } = functionSlice[0];
  const { openPassbookViewModel,openEmploymentViewModel } = functionSlice[0];

  const {
    getPassbookFileData,
    postRemainderMail,
    deleteUserDetails,
  } = apiSlice[0];
  const { userId } = loggedInData[0];
  const downloadPassbook = async (pasbooktype) => {
    const payLoad = {
      appointeeId: appointeeId,
      type: pasbooktype,
      userId,
    };
    const response = await getPassbookFileData(payLoad);
    if (response) {
      const { fileData, fileName, fileType } = response.responseInfo;

      if (fileData) {
        const base64String = `data:${fileType};base64, ${fileData}`;
        downloadFile(base64String, fileName);
      } else {
        showErrorMessage(noPassBookMsg);
      }
    }
  };
  const UpdateDateOfJoin = async (rowAttribute) => {
    const submitmodalcontent = {
      dialogComponent: <UpdateAppointeeForm props={rowAttribute} />,
      dialogTitle: "Edit Appointee",
    };
    openSubmitModel(submitmodalcontent);
  };
  
  const notiFyAppointee = async () => {
    const confirmationModelContent = {
      dialogContentText: verificationRemiderMsg,
    };
    openConfirmationModel(
      confirmationModelContent,
      async () => await postRemainderMail(appointeeId, userId)
    );
  };

  const handleClickOnCancel = () => {
    const submitmodalcontent = {
      dialogComponent: <CloseAppointeeAddRemarks />,
      dialogTitle: "Cancle Appointee",
    };
    openSubmitModel(submitmodalcontent);
  };
  const handleDelete = async (id) => {
    const response = await deleteUserDetails(id, userId);
    if (response) {
      setTableRows();
    }
  };
  const handleCloseUserDetails = (event) => {
    const id = GetAttribute(event, "id");
    const dialogComponent = (
      <Typography mt={2}>Do you want to delete the user?</Typography>
    );
    const confirmationModelContent = {
      dialogComponent,
    };
    openConfirmationModel(confirmationModelContent, () => handleDelete(id));
  };
  const updateUser = (rowAttribute) => {
    navigateTo(toUpdateUser, { state: rowAttribute });
  };

  let actionListData;

  actionListData =
    actionList &&
    actionList.map((action) => {
      return (
        <>
          {action === "VIEWDETAILS" && actionPermissionList && actionPermissionList['A001'] ? (
            <DarkTooltip placement="top" title={"Open details"} arrow>
              <Fab
                mood="V"
                variant="contained"
                size="small"
                onClick={() => openViewModel(appointeeId)}
                sx={greenFabStyle}
              >
                <Article width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "VIEWUSERDETAILS" && actionPermissionList && actionPermissionList['A001'] ? (
            <DarkTooltip placement="top" title={"Open details"} arrow>
              <Fab
                mood="V"
                variant="contained"
                size="small"
                onClick={() => openUserViewModel(id)}
                sx={greenFabStyle}
              >
                <Article width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "NOTIFYMAIL" && actionPermissionList && actionPermissionList['A005'] ? (
            <DarkTooltip placement="top" title={"Notify appointee"} arrow>
              <Fab
                appointeeId={appointeeId}
                mood="V"
                variant="contained"
                size="small"
                button={"N"}
                onClick={notiFyAppointee}
                sx={primaryFabStyle}
              >
                <Notifications width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "CLOSEAPNTEE" ? (
            <DarkTooltip placement="top" title={"Cancel Appointee"} arrow>
              <Fab
                appointeeId={appointeeId}
                mood="V"
                variant="contained"
                size="small"
                button={"C"}
                onClick={handleClickOnCancel}
                sx={redFabStyle}
              >
                <Cancel width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "CLOSEUSERDETAILS" ? (
            <DarkTooltip placement="top" title={"Inactive User"} arrow>
              <Fab
                id={id}
                mood="V"
                variant="contained"
                size="small"
                button={"C"}
                onClick={handleCloseUserDetails}
                sx={redFabStyle}
              >
                <Cancel width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "DWNLDPSSBK" && actionPermissionList && actionPermissionList['A013'] ? (
            <DarkTooltip placement="top" title={"Download Passbook"} arrow>
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => downloadPassbook("EPFPSBK")}
                sx={primaryFabStyle}
              >
                <Download width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "VIEWPSSBK" && actionPermissionList && actionPermissionList['A012'] ? (
            <DarkTooltip placement="top" title={"View Passbook"} arrow>
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => openPassbookViewModel(appointeeId)}
                sx={primaryFabStyle}
              >
                <Article width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "VIEWPSSBK" && actionPermissionList && actionPermissionList['A012'] ? (
            <DarkTooltip placement="top" title={"Employment History"} arrow>
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => openEmploymentViewModel(appointeeId)}
                sx={primaryFabStyle}
              >
                <Article width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {(action === "DWNLDTRUSTPSSBK") &
            (rowAttribute.isTrustPFApplicable === true) ? (
            <DarkTooltip
              placement="top"
              title={"Download Trust Passbook"}
              arrow
            >
              <Fab
                variant="contained"
                size="small"
                button={"N"}
                onClick={() => downloadPassbook("EPFPSBKTRUST")}
                sx={redFabStyle}
              >
                <Download width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "UPDTEAPNTEE" && actionPermissionList && actionPermissionList['A007'] ? (
            <DarkTooltip placement="top" title={"Edit appointee"} arrow>
              <Fab
                variant="contained"
                size="small"
                onClick={() => UpdateDateOfJoin(rowAttribute)}
                sx={yellowFabStyle}
              >
                <Edit width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
          {action === "UPDATEUSER" && actionPermissionList && actionPermissionList['A007'] ? (
            <DarkTooltip placement="top" title={"Edit user"} arrow>
              <Fab
                variant="contained"
                size="small"
                onClick={() => updateUser(rowAttribute)}
                sx={yellowFabStyle}
              >
                <Edit width={18} />
              </Fab>
            </DarkTooltip>
          ) : null}
        </>
      );
    });

  return <Stack flexDirection={"row"}>{actionListData}</Stack>;
};
