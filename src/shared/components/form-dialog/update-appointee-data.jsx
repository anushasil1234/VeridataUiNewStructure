import { Box, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointeeDetailsUpdate } from "server/apis";
import { DateFormatYYYYMMDD, StringToDate, hasValue } from "shared/utils";
import Button1 from "shared/utils/button/button1";
import  { storeActionRoute } from "store/slices/action-route-slice";

     
const UpdateAppointeeForm = ({ props }) => {

  const dispatch = useDispatch();

  const { appointeeId, id, dateOfJoining } = props;

  const functionSlice = useSelector((state) => state.functionSlice);
  const loggedInData = useSelector((state) => state.loggedInData);
  const apiSlice = useSelector((state) => state.apiSlice);

  const {
    // appointeeDetailsUpdate
  } = apiSlice[0];
  const { userId } = loggedInData[0];
  const { closeSubmitModel } = functionSlice[0];

  const [newDateOfJoining, setNewDateOfJoining] = useState(StringToDate(dateOfJoining));
  const [saveDisable, setSaveDisable] = useState(true);
  const today = DateFormatYYYYMMDD(new Date());

  useEffect(() => {
    if (hasValue(newDateOfJoining)) {
      if (StringToDate(dateOfJoining) === newDateOfJoining) {
        setSaveDisable(true);
        
      } else {
        setSaveDisable(false);
        
      }
    }
  }, [newDateOfJoining])
  const actionAfterAppointeeEditSuccess = (actionRoute) => {
    closeSubmitModel();
    dispatch(storeActionRoute({actionRoute}));
  }

  const handleAppointeeFormEdit = async () => {

    const payLoad = {
      appointeeId: appointeeId,
      dateOfJoining: newDateOfJoining,
      id: id,
      userId: userId
    }
    const response = await appointeeDetailsUpdate(payLoad);
    if (response) {
      actionAfterAppointeeEditSuccess("update");
    }
  }

  return (
    <>
      <Box my={"20px"}>
        <form>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12}>
              <TextField
                onChange={(e) => {
                  setNewDateOfJoining(e.target.value);
                }}
                error={false}
                disableFuture={true}
                id="date"
                label="Date of Joining"
                type="date"
                value={newDateOfJoining}
                sx={{ width: "100%", margin: "5px" }}
                InputProps={{ inputProps: { min: today } }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Button1 disabled={saveDisable} onClick={handleAppointeeFormEdit} sx={{ m: "10px 5px" }}>
            Save
          </Button1>
        </form>
      </Box>
    </>
  );
};

export default UpdateAppointeeForm;
