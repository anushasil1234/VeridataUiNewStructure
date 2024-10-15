
import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import AdminView from "./admin-view";
import CandidateView from "./candidate-view";
import { roleTypeEnums } from "shared/constants/constants";

const HomeView = () => {

  const loggedInData = useSelector((state) => state.loggedInData);
  const { userTypeId } = loggedInData[0];

  return (
    <>

      <Box>
        {roleTypeEnums.admin.includes(userTypeId) && (
          <AdminView />
        )}
        {roleTypeEnums.candidate.includes(userTypeId) && (
          <CandidateView />

        )}
      </Box>

    </>
  );
};

export default HomeView;
